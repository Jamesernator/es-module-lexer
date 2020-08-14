import ModuleRecord from "./ModuleRecord.js";

type EvaluationError = { evaluationError: any };

type CyclicModuleState =
    | "unlinked"
    | "linking"
    | "linked"
    | "evaluating"
    | "evaluated";

type ResolveModule = (specifier: string, module: ModuleRecord) => ModuleRecord | Promise<ModuleRecord>;

function assertExists<T>(value: T): NonNullable<T> {
    if (value == null) {
        throw new TypeError("Expected value not to be nullish");
    }
    return value as NonNullable<T>;
}

type CyclicModuleRecordOptions = {
    resolveModule: ResolveModule,
    getRequiredModules: () => Promise<Array<string>>,
    initializeEnvironment: () => void,
    executeModule: () => void,
};

export default abstract class CyclicModuleRecord extends ModuleRecord {
    #state: CyclicModuleState = "unlinked";
    #evaluationError: null | EvaluationError = null;
    #dfsIndex?: number;
    #dfsAncestorIndex?: number;
    #resolveModule: ResolveModule;
    #getRequiredModules: () => Promise<Array<string>>;
    #initializeEnvironment: () => void;
    #executeModule: () => void;

    constructor(options: CyclicModuleRecordOptions) {
        super();
        this.#resolveModule = options.resolveModule;
        this.#getRequiredModules = options.getRequiredModules;
        this.#initializeEnvironment = options.initializeEnvironment;
        this.#executeModule = options.executeModule;
    }

    async link(): Promise<void> {
        if (this.#state !== "unlinked") {
            return;
        }
        this.#state = "linking";
        for (const requiredSpecifier of await this.#getRequiredModules()) {
            const requiredModule = await this.#resolveModule(
                requiredSpecifier,
                this,
            );
            await requiredModule.link();
        }
        this.#state = "linked";
    }

    async evaluate(): Promise<void> {
        if (this.#state === "evaluated" || this.#state === "evaluating") {
            return;
        }
        if (this.#state !== "linked") {
            throw new Error("Can't evaluate module wh;ich is not linked or currently executing");
        }
    }
}
