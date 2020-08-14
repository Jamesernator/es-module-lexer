import ModuleRecord from "./ModuleRecord.js";

type EvaluationError = { evaluationError: any };

type CyclicModuleState =
    | "unlinked"
    | "linking"
    | "linked"
    | "evaluating"
    | "evaluated";

type ResolveModule = (specifier: string, module: ModuleRecord) => ModuleRecord | Promise<ModuleRecord>;

type CyclicModuleRecordOptions = {
    requiredModules: Array<string>,
    exportedNames: Array<string>,
    resolveModule: ResolveModule,
    initializeEnvironment: () => void,
    executeModule: () => void,
};

export default abstract class CyclicModuleRecord extends ModuleRecord {
    #state: CyclicModuleState = "unlinked";
    #evaluationError: null | EvaluationError = null;
    #resolveModule: ResolveModule;
    #requiredModules: Array<string>;
    #initializeEnvironment: () => void;
    #executeModule: () => void;
    #linkedModules = new Map<string, ModuleRecord>();
    #exportedNames: Array<string>;

    constructor(options: CyclicModuleRecordOptions) {
        super();
        this.#resolveModule = options.resolveModule;
        this.#requiredModules = options.requiredModules;
        this.#initializeEnvironment = options.initializeEnvironment;
        this.#executeModule = options.executeModule;
        this.#exportedNames = options.exportedNames;
    }

    async link(): Promise<void> {
        if (this.#state !== "unlinked") {
            return;
        }
        this.#state = "linking";
        for (const requiredSpecifier of this.#requiredModules) {
            const requiredModule = await this.#resolveModule(
                requiredSpecifier,
                this,
            );
            this.#linkedModules.set(requiredSpecifier, requiredModule);
            await requiredModule.link();
        }
        this.#initializeEnvironment();
        this.#state = "linked";
    }

    resolveNow(specifier: string): ModuleRecord | undefined {
        return this.#linkedModules.get(specifier);
    }

    async resolve(specifier: string): Promise<ModuleRecord | undefined> {
        return await this.#resolveModule(specifier, this);
    }

    async evaluate(): Promise<void> {
        if (this.#state === "evaluated" || this.#state === "evaluating") {
            if (this.#evaluationError) {
                throw this.#evaluationError.evaluationError;
            }
            return;
        }
        if (this.#state !== "linked") {
            throw new Error("Module must be linked before evluation");
        }
        this.#state = "evaluating";
        for (const module of this.#linkedModules.values()) {
            await module.evaluate();
        }
        try {
            this.#executeModule();
        } catch (err) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            this.#evaluationError = { evaluationError: err };
            throw err;
        } finally {
            this.#state = "evaluated";
        }
    }
}
