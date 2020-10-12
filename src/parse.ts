
export type Import = {
    startPosition: number,
    endPosition: number,
    specifier: string,
    imports: Array<{
        importName: string,
        localName: string,
    }>,
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
    exports: Array<{
        importName: string,
        exportName: string,
    }>,
};

export type ParseResult = {
    imports: Array<Import>,
    exports: Array<Export>,
    importMetas: Array<ImportMeta>,
    dynamicImports: Array<DynamicImport>,
};

const PAGE_SIZE = 2**16;


const parserModulePromise = WebAssembly.compile(
    // The string $$ENCODED_WASM$$ is replaced with an encoded wasm blob in Base64 during build
    decodeString("$$ENCODED_WASM$$"),
);

function decodeString(byteString: string): ArrayBuffer {
    return new Uint8Array(
        Array.from(byteString).map((i) => i.charCodeAt(0)),
    ).buffer;
}

export default async function parse(code: string): Promise<ParseResult> {
    const imports: Array<Import> = [];
    const importMetas: Array<ImportMeta> = [];
    const dynamicImports: Array<DynamicImport> = [];
    const exports: Array<Export> = [];

    let openImport: null | {
        startPosition: number,
        imports: Array<{
            importName: string,
            localName: string,
        }>,
    } = null;

    let openExport: null | {
        startPosition: number,
        exports: Array<{
            importName: string,
            exportName: string,
        }>,
    } = null;

    const parserModule = await parserModulePromise;
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
                openImport.imports.push({
                    importName: readIdentifier(importNameStart, importNameLength),
                    localName: readIdentifier(asNameStart, asNameLength),
                });
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
                    // eslint-disable-next-line no-eval, no-useless-call
                    specifier: eval.call(null, `${
                        readString(specifierStart, specifierLength)
                    }`),
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
                if (openExport) {
                    throw new Error("export statement already open");
                }
                openExport = {
                    startPosition,
                    exports: [],
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
                openExport.exports.push({
                    importName: readIdentifier(importNameStart, importNameLength),
                    exportName: readIdentifier(asNameStart, asNameLength),
                });
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
                    exports: openExport.exports,
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
                    // eslint-disable-next-line no-eval, no-useless-call
                    specifier: eval.call(null, `${
                        readString(specifierStart, specifierLength)
                    }`),
                    exports: openExport.exports,
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

    function readIdentifier(start: number, length: number) {
        const string = readString(start, length);
        return JSON.parse(`"${ string }"`);
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
