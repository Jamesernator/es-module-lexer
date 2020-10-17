import Module from "./Module.js";
import type { ResolvedExport, ResolveSet } from "./Module.js";
import ReadonlyMap from "./ReadonlyMap.js";
import assert from "./assert.js";

class PromiseCapability<T> {
    #resolve!: (value: T | Promise<T>) => void;
    #reject!: (error: any) => void;
    #promise: Promise<T> = new Promise<T>((resolve, reject) => {
        this.#resolve = resolve;
        this.#reject = reject;
    });

    get resolve(): (value: T | Promise<T>) => void {
        return this.#resolve;
    }

    get reject(): (error: any) => void {
        return this.#reject;
    }

    get promise(): Promise<T> {
        return this.#promise;
    }
}

export type ResolveModule
    = (specifier: string, module: CyclicModule) => Module | Promise<Module>;

type UnlinkedState = {
    name: "unlinked",
};

type LinkingState = {
    name: "linking",
    dfsIndex: number,
    dfsAncestorIndex: number,
};

type LinkedState = {
    name: "linked",
};

type EvaluatingState = {
    name: "evaluating",
    dfsIndex: number,
    dfsAncestorIndex: number,
    asyncEvaluating: boolean,
    asyncParentModules: Array<CyclicModule>,
    pendingAsyncDependencies: number,
};

type EvaluatedState = {
    name: "evaluated",
    dfsIndex: number,
    dfsAncestorIndex: number,
    asyncParentModules: Array<CyclicModule>,
    asyncEvaluating: boolean,
    pendingAsyncDependencies: number,
};

export type CyclicModuleStatus
    = UnlinkedState
    | LinkingState
    | LinkedState
    | EvaluatingState
    | EvaluatedState;

export type CyclicModuleOptions = {
    async: boolean,
    requestedModules: Array<string>,
    initializeEnvironment: () => void,
    executeModule: () => void,
    resolveModule: ResolveModule,
    getExportedNames: (exportStarSet: Set<Module>) => Array<string>,
    resolveExport: (
        exportName: string,
        resolveSet: ResolveSet,
    ) => ResolvedExport,
};

