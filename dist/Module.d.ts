export declare type GetExportedNames = (exportStarSet: Set<Module>) => Array<string>;
export declare const AMBIGUOUS: unique symbol;
export declare const NAMESPACE: unique symbol;
export declare type ResolvedBinding = {
    module: Module;
    bindingName: string | typeof NAMESPACE;
    getBinding: () => any;
};
export declare type ResolvedExport = null | typeof AMBIGUOUS | ResolvedBinding;
export declare type ResolveSet = Array<{
    module: Module;
    exportName: string;
}>;
export declare type ResolveExport = (exportName: string, resolveSet: ResolveSet) => ResolvedExport;
export declare type ModuleOptions = {
    link: () => void | Promise<void>;
    evaluate: () => void | Promise<void>;
    getExportedNames: GetExportedNames;
    resolveExport: ResolveExport;
};
export default abstract class Module {
    #private;
    static isModule(value: any): value is Module;
    static isEvaluated(module: Module): boolean;
    static isLinked(module: Module): boolean;
    static namespace(module: Module): any;
    static getExportedNames(module: Module, exportStarSet?: Set<Module>): Array<string>;
    static resolveExport(module: Module, exportName: string, resolveSet?: ResolveSet): ResolvedExport;
    static link(module: Module): Promise<void>;
    static evaluate(module: Module): Promise<void>;
    constructor({ link, evaluate, getExportedNames, resolveExport, }: ModuleOptions);
    get namespace(): any;
    getExportedNames(exportStarSet?: Set<Module>): Array<string>;
    resolveExport(exportName: string, resolveSet?: ResolveSet): ResolvedExport;
    link(): Promise<void>;
    evaluate(): Promise<void>;
}
