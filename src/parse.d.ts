export declare type Import = {
    startPosition: number;
    endPosition: number;
    specifier: string;
    imports: Record<string, string>;
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
    exports: Record<string, string>;
};
export declare type ParseResult = {
    imports: Array<Import>;
    exports: Array<Export>;
    importMetas: Array<ImportMeta>;
    dynamicImports: Array<DynamicImport>;
};
export default function parse(code: string): Promise<ParseResult>;
