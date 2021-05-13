import Module from "./Module.js";
import type { ResolvedExport, ResolveSet } from "./Module.js";
import ReadonlyMap from "./ReadonlyMap.js";
import assert from "./assert.js";

async function promiseTry<T>(func: () => Promise<T> | T): Promise<T> {
    return await func();
}

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
    asyncEvaluatingId: number,
};

type EvaluatedState = {
    name: "evaluated",
    dfsIndex: number,
    dfsAncestorIndex: number,
    asyncParentModules: Array<CyclicModule>,
    asyncEvaluating: boolean,
    asyncEvaluatingId: number,
    pendingAsyncDependencies: number,
    cycleRoot: CyclicModule,
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

let asyncEvaluatingId: number = 0;

export default class CyclicModule extends Module {
    static isCyclicModule(value: any): value is CyclicModule {
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

    static async #innerModuleLinking(
        module: Module,
        stack: Array<CyclicModule>,
        index: number,
    ): Promise<number> {
        if (!CyclicModule.isCyclicModule(module)) {
            await Module.link(module);
            return index;
        }
        if (module.#status.name === "linking"
        || module.#status.name === "linked"
        || module.#status.name === "evaluated") {
            return index;
        }
        assert(module.#status.name === "unlinked");
        module.#status = {
            name: "linking",
            dfsAncestorIndex: index,
            dfsIndex: index,
        };
        index += 1;
        stack.push(module);
        for (const requiredModuleSpecifier of module.#requestedModules) {
            const requiredModule = await CyclicModule.resolveModule(
                module,
                requiredModuleSpecifier,
            );
            index = await CyclicModule.#innerModuleLinking(
                requiredModule,
                stack,
                index,
            );
            if (CyclicModule.isCyclicModule(requiredModule)) {
                assert(
                    requiredModule.#status.name === "linking"
                    || requiredModule.#status.name === "linked"
                    || requiredModule.#status.name === "evaluated",
                );
                if (requiredModule.#status.name === "linking") {
                    assert(stack.includes(requiredModule));
                    // eslint-disable-next-line require-atomic-updates
                    module.#status.dfsAncestorIndex = Math.min(
                        module.#status.dfsAncestorIndex,
                        requiredModule.#status.dfsAncestorIndex,
                    );
                } else {
                    assert(!stack.includes(requiredModule));
                }
            }
        }
        module.#initializeEnvironment();
        assert(stack.filter((m) => m === module).length === 1);
        assert(module.#status.dfsAncestorIndex <= module.#status.dfsIndex);

        if (module.#status.dfsAncestorIndex === module.#status.dfsIndex) {
            let done = false;
            while (!done) {
                const requiredModule = stack.pop();
                assert(requiredModule !== undefined);
                requiredModule.#status = { name: "linked" };
                if (module === requiredModule) {
                    done = true;
                }
            }
        }

        return index;
    }

    static #innerModuleEvaluation(
        module: Module,
        stack: Array<CyclicModule>,
        index: number,
    ): number {
        if (!CyclicModule.isCyclicModule(module)) {
            // TODO: Change this to work differently
            void module.evaluate();
            return index;
        }
        if (module.#status.name === "evaluated") {
            if (module.#evaluationError) {
                throw module.#evaluationError.error;
            }
            return index;
        }
        if (module.#status.name === "evaluating") {
            return index;
        }
        assert(module.#status.name === "linked");
        module.#status = {
            name: "evaluating",
            dfsAncestorIndex: index,
            dfsIndex: index,
            pendingAsyncDependencies: 0,
            asyncEvaluating: false,
            asyncEvaluatingId: -1,
            asyncParentModules: [],
        };
        index += 1;
        stack.push(module);
        for (const requestedModuleSpecifer of module.#requestedModules) {
            let requiredModule = module.#linkedModules
                .get(requestedModuleSpecifer);
            assert(requiredModule !== undefined);
            index = CyclicModule.#innerModuleEvaluation(
                requiredModule,
                stack,
                index,
            );
            if (CyclicModule.isCyclicModule(requiredModule)) {
                assert(
                    requiredModule.#status.name === "evaluating"
                    || requiredModule.#status.name === "evaluated",
                );
                if (requiredModule.#status.name === "evaluating") {
                    assert(stack.includes(requiredModule));
                } else {
                    assert(!stack.includes(requiredModule));
                }

                if (requiredModule.#status.name === "evaluating") {
                    module.#status.dfsAncestorIndex = Math.min(
                        module.#status.dfsAncestorIndex,
                        requiredModule.#status.dfsAncestorIndex,
                    );
                } else {
                    assert(requiredModule.#status.name === "evaluated");
                    requiredModule = requiredModule.#status.cycleRoot;
                    assert(CyclicModule.isCyclicModule(requiredModule));
                    assert(requiredModule.#status.name === "evaluated");
                }
                if (requiredModule.#status.asyncEvaluating) {
                    module.#status.pendingAsyncDependencies += 1;
                    requiredModule.#status.asyncParentModules.push(module);
                }
            }
        }
        if (module.#status.pendingAsyncDependencies > 0 || module.#async) {
            assert(!module.#status.asyncEvaluating);
            module.#status.asyncEvaluating = true;
            module.#status.asyncEvaluatingId = asyncEvaluatingId;
            asyncEvaluatingId += 1;
            if (module.#status.pendingAsyncDependencies === 0) {
                CyclicModule.#executeAsyncModule(module);
            }
        } else {
            void module.#executeModule();
        }
        assert(stack.filter((m) => m === module).length === 1);
        assert(module.#status.dfsAncestorIndex <= module.#status.dfsIndex);
        if (module.#status.dfsAncestorIndex === module.#status.dfsIndex) {
            const cycleRoot = module;
            let done = false;
            while (!done) {
                const requiredModule = stack.pop();
                assert(requiredModule !== undefined);
                assert(requiredModule.#status.name === "evaluating");
                requiredModule.#status = {
                    name: "evaluated",
                    dfsIndex: requiredModule.#status.dfsIndex,
                    dfsAncestorIndex: requiredModule.#status.dfsAncestorIndex,
                    asyncEvaluating: requiredModule.#status.asyncEvaluating,
                    asyncEvaluatingId: requiredModule.#status.asyncEvaluatingId,
                    asyncParentModules: requiredModule.#status
                        .asyncParentModules,
                    pendingAsyncDependencies: requiredModule.#status
                        .pendingAsyncDependencies,
                    cycleRoot,
                };
                if (requiredModule === module) {
                    done = true;
                }
            }
        }
        return index;
    }

    static #executeAsyncModule(module: CyclicModule): void {
        assert(
            module.#status.name === "evaluating"
            || module.#status.name === "evaluated",
        );
        promiseTry<void>(() => module.#executeModule()).then(
            () => CyclicModule.#asyncModuleExecutionFulfilled(module),
            (err) => {
                CyclicModule.#asyncModuleExecutionRejected(module, err);
            },
        );
    }

    static #gatherAsyncParentCompletions(
        module: CyclicModule,
    ): Array<CyclicModule> {
        assert(module.#status.name === "evaluated");
        const execList: Array<CyclicModule> = [];
        for (const m of module.#status.asyncParentModules) {
            assert(m.#status.name === "evaluated");
            if (!execList.includes(m)
            && m.#status.cycleRoot.#evaluationError === undefined) {
                assert(m.#evaluationError === undefined);
                assert(m.#status.asyncEvaluating);
                assert(m.#status.pendingAsyncDependencies > 0);
                m.#status.pendingAsyncDependencies -= 1;
                if (m.#status.pendingAsyncDependencies === 0) {
                    execList.push(m);
                    if (!m.#async) {
                        execList.push(
                            ...CyclicModule
                                .#gatherAsyncParentCompletions(m),
                        );
                    }
                }
            }
        }
        return execList;
    }

    static #asyncModuleExecutionFulfilled(module: CyclicModule): void {
        assert(module.#status.name === "evaluated");
        assert(module.#evaluationError === undefined);
        if (module.#topLevelCapability) {
            assert(module === module.#status.cycleRoot);
            module.#topLevelCapability.resolve();
        }
        const execList: Array<CyclicModule> = CyclicModule
            .#gatherAsyncParentCompletions(module);
        execList.sort((a, b) => {
            assert(a.#status.name === "evaluated");
            assert(b.#status.name === "evaluated");
            return a.#status.asyncEvaluatingId - b.#status.asyncEvaluatingId;
        });
        assert(execList.every((m) => {
            return m.#status.name === "evaluated"
                && m.#status.asyncEvaluating
                && m.#status.pendingAsyncDependencies === 0
                && m.#evaluationError === undefined;
        }));
        for (const m of execList) {
            assert(m.#status.name === "evaluated");
            if (m.#async) {
                CyclicModule.#executeAsyncModule(m);
            } else {
                try {
                    void m.#executeModule();
                    m.#status.asyncEvaluating = false;
                    if (m.#topLevelCapability) {
                        assert(m === m.#status.cycleRoot);
                        m.#topLevelCapability.resolve();
                    }
                } catch (error: any) {
                    CyclicModule.#asyncModuleExecutionRejected(m, error);
                }
            }
        }
    }

    static #asyncModuleExecutionRejected(
        module: CyclicModule,
        error: any,
    ): void {
        assert(module.#status.name === "evaluated");
        if (!module.#status.asyncEvaluating) {
            assert(module.#evaluationError !== undefined);
            return;
        }
        assert(module.#evaluationError === undefined);
        module.#evaluationError = error;
        module.#status.asyncEvaluating = false;
        for (const m of module.#status.asyncParentModules) {
            CyclicModule.#asyncModuleExecutionRejected(m, error);
        }
        if (module.#topLevelCapability) {
            assert(module === module.#status.cycleRoot);
            module.#topLevelCapability.reject(error);
        }
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

    async #link(): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const module = this;
        assert(
            module.#status.name !== "linking"
            && module.#status.name !== "evaluating",
        );
        const stack: Array<CyclicModule> = [];
        try {
            await CyclicModule.#innerModuleLinking(module, stack, 0);
        } catch (err: unknown) {
            for (const m of stack) {
                assert(m.#status.name === "linking");
                m.#status = { name: "unlinked" };
            }
            assert(module.#status.name === "unlinked");
            throw err;
        }
        assert(
            module.#status.name === "linked"
            || module.#status.name === "evaluated",
        );
        assert(stack.length === 0);
    }

    #evaluate(): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let module: CyclicModule = this;
        assert(
            module.#status.name === "linked"
            || this.#status.name === "evaluated",
        );
        if (module.#status.name === "evaluated") {
            module = module.#status.cycleRoot;
        }
        if (module.#topLevelCapability) {
            return module.#topLevelCapability.promise;
        }
        const stack: Array<CyclicModule> = [];
        const capability = new PromiseCapability<void>();
        module.#topLevelCapability = capability;
        try {
            CyclicModule.#innerModuleEvaluation(
                module,
                stack,
                0,
            );
            assert(module.#status.name === "evaluated");
            assert(module.#evaluationError === undefined);
            if (!module.#status.asyncEvaluating) {
                capability.resolve();
            }
            assert(stack.length === 0);
        } catch (error: any) {
            for (const m of stack) {
                assert(m.#status.name === "evaluating");
                m.#status = {
                    name: "evaluated",
                    dfsIndex: m.#status.dfsIndex,
                    dfsAncestorIndex: m.#status.dfsAncestorIndex,
                    asyncEvaluating: m.#status.asyncEvaluating,
                    asyncParentModules: m.#status.asyncParentModules,
                    asyncEvaluatingId,
                    pendingAsyncDependencies: m.#status
                        .pendingAsyncDependencies,
                    cycleRoot: m,
                };
                asyncEvaluatingId += 1;
                m.#evaluationError = { error };
                capability.reject(error);
            }
        }

        return capability.promise;
    }
}

Object.freeze(CyclicModule);
Object.freeze(CyclicModule.prototype);
