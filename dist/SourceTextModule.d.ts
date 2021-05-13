import type { ResolveModule } from "./CyclicModule.js";
import CyclicModule from "./CyclicModule.js";
import Module, { NAMESPACE } from "./Module.js";
import type ReadonlyMap from "./ReadonlyMap.js";
export interface ModuleEvaluator {
    async: boolean;
    initialize: (linkedModules: ReadonlyMap<string, Module>) => void;
    execute: (linkedModules: ReadonlyMap<string, Module>) => void;
    getLocalBinding: (name: string) => () => any;
}
export declare type ImportEntry = {
    specifier: string;
    importName: string | typeof NAMESPACE;
    localName: string;
};
export declare type LocalExportEntry = {
    exportName: string;
    localName: string;
};
export declare type IndirectExportEntry = {
    specifier: string;
    importName: string | typeof NAMESPACE;
    exportName: string;
};
export declare type StarExportEntry = {
    specifier: string;
};
export declare type SourceTextModuleOptions = {
    async: boolean;
    source: string;
    importEntries: Array<ImportEntry>;
    localExportEntries: Array<LocalExportEntry>;
    indirectExportEntries: Array<IndirectExportEntry>;
    starExportEntries: Array<StarExportEntry>;
    moduleEvaluator: ModuleEvaluator;
    requestedModules: Array<string>;
    resolveModule: ResolveModule;
};
export declare type InitializeImportMeta = (importMeta: any, module: SourceTextModule) => void;
export declare type ImportModuleDynamically = (specifier: string, module: SourceTextModule) => void | Promise<void>;
export declare type SourceTextModuleCreationOptions = {
    source: string;
    resolveModule: ResolveModule;
    initializeImportMeta?: InitializeImportMeta;
    importModuleDynamically?: ImportModuleDynamically;
};
export default class SourceTextModule extends CyclicModule {
    #private;
    static isSourceTextModule(value: any): value is SourceTextModule;
    static fromSource({ source, resolveModule, importModuleDynamically, initializeImportMeta, }: SourceTextModuleCreationOptions): Promise<SourceTextModule>;
    constructor({ async, source, localExportEntries, indirectExportEntries, starExportEntries, moduleEvaluator, requestedModules, resolveModule, }: SourceTextModuleOptions);
    get source(): string;
}
