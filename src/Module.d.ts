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
    evaluate: () => void;
    getExportedNames: GetExportedNames;
    resolveExport: ResolveExport;
};
export default abstract class Module {
    #private;
    constructor({ link, evaluate, getExportedNames, resolveExport, }: ModuleOptions);
    get namespace(): any;
    get isEvaluated(): boolean;
    getExportedNames(exportStarSet?: Set<Module>): Array<string>;
    resolveExport(exportName: string, resolveSet?: ResolveSet): ResolvedExport;
    link(): Promise<void>;
    evaluate(): void;
}
