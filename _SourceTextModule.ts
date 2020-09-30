import NameGenerator from "./NameGenerator.js";
import parse, { ParseResult } from "./parse.js";

type GeneratorFunctionConstructor
    = new (...args: Array<string>) =>
    (...args: Array<any>) => Generator<any, any, any>;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const GeneratorFunction = function* () { }.constructor as GeneratorFunctionConstructor;

function createGenerator(sourceText: string, parseResult: ParseResult) {
    const nameGenerator = new NameGenerator(sourceText);
    const importedSpecifiers = [...new Set(
        parseResult.imports.map((i) => i.specifier),
    )];
    const defaultExportName = nameGenerator.createName("default");
    const getters = parseResult.exports.flatMap((e) => {
        return Object.entries(e.exports)
            .map(([localName, asName]) => {
                if (localName === "default") {
                    localName = defaultExportName;
                }
                return `get ${ asName }() { return ${ localName } }`;
            });
    });
    return new GeneratorFunction(`
        with (arguments[0]) {
            yield {
                imports: [${ importedSpecifiers.join(",") }],
                localNamespace: {
                    ${ getters.join(",") }
                },
            };
        }
    `);
}

type Linker
    = (specifier: string, module: SourceTextModule)
    => SourceTextModule | Promise<SourceTextModule>;

export default class SourceTextModule {
    static async fromSource(source: string): Promise<SourceTextModule> {
        const parseResult = await parse(source);
        return new SourceTextModule(source, parseResult);
    }

    #dependencySpecifiers: Array<string>;
    #source: string;
    #parseResult: ParseResult;
    #importScope: object;
    #localNamespace: object;

    private constructor(source: string, parseResult: ParseResult) {
        const importScope = Object.create(null);
        const gen = createGenerator(source, parseResult)(importScope);
        const { imports, namespace } = gen.next().value;
        this.#dependencySpecifiers = imports;
        this.#importScope = importScope;
        this.#source = source;
        this.#parseResult = parseResult;
        this.#localNamespace = namespace;
    }

    get dependencySpecifiers(): Array<string> {
        return this.#dependencySpecifiers;
    }

    async link(linker: Linker): Promise<void> {
        const namespace = Object.create(null);
        Object.defineProperties(
            namespace,
            Object.getOwnPropertyDescriptors(this.#localNamespace),
        );
    }
}
