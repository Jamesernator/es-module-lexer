import ModuleRecord from "./ModuleRecord.js";
import parse, { ParseResult } from "./parse.js";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const GeneratorFunction = function* () { }.constructor as new (...args: Array<string>) =>
(...args: Array<any>) => Generator<any, any, any>;

function createGenerator(sourceText: string, parseResult: ParseResult) {
    const importNames = parseResult.imports.map((i) => i.specifier);
    return new GeneratorFunction(`
        with (arguments[0]) {
            yield [${ importNames.join( ",") }];
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

    private constructor(source: string, parseResult: ParseResult) {
        const g = createGenerator(source, parseResult)({});
        super(g.next().value as Array<string>);
        this.#source = source;
        this.#parseResult = parseResult;
    }
}
