import Module from "./Module.js";
import type ReadonlyMap from "./ReadonlyMap.js";
import type { ImportEntry, IndirectExportEntry, ModuleEvaluator } from "./SourceTextModule.js";
import type { ParseResult } from "./parse.js";
declare type ModuleEvaluatorOptions = {
    source: string;
    parseResult: ParseResult;
    initializeImportMeta: (importMeta: any) => void;
    importModuleDynamically: (specifier: string) => void | Promise<void>;
    importEntries: Array<ImportEntry>;
    indirectExportEntries: Array<IndirectExportEntry>;
};
export default class GeneratorModuleEvaluator implements ModuleEvaluator {
    #private;
    constructor({ source, parseResult, initializeImportMeta, importModuleDynamically, importEntries, indirectExportEntries, }: ModuleEvaluatorOptions);
    get async(): boolean;
    initialize(linkedModules: ReadonlyMap<string, Module>): void;
    execute(linkedModules: ReadonlyMap<string, Module>): void | Promise<void>;
    getLocalBinding(name: string): () => any;
}
export {};
