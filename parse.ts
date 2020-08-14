import fsp from "fs/promises";

export type Import = {
    startPosition: number,
    endPosition: number,
    specifier: string,
    imports: Record<string, string>,
};

export type ImportMeta = {
    startPosition: number,
    endPosition: number,
};

export type DynamicImport = {
    startPosition: number,
    endPosition: number,
    contentStartPosition: number,
    contentEndPosition: number,
};

export type Export = {
    startPosition: number,
    endPosition: number,
    specifier: string | null,
    exports: Record<string, string>,
};

export type ParseResult = {
    imports: Array<Import>,
    exports: Array<Export>,
    importMetas: Array<ImportMeta>,
    dynamicImports: Array<DynamicImport>,
};

const PAGE_SIZE = 2**16;

const wasmFile = new URL("./lexer.wasm", import.meta.url);

let parserModule: WebAssembly.Module;

if (typeof process === "object") {
    parserModule = await WebAssembly.compile(
        await fsp.readFile(wasmFile),
    );
} else {
    parserModule = await WebAssembly.compileStreaming(fetch(wasmFile.href));
}

export default async function parse(code: string): Promise<ParseResult> {
    const imports: Array<Import> = [];
    const importMetas: Array<ImportMeta> = [];
    const dynamicImports: Array<DynamicImport> = [];
    const exports: Array<Export> = [];

    let openImport: null | {
        startPosition: number,
        imports: Array<[string, string]>,
    } = null;

    let openExport: null | {
        startPosition: number,
        exports: Array<[string, string]>,
    } = null;

    const instance = await WebAssembly.instantiate(parserModule, {
        env: {
            syntaxError(start: number, length: number) {
                throw new SyntaxError(readString(start, length));
            },
            openImport(startPosition: number) {
                if (openImport) {
                    throw new Error("import statement already open");
                }
                openImport = {
                    startPosition,
                    imports: [],
                };
            },
            emitImportName(
                importNameStart: number,
                importNameLength: number,
                asNameStart: number,
                asNameLength: number,
            ) {
                if (!openImport) {
                    throw new Error("Emitted name without import");
                }
                openImport.imports.push([
                    readString(importNameStart, importNameLength),
                    readString(asNameStart, asNameLength),
                ]);
            },
            finalizeImport(
                endPosition: number,
                specifierStart: number,
                specifierLength: number,
            ) {
                if (!openImport) {
                    throw new Error("Emitted import without opening");
                }
                imports.push({
                    startPosition: openImport.startPosition,
                    endPosition,
                    specifier: readString(specifierStart, specifierLength),
                    imports: Object.fromEntries(openImport.imports),
                });
                openImport = null;
            },
            emitImportMeta(
                startPosition: number,
                endPosition: number,
            ) {
                importMetas.push({ startPosition, endPosition });
            },
            emitDynamicImport(
                startPosition: number,
                endPosition: number,
                contentStartPosition: number,
                contentEndPosition: number,
            ) {
                dynamicImports.push({
                    startPosition,
                    endPosition,
                    contentStartPosition,
                    contentEndPosition,
                });
            },
            openExport(startPosition: number) {
                if (openExport) {
                    throw new Error("export statement already open");
                }
                openExport = {
                    startPosition,
                    exports: [],
                };
            },
            emitExportName(
                exportNameStart: number,
                exportNameLength: number,
                asNameStart: number,
                asNameLength: number,
            ) {
                if (!openExport) {
                    throw new Error("Emitted export name without opening");
                }
                openExport.exports.push([
                    readString(exportNameStart, exportNameLength),
                    readString(asNameStart, asNameLength),
                ]);
            },
            finalizeExport(
                endPosition: number,
            ) {
                if (!openExport) {
                    throw new Error("Emitted import without opening");
                }
                exports.push({
                    startPosition: openExport.startPosition,
                    endPosition,
                    specifier: null,
                    exports: Object.fromEntries(openExport.exports),
                });
                openExport = null;
            },
            finalizeDelegatedExport(
                endPosition: number,
                specifierStart: number,
                specifierLength: number,
            ) {
                if (!openExport) {
                    throw new Error("Emitted import without opening");
                }
                exports.push({
                    startPosition: openExport.startPosition,
                    endPosition,
                    specifier: readString(specifierStart, specifierLength),
                    exports: Object.fromEntries(openExport.exports),
                });
                openExport = null;
            },
        },
    });


    function readString(start: number, length: number) {
        const characters = new Uint16Array(
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            (instance.exports.memory as WebAssembly.Memory).buffer,
            start,
            length,
        );
        return [...characters]
            .map((ch) => String.fromCharCode(ch))
            .join("");
    }


    const { memory, parse } = instance.exports as {
        memory: WebAssembly.Memory,
        parse: (start: number, length: number) => void,
    };

    const initialPage = memory.grow(
        Math.ceil(code.length / PAGE_SIZE * Uint16Array.BYTES_PER_ELEMENT),
    );

    const characterArray = new Uint16Array(
        memory.buffer,
        initialPage*PAGE_SIZE,
        code.length,
    );

    for (let i = 0; i < code.length; i += 1) {
        characterArray[i] = code[i].charCodeAt(0);
    }

    parse(initialPage*PAGE_SIZE, code.length);

    return {
        imports,
        importMetas,
        dynamicImports,
        exports,
    };
}
