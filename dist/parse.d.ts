import { NAMESPACE } from "./Module.js";
export declare type Import = {
    startPosition: number;
    endPosition: number;
    specifier: string;
    imports: Array<{
        importName: string | typeof NAMESPACE;
        localName: string;
    }>;
};
export declare type ImportMeta = {
    startPosition: number;
    endPosition: number;
};
export declare type DynamicImport = {
    startPosition: number;
    endPosition: number;
    contentStartPosition: number;
    contentEndPosition: number;
};
export declare type Export = {
    startPosition: number;
    endPosition: number;
    specifier: string | null;
    exports: Array<{
        importName: string | typeof NAMESPACE;
        exportName: string | typeof NAMESPACE;
    }>;
};
export declare type ParseResult = {
    imports: Array<Import>;
    exports: Array<Export>;
    importMetas: Array<ImportMeta>;
    dynamicImports: Array<DynamicImport>;
};
export default function parse(code: string): Promise<ParseResult>;