export default class CyclicModule extends Module {
    static isCyclicModule(value: any | any): value is CyclicModule {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            value.#requestedModules;
            return true;
        } catch {
            return false;
        }
    }

    static linkedModules(cyclicModule: CyclicModule): ReadonlyMap<string, Module> {
        return cyclicModule.#linkedModulesView;
    }

    static async resolveModule(
        cyclicModule: CyclicModule,
        specifier: string,
    ): Promise<Module> {
        const alreadyLinkedModule = cyclicModule.#linkedModules
            .get(specifier);
        if (alreadyLinkedModule) {
            return alreadyLinkedModule;
        }
        const linkedModule = await cyclicModule.#resolveModule(
            specifier,
            cyclicModule,
        );
        if (cyclicModule.#linkedModules.has(specifier)
        && cyclicModule.#linkedModules.get(specifier) !== linkedModule) {
            throw new Error("cyclic module has already resolved successfully");
        }
        cyclicModule.#linkedModules.set(specifier, linkedModule);
        return linkedModule;
    }

    readonly #requestedModules: ReadonlyArray<string>;
    readonly #initializeEnvironment: () => void;
    readonly #executeModule: () => void | Promise<void>;
    readonly #resolveModule: ResolveModule;
    readonly #async: boolean;
    readonly #linkedModules = new Map<string, Module>();
    readonly #linkedModulesView = new ReadonlyMap(this.#linkedModules);
    #evaluationError?: { error: any };
    #topLevelCapability?: PromiseCapability<void>;
    #status: CyclicModuleStatus = { name: "unlinked" };

    constructor({
        async,
        requestedModules,
        initializeEnvironment,
        executeModule,
        resolveModule,
        resolveExport,
        getExportedNames,
    }: CyclicModuleOptions) {
        super({
            link: () => this.#link(),
            evaluate: () => this.#evaluate(),
            getExportedNames: (exportStarSet) => {
                if (this.#status.name === "unlinked") {
                    throw new Error("can't get exported names before linking");
                }
                return getExportedNames(exportStarSet);
            },
            resolveExport: (exportName, resolveSet) => {
                if (this.#status.name === "unlinked") {
                    throw new Error("can't resolve export before linking");
                }
                return resolveExport(
                    exportName,
                    resolveSet,
                );
            },
        });

        this.#async = async;

        if (!Array.isArray(requestedModules)) {
            throw new TypeError("requestedModules must be a list of strings");
        }
        this.#requestedModules = Object.freeze(
            [...new Set(requestedModules)],
        );
        if (this.#requestedModules.some((i) => typeof i !== "string")) {
            throw new TypeError(`requestedModules contains a non-string value`);
        }
        if (typeof initializeEnvironment !== "function") {
            throw new TypeError("initializeEnvironment must be a function");
        }
        if (typeof executeModule !== "function") {
            throw new TypeError("executeModule must be a function");
        }
        if (typeof resolveModule !== "function") {
            throw new TypeError("resolveModule must be a function");
        }
        this.#initializeEnvironment = initializeEnvironment;
        this.#executeModule = executeModule;
        this.#resolveModule = resolveModule;

        Object.freeze(this);
    }

    get async(): boolean {
        return this.#async;
    }

    get linkedModules(): ReadonlyMap<string, Module> {
        return this.#linkedModulesView;
    }

    get requestedModules(): ReadonlyArray<string> {
        return this.#requestedModules;
    }

    get status(): CyclicModuleStatus["name"] {
        return this.#status.name;
    }

    async resolveModule(specifier: string): Promise<Module> {
        return await CyclicModule.resolveModule(this, specifier);
    }

    #linkRequiredModule = async (
        requiredSpecifier: string,
        stack: Array<CyclicModule>,
        index: number,
    ): Promise<number> => {
        assert(this.#status.name === "linking");
        const requiredModule = await CyclicModule.resolveModule(
            this,
            requiredSpecifier,
        );

        if (CyclicModule.isCyclicModule(requiredModule)) {
            index = await requiredModule.#innerModuleLinking(stack, index);
            assert(
                requiredModule.#status.name === "linking"
                || requiredModule.#status.name === "linked"
                || requiredModule.#status.name === "evaluated",
            );

            if (requiredModule.#status.name === "linking") {
                assert(stack.includes(requiredModule));
                this.#status.dfsAncestorIndex = Math.min(
                    this.#status.dfsAncestorIndex,
                    requiredModule.#status.dfsAncestorIndex,
                );
            }
        } else {
            await requiredModule.link();
        }
        return index;
    };

    #finalizeLinking = (stack: Array<CyclicModule>): void => {
        assert(this.#status.name === "linking");
        if (this.#status.dfsAncestorIndex === this.#status.dfsIndex) {
            let done = false;
            while (!done) {
                const requiredModule = stack.pop()!;
                requiredModule.#status = { name: "linked" };
                if (requiredModule === this) {
                    done = true;
                }
            }
        }
    };

    #innerModuleLinking = async (
        stack: Array<CyclicModule>,
        index: number,
    ): Promise<number> => {
        if (this.#status.name === "linking"
        || this.#status.name === "linked"
        || this.#status.name === "evaluated") {
            return index;
        }
        assert(this.#status.name === "unlinked");
        this.#status = {
            name: "linking",
            dfsIndex: index,
            dfsAncestorIndex: index,
        };
        index += 1;
        stack.push(this);
        for (const required of this.#requestedModules) {
            await this.#linkRequiredModule(required, stack, index);
        }
        this.#initializeEnvironment();
        this.#finalizeLinking(stack);
        return index;
    };

    #link = async (): Promise<void> => {
        if (this.#status.name === "linking") {
            throw new TypeError("module can't be linked again during linking");
        }
        if (this.#status.name === "evaluating") {
            throw new TypeError("module can't be linked during evaluation");
        }
        if (this.#status.name !== "unlinked") {
            return;
        }
        const stack: Array<CyclicModule> = [];
        try {
            await this.#innerModuleLinking(stack, 0);
        } catch (error: unknown) {
            for (const module of stack) {
                assert(module.#status.name === "linking");
                module.#status = { name: "unlinked" };
                module.#linkedModules.clear();
            }
            assert(this.#status.name === "unlinked");
            throw error;
        }
        assert(stack.length === 0);
    };

    #getAsyncCycleRoot = (module: CyclicModule): CyclicModule => {
        if (module.#status.name !== "evaluated") {
            throw new Error(
                "Should only get async cycle root after evaluation",
            );
        }
        if (module.#status.asyncParentModules.length === 0) {
            return module;
        }
        while (module.#status.dfsIndex > module.#status.dfsAncestorIndex) {
            assert(module.#status.asyncParentModules.length > 0);
            const nextCycleModule = module.#status.asyncParentModules[0];
            assert(
                nextCycleModule.#status.name === "evaluating"
                || nextCycleModule.#status.name === "evaluated",
            );
            assert(
                nextCycleModule.#status.dfsAncestorIndex
                <= module.#status.dfsAncestorIndex,
            );
            module = nextCycleModule;
            assert(
                module.#status.name === "evaluating"
                || module.#status.name === "evaluated",
            );
        }
        assert(module.#status.dfsIndex === module.#status.dfsAncestorIndex);
        return module;
    };

    #onDependencyFinishedSuccessfully = (): void => {
        assert(
            this.#status.name === "evaluating"
            || this.#status.name === "evaluated",
        );
        this.#status.pendingAsyncDependencies -= 1;
        if (this.#status.pendingAsyncDependencies === 0
        && this.#evaluationError === undefined) {
            assert(this.#status.asyncEvaluating);
            const cycleRoot = this.#getAsyncCycleRoot(this);
            if (cycleRoot.#evaluationError) {
                return;
            }
            if (this.#async) {
                void this.#executeAsyncModule();
            } else {
                try {
                    const value = this.#executeModule();
                    assert(
                        value === undefined,
                        "synchronous executeModule must not return a value",
                    );
                    this.#asyncModuleExecutionFulfilled();
                } catch (error: any) {
                    this.#asyncModuleExectionRejected(error);
                }
            }
        }
    };

    #asyncModuleExecutionFulfilled = (): void => {
        assert(this.#status.name === "evaluated");
        if (!this.#status.asyncEvaluating) {
            assert(this.#evaluationError !== undefined);
            return;
        }
        assert(this.#evaluationError === undefined);
        this.#status.asyncEvaluating = false;
        for (const parent of this.#status.asyncParentModules) {
            parent.#onDependencyFinishedSuccessfully();
        }
        if (this.#topLevelCapability) {
            assert(this.#status.dfsIndex === this.#status.dfsAncestorIndex);
            this.#topLevelCapability.resolve();
        }
    };

    #asyncModuleExectionRejected = (error: any | any): void => {
        assert(this.#status.name === "evaluated");
        if (!this.#status.asyncEvaluating) {
            assert(this.#evaluationError !== undefined);
            return;
        }
        assert(this.#evaluationError === undefined);
        this.#evaluationError = { error };
        this.#status.asyncEvaluating = false;
        for (const parent of this.#status.asyncParentModules) {
            parent.#asyncModuleExectionRejected(error);
        }
        if (this.#topLevelCapability) {
            assert(this.#status.dfsIndex === this.#status.dfsAncestorIndex);
            this.#topLevelCapability.reject(error);
        }
    };

    #executeAsyncModule = async (): Promise<void> => {
        assert(
            this.#status.name === "evaluating"
            || this.#status.name === "evaluated",
        );
        assert(this.#async);
        this.#status.asyncEvaluating = true;
        try {
            await this.#executeModule();
            this.#asyncModuleExecutionFulfilled();
        } catch (error: any) {
            this.#asyncModuleExectionRejected(error);
        }
    };

    #executeOtherModule = async (module: Module): Promise<void> => {
        try {
            await module.evaluate();
            this.#onDependencyFinishedSuccessfully();
        } catch (error: any) {
            this.#asyncModuleExectionRejected(error);
        }
    };

    #executeRequiredModule = (
        requiredModule: Module,
        stack: Array<CyclicModule>,
        index: number,
    ): number => {
        assert(this.#status.name === "evaluating");
        if (CyclicModule.isCyclicModule(requiredModule)) {
            index = requiredModule.#innerModuleEvaluation(stack, index);
            assert(
                requiredModule.#status.name === "evaluating"
                || requiredModule.#status.name === "evaluated",
            );
            if (requiredModule.#status.name === "evaluating") {
                assert(stack.includes(requiredModule));
            }
            if (requiredModule.#status.name === "evaluating") {
                this.#status.dfsAncestorIndex = Math.min(
                    requiredModule.#status.dfsAncestorIndex,
                    requiredModule.#status.dfsAncestorIndex,
                );
            } else if (requiredModule.#evaluationError) {
                const rootModule = this.#getAsyncCycleRoot(
                    requiredModule,
                );
                assert(rootModule.#status.name === "evaluated");
                if (rootModule.#evaluationError) {
                    throw rootModule.#evaluationError.error;
                }
            }
            if (requiredModule.#status.asyncEvaluating) {
                this.#status.pendingAsyncDependencies += 1;
                requiredModule.#status.asyncParentModules.push(this);
            }
        } else {
            this.#status.pendingAsyncDependencies += 1;
            void this.#executeOtherModule(requiredModule);
        }
        return index;
    };

    #finalizeEvaluation = (stack: Array<CyclicModule>): void => {
        assert(this.#status.name === "evaluating");
        if (this.#status.dfsAncestorIndex === this.#status.dfsIndex) {
            let done = false;
            while (!done) {
                const requiredModule = stack.pop()!;
                assert(
                    requiredModule.#status.name === "evaluating",
                );
                requiredModule.#status = {
                    name: "evaluated",
                    dfsIndex: requiredModule.#status.dfsIndex,
                    dfsAncestorIndex: requiredModule.#status.dfsAncestorIndex,
                    asyncParentModules: requiredModule.#status.asyncParentModules,
                    asyncEvaluating: requiredModule.#status.asyncEvaluating,
                    pendingAsyncDependencies: requiredModule.#status
                        .pendingAsyncDependencies,
                };

                done = requiredModule === this;
            }
        }
    };

    #innerModuleEvaluation = (
        stack: Array<CyclicModule>,
        index: number,
    ): number => {
        if (this.#status.name === "evaluated") {
            if (this.#evaluationError) {
                throw this.#evaluationError.error;
            }
            return index;
        }
        if (this.#status.name === "evaluating") {
            return index;
        }
        assert(this.#status.name === "linked");
        this.#status = {
            name: "evaluating",
            dfsIndex: index,
            dfsAncestorIndex: index,
            pendingAsyncDependencies: 0,
            asyncParentModules: [],
            asyncEvaluating: false,
        };

        index += 1;
        stack.push(this);
        for (const required of this.#requestedModules) {
            const requiredModule = this.#linkedModules.get(required);
            assert(requiredModule !== undefined);
            index = this.#executeRequiredModule(
                requiredModule,
                stack,
                index,
            );
        }
        if (this.#status.pendingAsyncDependencies > 0) {
            this.#status.asyncEvaluating = true;
        } else if (this.#async) {
            void this.#executeAsyncModule();
        } else {
            const value = this.#executeModule();
            assert(
                value === undefined,
                "executeModule for a synchronous module must not return a value",
            );
        }
        this.#finalizeEvaluation(stack);
        return index;
    };

    #evaluate = (): Promise<void> => {
        assert(
            this.#status.name === "linked"
            || this.#status.name === "evaluated",
        );
        const module = this.#status.name === "evaluated"
            ? this.#getAsyncCycleRoot(this)
            : this;

        if (module.#topLevelCapability) {
            return module.#topLevelCapability.promise;
        }

        const stack: Array<CyclicModule> = [];
        const capability = new PromiseCapability<void>();
        module.#topLevelCapability = capability;

        try {
            this.#innerModuleEvaluation(stack, 0);
            assert(module.#status.name === "evaluated");
            assert(module.#evaluationError === undefined);
            if (!module.#status.asyncEvaluating) {
                capability.resolve(undefined);
            }
        } catch (error: unknown) {
            for (const module of stack) {
                assert(module.#status.name === "evaluating");
                module.#status = {
                    name: "evaluated",
                    dfsIndex: module.#status.dfsIndex,
                    dfsAncestorIndex: module.#status.dfsAncestorIndex,
                    asyncEvaluating: module.#status.asyncEvaluating,
                    asyncParentModules: module.#status.asyncParentModules,
                    pendingAsyncDependencies: module.#status
                        .pendingAsyncDependencies,
                };
            }
            capability.reject(error);
        }
        return capability.promise;
    };
}

Object.freeze(CyclicModule);
Object.freeze(CyclicModule.prototype);
