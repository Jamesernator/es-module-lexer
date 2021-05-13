import Module from "./Module.js";
import type { ResolvedExport, ResolveSet } from "./Module.js";
import ReadonlyMap from "./ReadonlyMap.js";
export declare type ResolveModule = (specifier: string, module: CyclicModule) => Module | Promise<Module>;
declare type UnlinkedState = {
    name: "unlinked";
};
declare type LinkingState = {
    name: "linking";
    dfsIndex: number;
    dfsAncestorIndex: number;
};
declare type LinkedState = {
    name: "linked";
};
declare type EvaluatingState = {
    name: "evaluating";
    dfsIndex: number;
    dfsAncestorIndex: number;
    asyncEvaluating: boolean;
    asyncParentModules: Array<CyclicModule>;
    pendingAsyncDependencies: number;
    asyncEvaluatingId: number;
};
declare type EvaluatedState = {
    name: "evaluated";
    dfsIndex: number;
    dfsAncestorIndex: number;
    asyncParentModules: Array<CyclicModule>;
    asyncEvaluating: boolean;
    asyncEvaluatingId: number;
    pendingAsyncDependencies: number;
    cycleRoot: CyclicModule;
};
export declare type CyclicModuleStatus = UnlinkedState | LinkingState | LinkedState | EvaluatingState | EvaluatedState;
export declare type CyclicModuleOptions = {
    async: boolean;
    requestedModules: Array<string>;
    initializeEnvironment: () => void;
    executeModule: () => void;
    resolveModule: ResolveModule;
    getExportedNames: (exportStarSet: Set<Module>) => Array<string>;
    resolveExport: (exportName: string, resolveSet: ResolveSet) => ResolvedExport;
};
export default class CyclicModule extends Module {
    #private;
    static isCyclicModule(value: any): value is CyclicModule;
    static linkedModules(cyclicModule: CyclicModule): ReadonlyMap<string, Module>;
    static resolveModule(cyclicModule: CyclicModule, specifier: string): Promise<Module>;
    constructor({ async, requestedModules, initializeEnvironment, executeModule, resolveModule, resolveExport, getExportedNames, }: CyclicModuleOptions);
    get async(): boolean;
    get linkedModules(): ReadonlyMap<string, Module>;
    get requestedModules(): ReadonlyArray<string>;
    get status(): CyclicModuleStatus["name"];
    resolveModule(specifier: string): Promise<Module>;
}
export {};
