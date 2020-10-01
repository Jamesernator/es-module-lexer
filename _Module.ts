import NameGenerator from "./NameGenerator.js";
import parse from "./parse.js";

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


function createGeneratorEvaluator(transformedText: string): (scope: any) => Generator<any, any, any> {
    // eslint-disable-next-line no-new-func, @typescript-eslint/no-implied-eval
    return new Function(`
        // arguments[0] is the import scope
        with (arguments[0]) {
            return function*() {
                "use strict";
                // this allows capturing of hoisted names
                // in the transformedText
                yield s => eval(s);
                ${ transformedText }
            }()
        }
    `) as (scope: any) => Generator<any, any, any>;
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
        const {
            imports,
            importMetas,
            dynamicImports,
            exports,
        } = await parse(this.#state.source);
        const moduleNamespace = Object.create(null);
        const importScope = Object.create(null);
        
    }
}
