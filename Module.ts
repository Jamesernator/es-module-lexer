
export type GetExportedNames = (exportStarSet: Set<Module>) => Array<string>;

export const AMBIGUOUS = Symbol("ambiguous");
export const NAMESPACE = Symbol("namespace");

type ResolvedBinding = () => any;

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
    readonly #link: () => void | Promise<void>;
    readonly #evaluate: () => void;
    readonly #getExportedNames: GetExportedNames;
    readonly #resolveExport: ResolveExport;
    readonly #namespace?: Record<string, any> = undefined;

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
    }

    #getModuleNamespace = (): any => {
        if (this.#namespace) {
            return this.#namespace;
        }
        const namespace = Object.create(null);
        namespace[Symbol.toStringTag] = "Module";
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
        await this.#link();
    }

    async evaluate(): Promise<void> {
        this.#evaluate();
    }
}
