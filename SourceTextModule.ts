import parse from "./parse.js";

export default class SourceTextModule {
    static async fromSource(source: string): Promise<SourceTextModule> {
        const parseResult = await parse(source);
    }

    #parseResult: ParserResult;
}
