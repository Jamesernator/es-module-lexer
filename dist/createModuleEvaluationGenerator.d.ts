import type { ParseResult } from "./parse.js";
declare type SyncModuleEvaluationGenerator = {
    isAsync: false;
    generator: Generator<any, any, any>;
    importMetaName: string;
    dynamicImportName: string;
};
declare type AsyncModuleEvaluationGenerator = {
    isAsync: true;
    generator: AsyncGenerator<any, any, any>;
    importMetaName: string;
    dynamicImportName: string;
};
export declare type ModuleEvaluationGenerator = SyncModuleEvaluationGenerator | AsyncModuleEvaluationGenerator;
export default function createModuleEvaluationGenerator(sourceText: string, parseResult: ParseResult, context: {
    scope: object;
    exports: any;
}): ModuleEvaluationGenerator;
export {};
