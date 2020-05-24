
import fs from "fs";

type Import = {
    startPosition: number,
    endPosition: number,
    specifier: string,
    imports: { [importedName: string]: string },
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

type Export = {};

type ParseResult = {
    imports: Array<Import>,
    exports: Array<Export>,
    importMetas: Array<ImportMeta>,
    dynamicImports: Array<DynamicImport>,
};

const PAGE_SIZE = 2**16;

export async function parse(code: string): Promise<ParseResult> {
    const module = await WebAssembly.compile(await fs.promises.readFile(new URL("./lexer.wasm", import.meta.url)));

    const imports: Array<Import> = [];
    const importMetas: Array<ImportMeta> = [];
    const dynamicImports: Array<DynamicImport> = [];
    const exports: Array<Export> = [];

    let openImport: null | {
        startPosition: number,
        imports: { [key: string]: string },
    } = null;

    const readString = (start: number, length: number) => {
        const characters = new Uint16Array(
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            instance.exports.memory.buffer,
            start,
            length,
        );
        return String.fromCharCode(...characters);
    };

    const instance = await WebAssembly.instantiate(module, {
        env: {
            syntaxError(start: number, length: number) {
                throw new SyntaxError(readString(start, length));
            },
            openImport(startPosition: number) {
                openImport = {
                    startPosition,
                    imports: Object.create(null),
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
            emitDynamicImport() {
                console.log("dynamic import");
            },
            _consoleLog(start: number, length: number) {
                console.log(readString(start, length));
            },
            _consoleLogInt(int: number) {
                console.log(int);
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
        exports,
    };
}

type Linker = (specifier: string, parent: SourceTextModule) => SourceTextModule;

type UnlinkedState = { type: "unlinked", sourceText: string };
type LinkingState = { type: "linking" };
type LinkedState = { type: "linked" };
type EvaluatingState = { type: "evaluating" };
type EvaluatedState = { type: "evaluated" };
type ErroredState = { type: "errored" };

type ModuleState =
    | UnlinkedState
    | LinkingState
    | LinkedState
    | EvaluatingState
    | EvaluatedState
    | ErroredState;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const GeneratorFunction = function* () {}.constructor as new (...strings: Array<string>) => Generator<any, any, any>;

class NameGenerator {
    #string: string;
    #names = new Map<string, number>();

    constructor(string: string) {
        this.#string = string;
    }

    createName(prefix: string) {
        let currentN = this.#names.get(prefix) ?? 0;
        while (this.#string.includes(`${ prefix }$${ currentN }`)) {
            currentN += 1;
        }
        this.#names.set(prefix, currentN);
        return `${ prefix }$${ currentN }`;
    }
}

async function createSyntheticModule(
    sourceText: string,
): Promise<Generator<any, any, any>> {
    const {
        imports,
    } = await parse(sourceText);

    const importedNames: Array<{
        name: string,
        asName: string,
        specifier: string,
    }> = [];

    for (const _import of imports) {
        for (const [name, asName] of Object.entries(_import.imports)) {
            importedNames.push({ name, asName, specifier: _import.specifier });
        }
    }

    const nameGenerator = new NameGenerator(sourceText);

    return new GeneratorFunction(`
        const $IMPORT_CAPTURE = {
            __proto__: null,
            $IMPORTS
        };

        with ($IMPORT_CAPTURE) {
            
            $BODY
        }
    `);
}

export default class SourceTextModule {
    #url: string;
    #state: ModuleState;

    constructor(sourceText: string, url: string) {
        this.#state = { type: "unlinked", sourceText };
        this.#url = url;
    }

    get status(): ModuleState["type"] {
        return this.#state.type;
    }

    async link(linker: Linker): Promise<void> {
        if (this.#state.type !== "unlinked") {
            return;
        }
        const syntheticModule = await createSyntheticModule(this.#state.sourceText);
    }
}
