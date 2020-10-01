import NameGenerator from "./NameGenerator.js";
import parse, { ParseResult } from "./parse.js";
import replaceRanges from "./replaceRanges.js";
import type { RangeReplacement } from "./replaceRanges.js";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const GeneratorFunction = function* () { }.constructor as GeneratorFunctionConstructor;

function createGenerator(
    sourceText: string,
    parseResult: ParseResult,
    scope: object,
) {
    const nameGenerator = new NameGenerator(sourceText);
    const defaultExportName = nameGenerator.createName("default");
    const importMetaName = nameGenerator.createName("importMeta");
    const dynamicImportName = nameGenerator.createName("dynamicImport");
    const getters = parseResult.exports.flatMap((e) => {
        return Object.entries(e.exports)
            .map(([localName, asName]) => {
                if (localName === "default") {
                    localName = defaultExportName;
                }
                return `get ${ asName }() { return ${ localName } }`;
            });
    });
    const replacements: Array<RangeReplacement> = [
        ...parseResult.imports.map((i) => {
            return {
                start: i.startPosition,
                end: i.endPosition,
                replacement: "",
            };
        }),
        ...parseResult.dynamicImports.map((i) => {
            return {
                start: i.startPosition,
                end: i.startPosition + 6,
                replacement: dynamicImportName,
            };
        }),
        ...parseResult.importMetas.map((i) => {
            return {
                start: i.startPosition,
                end: i.endPosition,
                replacement: importMetaName,
            };
        }),
        ...parseResult.exports.map((i) => {
            return {
                start: i.startPosition,
                end: i.endPosition,
                replacement: "",
            };
        }),
    ];
    const transformedSource = replaceRanges(sourceText, replacements);
    return {
        generator: new GeneratorFunction(`
            with (arguments[0]) {
                yield {
                    __proto__: null,
                    ${ getters.join(",") }
                };
                ${ transformedSource }
            }
        `)(scope),
        importMetaName,
        dynamicImportName,
    };
}

type InitializeImportMeta
    = (importMeta: object, module: SourceTextModuleRecord) => void;

type Linker
    = (specifier: string, module: SourceTextModuleRecord)
    => SourceTextModuleRecord | Promise<SourceTextModuleRecord>;

type UnlinkedState = {
    name: "unlinked",
};
type LinkingState = {
    name: "linking",
};
type LinkedState = {
    name: "linked",
};
type EvaluatingState = {
    name: "evaluating",
};
type EvaluatedState = {
    name: "evaluated",
};
type ErroredState = { name: "errored", error: any };

type ModuleState =
    | UnlinkedState
    | LinkingState
    | LinkedState
    | EvaluatingState
    | EvaluatedState
    | ErroredState;

type SourceTextModuleRecordOptions = {
    linker: Linker,
    initializeImportMeta?: InitializeImportMeta,
};

export default class SourceTextModuleRecord {
    static async fromSource(
        source: string,
        options: SourceTextModuleRecordOptions,
    ): Promise<SourceTextModuleRecord> {
        const parseResult = await parse(source);
        return new SourceTextModuleRecord(source, parseResult, options);
    }

    readonly #source: string;
    readonly #parseResult: ParseResult;
    #state: ModuleState;
    readonly #importScope: any = Object.create(null);
    readonly #namespace: object;
    readonly #importMeta: object = {};
    readonly #linker: Linker;

    private constructor(
        source: string,
        parseResult: ParseResult,
        options: SourceTextModuleRecordOptions,
    ) {
        this.#source = source;
        this.#parseResult = parseResult;
        this.#linker = options.linker;
        const {
            generator,
            importMetaName,
        } = createGenerator(source, parseResult, this.#importScope);
        this.#importScope[importMetaName] = this.#importMeta;
        this.#namespace = generator.next().value;
        this.#state = { name: "unlinked" };
    }

    get state(): string {
        return this.#state.name;
    }

    get source(): string {
        return this.#source;
    }

    get namespace(): any {
        return this.#namespace;
    }

    get importScope(): any {
        return this.#importScope;
    }

    async link(): Promise<void> {
        if (this.#state.name !== "unlinked") {
            throw new Error("module state must be unlinked");
        }
        this.#state = { name: "linking" };
        try {
            for (const importedModule of this.#parseResult.imports) {
                const linkedModule = await this.#linker(
                    importedModule.specifier,
                    this,
                );
                if (linkedModule.#state.name === "unlinked") {
                    await linkedModule.link();
                }
                for (const [name, asName] of Object.entries(importedModule.imports)) {
                    Object.defineProperty(this.#importScope, asName, {
                        get() {
                            return linkedModule.namespace[name];
                        },
                    });
                }
            }
            this.#state = { name: "linked" };
        } catch (error) {
            this.#state = { name: "errored", error };
        }
    }
}
