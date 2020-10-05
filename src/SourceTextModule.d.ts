import CyclicModule, { ResolveModule } from "./CyclicModule.js";
import type Module from "./Module.js";
export declare type InitializeImportMeta = (importMeta: any, module: SourceTextModule) => void;
export declare type ImportModuleDynamically = (specifier: string, module: SourceTextModule) => Module | Promise<Module>;
export declare type SourceTextModuleOptions = {
    source: string;
    resolveModule: ResolveModule;
    initializeImportMeta?: InitializeImportMeta;
    importModuleDynamically?: ImportModuleDynamically;
};
export declare type ImportEntry = {
    specifier: string;
    importName: string;
    localName: string;
};
export declare type LocalExportEntry = {
    exportName: string;
    localName: string;
};
export declare type IndirectExportEntry = {
    specifier: string;
    importName: string;
    exportName: string;
};
export declare type StarExportEntry = {
    specifier: string;
};
export default class SourceTextModule extends CyclicModule {
    #private;
    static create(options: SourceTextModuleOptions): Promise<SourceTextModule>;
    private constructor();
    get source(): string;
}
