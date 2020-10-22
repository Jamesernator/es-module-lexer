import createModuleNamespace from "./createModuleNamespace.js";

export type GetExportedNames = (exportStarSet: Set<Module>) => Array<string>;

export const AMBIGUOUS = Symbol("ambiguous");
export const NAMESPACE = Symbol("namespace");

export type ResolvedBinding = {
    module: Module,
    bindingName: string | typeof NAMESPACE,
    getBinding: () => any,
};

export type ResolvedExport = null | typeof AMBIGUOUS | ResolvedBinding;

export type ResolveSet = Array<{ module: Module, exportName: string }>;

export type ResolveExport
    = (
        exportName: string,
        resolveSet: ResolveSet,
    ) => ResolvedExport;

export type ModuleOptions = {
    link: () => void | Promise<void>,
    evaluate: () => void | Promise<void>,
    getExportedNames: GetExportedNames,
    resolveExport: ResolveExport,
};

export default abstract class Module {
    static isModule(value: any): value is Module {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            value.#link;
            return true;
        } catch {
            return false;
        }
    }

    static isEvaluated(module: Module): boolean {
        return module.#isEvaluated;
    }

    static isLinked(module: Module): boolean {
        return module.#isLinked;
    }

    static namespace(module: Module): any {
        return module.#getModuleNamespace();
    }

    static getExportedNames(
        module: Module,
        exportStarSet: Set<Module>=new Set(),
    ): Array<string> {
        return module.#getExportedNames(exportStarSet);
    }

    static resolveExport(
        module: Module,
        exportName: string,
        resolveSet: ResolveSet=[],
    ): ResolvedExport {
        return module.#resolveExport(exportName, resolveSet);
    }

    static async link(module: Module): Promise<void> {
        await module.#link();
        // eslint-disable-next-line require-atomic-updates
        module.#isLinked = true;
    }

    static async evaluate(module: Module): Promise<void> {
        if (!Module.isLinked(module)) {
            throw new Error("Module must be linked before evaluation");
        }
        await module.#evaluate();
        // eslint-disable-next-line require-atomic-updates
        module.#isEvaluated = true;
    }

    readonly #link: () => void | Promise<void>;
    readonly #evaluate: () => void | Promise<void>;
    readonly #getExportedNames: GetExportedNames;
    readonly #resolveExport: ResolveExport;
    #namespace?: Record<string, any> = undefined;
    #isLinked = false;
    #isEvaluated = false;

    constructor({
        link,
        evaluate,
        getExportedNames,
        resolveExport,
    }: ModuleOptions) {
        if (typeof link !== "function") {
            throw new TypeError("link must be a function");
        }
        if (typeof evaluate !== "function") {
            throw new TypeError("evaluate must be a function");
        }
        if (typeof getExportedNames !== "function") {
            throw new TypeError("getExportedNames must be a function");
        }
        if (typeof resolveExport !== "function") {
            throw new TypeError("resolveExport must be a function");
        }
        this.#link = link;
        this.#evaluate = evaluate;
        this.#getExportedNames = getExportedNames;
        this.#resolveExport = resolveExport;
        Object.freeze(this);
    }

    #getModuleNamespace = (): any => {
        if (this.#namespace) {
            return this.#namespace;
        }
        const resolvedExports = new Map<string, () => any>();
        const exportedNames = this.#getExportedNames(new Set());
        for (const exportName of exportedNames) {
            const resolvedExport = this.#resolveExport(exportName, []);
            if (resolvedExport !== AMBIGUOUS && resolvedExport !== null) {
                resolvedExports.set(exportName, resolvedExport.getBinding);
            }
        }
        this.#namespace = createModuleNamespace(resolvedExports);
        return this.#namespace;
    };

    get namespace(): any {
        return Module.namespace(this);
    }

    getExportedNames(exportStarSet: Set<Module>=new Set()): Array<string> {
        return Module.getExportedNames(this, exportStarSet);
    }

    resolveExport(
        exportName: string,
        resolveSet: ResolveSet=[],
    ): ResolvedExport {
        return Module.resolveExport(this, exportName, resolveSet);
    }

    async link(): Promise<void> {
        return await Module.link(this);
    }

    async evaluate(): Promise<void> {
        return await Module.evaluate(this);
    }
}

Object.freeze(Module);
Object.freeze(Module.prototype);
