import Module from "./Module.js";
import type { ImportEntry } from "./SourceTextModule.js";
import type { ParseResult } from "./parse.js";
export declare type ModuleEvaluationGenerator = {
    generator: Generator<any, any, any>;
    importMetaName: string;
    dynamicImportName: string;
};
declare type ModuleEvaluatorOptions = {
    source: string;
    parseResult: ParseResult;
    initializeImportMeta: (importMeta: any) => void;
    importModuleDynamically: (specifier: string) => Module | Promise<Module>;
    importEntries: Array<ImportEntry>;
};
export default class ModuleEvaluator {
    #private;
    constructor({ source, parseResult, initializeImportMeta, importModuleDynamically, importEntries, }: ModuleEvaluatorOptions);
    get localNamespace(): any;
    initialize(linkedModules: Map<string, Module>): void;
    evaluate(): void;
}
export {};
