import ModuleRecord from "./ModuleRecord.js";
import NameGenerator from "./NameGenerator.js";
import parse, { ParseResult } from "./parse.js";

type GeneratorFunctionConstructor
    = new (...args: Array<string>) =>
    (...args: Array<any>) => Generator<any, any, any>;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const GeneratorFunction = function* () { }.constructor as GeneratorFunctionConstructor;

function createGenerator(sourceText: string, parseResult: ParseResult) {
    const nameGenerator = new NameGenerator(sourceText);
    const importNames = [...new Set(
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
            yield [${ importNames.join( ",") }];
            yield {
                imports: [${ importNames.join(",") }],
                localNamespace: ${ getters.join(",") },
            };
        }
    `);
}

export default class SourceTextModule extends ModuleRecord {
    static async fromSource(source: string): Promise<SourceTextModule> {
        const parseResult = await parse(source);
        return new SourceTextModule(source, parseResult);
    }

    #source: string;
    #parseResult: ParseResult;
    #importScope: any = Object.create(null);

    private constructor(source: string, parseResult: ParseResult) {
        const g = createGenerator(source, parseResult)({});
        super(g.next().value as Array<string>);
        this.#source = source;
        this.#parseResult = parseResult;
    }
}
