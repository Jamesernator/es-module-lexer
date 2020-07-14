import fsp from "fs/promises";

type Import = {
    startPosition: number,
    endPosition: number,
    specifier: string,
    imports: Record<string, string>,
};

type ImportMeta = {
    startPosition: number,
    endPosition: number,
};

type DynamicImport = {
    startPosition: number,
    endPosition: number,
    contentStartPosition: number,
    contentEndPosition: number,
};

type Export = {
    startPosition: number,
    endPosition: number,
    specifier: string | null,
    exports: Record<string, string>,
};

type ParseResult = {
    imports: Array<Import>,
    exports: Array<Export>,
    importMetas: Array<ImportMeta>,
    dynamicImports: Array<DynamicImport>,
};

const PAGE_SIZE = 2**16;

export default async function parse(code: string): Promise<ParseResult> {
    const module = await WebAssembly.compile(
        await fsp.readFile(new URL("./lexer.wasm", import.meta.url)),
    );

    const imports: Array<Import> = [];
    const importMetas: Array<ImportMeta> = [];
    const dynamicImports: Array<DynamicImport> = [];
    const exports: Array<Export> = [];

    const readString = (start: number, length: number) => {
        const characters = new Uint16Array(
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            (instance.exports.memory as WebAssembly.Memory).buffer,
            start,
            length,
        );
        return [...characters]
            .map((ch) => String.fromCharCode(ch))
            .join("");
    };

    let openImport: null | {
        startPosition: number,
        imports: Record<string, string>,
    } = null;

    let openExport: null | {
        startPosition: number,
        exports: Record<string, string>,
    } = null;

    const instance = await WebAssembly.instantiate(module, {
        env: {
            _consoleLog(start: number, length: number) {
                console.log(readString(start, length));
            },
            _consoleLogInt(n: number) {
                console.log(`>> ${ n }`);
            },
            syntaxError(start: number, length: number) {
                throw new SyntaxError(readString(start, length));
            },
            openImport(startPosition: number) {
                openImport = {
                    startPosition,
                    imports: Object.create(null) as Record<string, string>,
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
                openImport.imports[readString(importNameStart, importNameLength)]
                    = readString(asNameStart, asNameLength);
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
                    imports: openImport.imports,
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
                openExport = {
                    startPosition,
                    exports: Object.create(null) as Record<string, string>,
                };
            },
            emitExportName(
                importNameStart: number,
                importNameLength: number,
                asNameStart: number,
                asNameLength: number,
            ) {
                if (!openExport) {
                    throw new Error("Emitted export name without opening");
                }
                openExport.exports[
                    readString(importNameStart, importNameLength)
                ] = readString(asNameStart, asNameLength);
            },
            finalizeExport(
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
                    specifier:
                        readString(specifierStart, specifierLength) || null,
                    exports: openExport.exports,
                });
                openExport = null;
            },
        },
    });

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
        imports: imports.sort((a, b) => b.startPosition - a.startPosition),
        importMetas: importMetas.sort((a, b) => b.startPosition - a.startPosition),
        dynamicImports: dynamicImports.sort((a, b) => b.startPosition - a.startPosition),
        exports: exports.sort((a, b) => b.startPosition - a.startPosition),
    };
}
