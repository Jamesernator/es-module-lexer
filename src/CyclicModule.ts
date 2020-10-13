import Module, { ResolvedExport, ResolveSet } from "./Module.js";

export type ResolveModule
    = (specifier: string, module: CyclicModule) => Module | Promise<Module>;

export type CyclicModuleOptions = {
    requestedModules: Array<string>,
    initializeEnvironment: (linkedModules: Map<string, Module>) => void,
    executeModule: (linkedModules: Map<string, Module>) => void,
    resolveModule: ResolveModule,
    getExportedNames: (
        linkedModules: Map<string, Module>,
        exportStarSet: Set<Module>
    ) => Array<string>,
    resolveExport: (
        linkedModules: Map<string, Module>,
        exportName: string,
        resolveSet: ResolveSet,
    ) => ResolvedExport,
};

export type CyclicModuleStatus
    = { name: "unlinked" }
    | {
        name: "linking",
        dfsIndex: number,
        dfsAncestorIndex: number,
    }
    | { name: "linked" }
    | { name: "evaluating", dfsIndex: number, dfsAncestorIndex: number }
    | { name: "evaluated", result: undefined | { error: any } };

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

    readonly #requestedModules: ReadonlyArray<string>;
    readonly #initializeEnvironment: (linkedModules: Map<string, Module>) => void;
    readonly #executeModule: (linkedModules: Map<string, Module>) => void;
    readonly #resolveModule: ResolveModule;
    readonly #linkedModules = new Map<string, Module>();
    #status: CyclicModuleStatus = { name: "unlinked" };

    constructor({
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
                return getExportedNames(this.#linkedModules, exportStarSet);
            },
            resolveExport: (exportName, resolveSet) => {
                if (this.#status.name === "unlinked") {
                    throw new Error("can't resolve export before linking");
                }
                return resolveExport(
                    this.#linkedModules,
                    exportName,
                    resolveSet,
                );
            },
        });
        if (!Array.isArray(requestedModules)) {
            throw new TypeError("requestedModules must be a list of strings");
        }
        this.#requestedModules = Object.freeze(
            requestedModules.map((i) => String(i)),
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

    #innerModuleLinking = async (
        module: Module,
        stack: Array<CyclicModule>,
        index: number,
    ): Promise<number> => {
        if (!CyclicModule.isCyclicModule(module)) {
            await module.link();
            return index;
        }
        if (module.#status.name === "linking"
        || module.#status.name === "linked"
        || module.#status.name === "evaluated") {
            return index;
        }
        if (module.#status.name !== "unlinked") {
            throw new Error("module should be unlinked before linking");
        }
        module.#status = {
            name: "linking",
            dfsIndex: index,
            dfsAncestorIndex: index,
        };
        index += 1;
        stack.push(module);
        for (const required of module.#requestedModules) {
            const requiredModule = module.#linkedModules.get(required) ??
                await module.#resolveModule(
                    required,
                    module,
                );
            module.#linkedModules.set(required, requiredModule);
            index = await this.#innerModuleLinking(
                requiredModule,
                stack,
                index,
            );
            if (CyclicModule.isCyclicModule(requiredModule)
            && requiredModule.#status.name === "linking") {
                // eslint-disable-next-line require-atomic-updates
                module.#status.dfsAncestorIndex = Math.min(
                    module.#status.dfsAncestorIndex,
                    requiredModule.#status.dfsAncestorIndex,
                );
            }
        }
        module.#initializeEnvironment(module.#linkedModules);
        if (module.#status.dfsAncestorIndex === module.#status.dfsIndex) {
            let done = false;
            while (!done) {
                const requiredModule = stack.pop()!;
                requiredModule.#status = { name: "linked" };
                if (requiredModule === module) {
                    done = true;
                }
            }
        }
        return index;
    };

    #link = async (): Promise<void> => {
        if (this.#status.name === "linking") {
            throw new Error("module can't be linked again during linking");
        }
        if (this.#status.name === "evaluating") {
            throw new Error("module can't be linked during evaluation");
        }
        if (this.#status.name !== "unlinked") {
            return;
        }
        const stack: Array<CyclicModule> = [];
        try {
            await this.#innerModuleLinking(this, stack, 0);
        } catch (error) {
            for (const module of stack) {
                if (module.#status.name !== "linking") {
                    throw new Error("module status must be linking if on stack");
                }
                module.#status = { name: "unlinked" };
            }
            if (this.#status.name !== "unlinked") {
                throw new Error("module status must now be unlinked");
            }
            throw error;
        }
        if (stack.length !== 0) {
            throw new Error("stack should be empty");
        }
    };

    #innerModuleEvaluation = (
        module: Module,
        stack: Array<CyclicModule>,
        index: number,
    ): number => {
        if (!CyclicModule.isCyclicModule(module)) {
            module.evaluate();
            return index;
        }
        if (module.#status.name === "evaluated") {
            if (module.#status.result) {
                throw module.#status.result.error;
            }
            return index;
        }
        if (module.#status.name === "evaluating") {
            return index;
        }
        module.#status = {
            name: "evaluating",
            dfsIndex: index,
            dfsAncestorIndex: index,
        };
        index += 1;
        stack.push(module);
        for (const required of module.#requestedModules) {
            const requiredModule = module.#linkedModules.get(required);
            if (!requiredModule) {
                throw new Error("linked module is missing");
            }
            index = this.#innerModuleEvaluation(
                requiredModule,
                stack,
                index,
            );
            if (CyclicModule.isCyclicModule(requiredModule)
            && requiredModule.#status.name === "evaluating") {
                module.#status.dfsAncestorIndex = Math.min(
                    module.#status.dfsAncestorIndex,
                    requiredModule.#status.dfsAncestorIndex,
                );
            }
        }
        module.#executeModule(module.#linkedModules);
        if (module.#status.dfsAncestorIndex === module.#status.dfsIndex) {
            let done = false;
            while (!done) {
                const requiredModule = stack.pop()!;
                requiredModule.#status = {
                    name: "evaluated",
                    result: undefined,
                };
                if (requiredModule === module) {
                    done = true;
                }
            }
        }
        return index;
    };

    #evaluate = (): void => {
        if (this.#status.name === "evaluating") {
            throw new Error("module may not be evaluated again during evaluation");
        }
        if (this.#status.name !== "linked"
        && this.#status.name !== "evaluated") {
            throw new Error("module must be in state linked or evaluated before calling evaluate");
        }
        const stack: Array<CyclicModule> = [];
        try {
            this.#innerModuleEvaluation(this, stack, 0);
        } catch (error) {
            for (const module of stack) {
                module.#status = { name: "evaluated", result: { error } };
            }
            throw error;
        }
    };

    get status(): CyclicModuleStatus["name"] {
        return this.#status.name;
    }
}

Object.freeze(CyclicModule);
Object.freeze(CyclicModule.prototype);
