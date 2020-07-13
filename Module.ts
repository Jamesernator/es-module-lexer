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

// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/naming-convention
const GeneratorFunction = function* () {}.constructor as new (...strings: Array<string>) => Generator<any, any, any>;


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
