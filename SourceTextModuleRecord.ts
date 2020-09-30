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
            console.log(i);
            return {
                start: i.startPosition,
                end: i.endPosition,
                replacement: "",
            };
        }),
    ];
    const transformedSource = replaceRanges(sourceText, replacements);
    console.log(transformedSource);
    return {
        generator: new GeneratorFunction(`
            with (arguments[0]) {
                yield {
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

type UnlinkedState = {
    name: "unlinked",
    evaluate: () => void,
    initializeImportMeta: InitializeImportMeta,
};
type LinkingState = {
    name: "linking",
    evaluate: () => void,
    initializeImportMeta: InitializeImportMeta,
};
type LinkedState = {
    name: "linked",
    evaluate: () => void,
    initializeImportMeta: InitializeImportMeta,
};
type EvaluatingState = { name: "evaluating" };
type EvaluatedState = { name: "evaluated" };
type ErroredState = { name: "errored", error: any };

type ModuleState =
    | UnlinkedState
    | LinkingState
    | LinkedState
    | EvaluatingState
    | EvaluatedState
    | ErroredState;

type SourceTextModuleRecordOptions = {
    initializeImportMeta?: InitializeImportMeta,
};

type Linker
    = (specifier: string, module: SourceTextModuleRecord)
    => SourceTextModuleRecord | Promise<SourceTextModuleRecord>;

export default class SourceTextModuleRecord {
    static async fromSource(
        source: string,
        linker: Linker,
        options: SourceTextModuleRecordOptions={},
    ): Promise<SourceTextModuleRecord> {
        const parseResult = await parse(source);
        return new SourceTextModuleRecord(source, parseResult, linker, options);
    }

    readonly #source: string;
    readonly #state: ModuleState;
    readonly #importScope: any = Object.create(null);
    readonly #namespace: object;
    readonly #linker: Linker;
    readonly #importMeta: object = {};

    private constructor(
        source: string,
        parseResult: ParseResult,
        linker: Linker,
        options: SourceTextModuleRecordOptions,
    ) {
        this.#source = source;
        const {
            generator,
            importMetaName,
        } = createGenerator(source, parseResult, this.#importScope);
        this.#importScope[importMetaName] = this.#importMeta;
        const namespace = generator.next().value;
        this.#namespace = namespace;
        this.#state = {
            name: "unlinked",
            evaluate: () => generator.next(),
            initializeImportMeta: options.initializeImportMeta ?? (() => {}),
        };
        this.#linker = linker;
    }

    get source(): string {
        return this.#source;
    }

    get namespace(): object {
        return this.#namespace;
    }

    async link(): Promise<void> {
        if (this.#state.name !== "unlinked") {
            throw new Error("Module is already linking");
        }
    }
}
