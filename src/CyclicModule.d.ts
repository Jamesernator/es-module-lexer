import Module, { ResolvedExport, ResolveSet } from "./Module.js";
export declare type ResolveModule = (specifier: string, module: CyclicModule) => Module | Promise<Module>;
export declare type CyclicModuleOptions = {
    requestedModules: Array<string>;
    initializeEnvironment: (linkedModules: Map<string, Module>) => void;
    executeModule: () => void;
    resolveModule: ResolveModule;
    getExportedNames: (linkedModules: Map<string, Module>, exportStarSet: Set<Module>) => Array<string>;
    resolveExport: (linkedModules: Map<string, Module>, exportName: string, resolveSet: ResolveSet) => ResolvedExport;
};
export declare type CyclicModuleStatus = {
    name: "unlinked";
} | {
    name: "linking";
    dfsIndex: number;
    dfsAncestorIndex: number;
    initializing: boolean;
} | {
    name: "linked";
} | {
    name: "evaluating";
    dfsIndex: number;
    dfsAncestorIndex: number;
} | {
    name: "evaluated";
    result: undefined | {
        error: any;
    };
};
export default class CyclicModule extends Module {
    #private;
    static isCyclicModule(value: any | any): value is CyclicModule;
    constructor({ requestedModules, initializeEnvironment, executeModule, resolveModule, resolveExport, getExportedNames, }: CyclicModuleOptions);
    get status(): CyclicModuleStatus["name"];
}
