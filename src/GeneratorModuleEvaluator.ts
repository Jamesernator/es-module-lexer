import Module, { AMBIGUOUS, NAMESPACE } from "./Module.js";
import type {
    ImportEntry,
    IndirectExportEntry,
    ModuleEvaluator,
} from "./SourceTextModule.js";
import type {
    ModuleEvaluationGenerator,
} from "./createModuleEvaluationGenerator.js";
import createModuleEvaluationGenerator from "./createModuleEvaluationGenerator.js";
import type { ParseResult } from "./parse.js";

type ModuleEvaluatorState
    = "uninitialized"
    | "initializing"
    | "initialized"
    | "evaluating"
    | "evaluated";

type ModuleEvaluatorOptions = {
    source: string,
    parseResult: ParseResult,
    initializeImportMeta: (importMeta: any) => void,
    importModuleDynamically: (specifier: string) => Module | Promise<Module>,
    importEntries: Array<ImportEntry>,
    indirectExportEntries: Array<IndirectExportEntry>,
};

export default class GeneratorModuleEvaluator implements ModuleEvaluator {
    readonly #importEntries: Array<ImportEntry>;
    readonly #indirectExportEntries: Array<IndirectExportEntry>;
    readonly #initializeImportMeta: (importMeta: any) => void;
    readonly #importModuleDynamically: (specifier: string) => Module | Promise<Module>;
    readonly #moduleEvaluationGenerator: ModuleEvaluationGenerator;
    readonly #importMeta: any = Object.create(null);
    readonly #moduleScope: any = Object.create(null);
    readonly #localNamespace: any;

    #state: ModuleEvaluatorState = "uninitialized";

    constructor({
        source,
        parseResult,
        initializeImportMeta,
        importModuleDynamically,
        importEntries,
        indirectExportEntries,
    }: ModuleEvaluatorOptions) {
        const context = {
            scope: this.#moduleScope,
            exports: Object.create(null),
        };
        this.#moduleEvaluationGenerator = createModuleEvaluationGenerator(
            source,
            parseResult,
            context,
        );
        this.#moduleEvaluationGenerator.generator.next();
        this.#localNamespace = context.exports;
        this.#initializeImportMeta = initializeImportMeta;
        this.#importModuleDynamically = importModuleDynamically;
        this.#importEntries = importEntries;
        this.#indirectExportEntries = indirectExportEntries;
    }

    #dynamicImport = async (specifier: any | any): Promise<any> => {
        const module = await this.#importModuleDynamically(String(specifier));
        if (!Module.isEvaluated(module)) {
            throw new Error("importModuleDynamically must evaluate the module");
        }
        return Module.namespace(module);
    };

    initialize(linkedModules: Map<string, Module>): void {
        if (this.#state !== "uninitialized") {
            throw new Error("initialization has already started or completed");
        }
        this.#state = "initializing";
        Object.defineProperty(
            this.#moduleScope,
            this.#moduleEvaluationGenerator.importMetaName,
            {
                get: () => this.#importMeta,
            },
        );
        Object.defineProperty(
            this.#moduleScope,
            this.#moduleEvaluationGenerator.dynamicImportName,
            {
                get: () => this.#dynamicImport,
            },
        );
        for (const entry of this.#importEntries) {
            const linkedModule = linkedModules.get(entry.specifier);
            if (!linkedModule) {
                throw new Error("linkedModules must contain all imported modules");
            }
            let getBinding: undefined | (() => any);
            if (entry.importName === NAMESPACE) {
                getBinding = () => Module.namespace(linkedModule);
            } else {
                const binding = Module.resolveExport(
                    linkedModule,
                    entry.importName,
                );
                if (binding !== null && binding !== AMBIGUOUS) {
                    ({ getBinding } = binding);
                }
            }
            if (getBinding !== undefined) {
                Object.defineProperty(this.#moduleScope, entry.localName, {
                    get: getBinding,
                });
            }
        }
        this.#state = "initialized";
    }

    execute(linkedModules: Map<string, Module>): void {
        if (this.#state !== "initialized") {
            throw new Error("evaluator must be initialized to evaluate");
        }
        this.#state = "evaluating";
        const entries = [
            ...this.#importEntries,
            ...this.#indirectExportEntries,
        ];
        for (const entry of entries) {
            const linkedModule = linkedModules.get(entry.specifier);
            if (!linkedModule) {
                throw new Error("linkedModules must contain all imported modules");
            }
            if (entry.importName !== NAMESPACE) {
                const binding = linkedModule.resolveExport(entry.importName);
                if (binding === null) {
                    throw new SyntaxError(`no imported name ${ JSON.stringify(entry.importName) }`);
                } else if (binding === AMBIGUOUS) {
                    throw new SyntaxError(`imported name ${ entry.importName } is ambiguous`);
                }
            }
        }
        this.#initializeImportMeta(this.#importMeta);
        this.#moduleEvaluationGenerator.generator.next();
        this.#state = "evaluated";
    }

    getLocalBinding(name: string): () => any {
        return () => this.#localNamespace[name];
    }
}
