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
    evaluate: () => void,
    getExportedNames: GetExportedNames,
    resolveExport: ResolveExport,
};

export default abstract class Module {
    static isModule(value: any | any): value is Module {
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
        return await module.#link();
    }

    static evaluate(module: Module): void {
        return module.#evaluate();
    }

    readonly #link: () => void | Promise<void>;
    readonly #evaluate: () => void;
    readonly #getExportedNames: GetExportedNames;
    readonly #resolveExport: ResolveExport;
    #namespace?: Record<string, any> = undefined;
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
        return this.#getModuleNamespace();
    }

    getExportedNames(exportStarSet: Set<Module>=new Set()): Array<string> {
        return this.#getExportedNames(exportStarSet);
    }

    resolveExport(
        exportName: string,
        resolveSet: ResolveSet=[],
    ): ResolvedExport {
        return this.#resolveExport(exportName, resolveSet);
    }

    async link(): Promise<void> {
        if (this.#isEvaluated) {
            return;
        }
        await this.#link();
    }

    evaluate(): void {
        this.#evaluate();
        this.#isEvaluated = true;
    }
}

Object.freeze(Module);
Object.freeze(Module.prototype);
