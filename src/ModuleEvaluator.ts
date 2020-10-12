import Module, { AMBIGUOUS } from "./Module.js";
import NameGenerator from "./NameGenerator.js";
import type { ImportEntry } from "./SourceTextModule.js";
import type { ParseResult } from "./parse.js";
import replaceRanges from "./replaceRanges.js";
import type { RangeReplacement } from "./replaceRanges.js";

export type ModuleEvaluationGenerator = {
    generator: Generator<any, any, any>,
    importMetaName: string,
    dynamicImportName: string,
};

function createModuleEvaluationGenerator(
    sourceText: string,
    parseResult: ParseResult,
    scope: object,
): ModuleEvaluationGenerator {
    const nameGenerator = new NameGenerator(sourceText);
    const defaultExportName = nameGenerator.createName("default");
    const importMetaName = nameGenerator.createName("importMeta");
    const dynamicImportName = nameGenerator.createName("dynamicImport");
    const getters = parseResult.exports
        .filter((e) => e.specifier === null)
        .flatMap((e) => {
            return e.exports
                .map(({ importName, exportName }) => {
                    if (importName === "default") {
                        importName = defaultExportName;
                    }
                    return `get ${ exportName }() { return ${ importName }; }`;
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
            let replacement: string = "";
            if (i.exports[0]?.exportName === "default"
            && i.exports[0]?.importName === "default"
            && i.specifier === null) {
                replacement = `const ${ defaultExportName } = `;
            }
            return {
                start: i.startPosition,
                end: i.endPosition,
                replacement,
            };
        }),
    ];
    const transformedSource = replaceRanges(sourceText, replacements);

    // eslint-disable-next-line no-new-func, @typescript-eslint/no-implied-eval
    const genFunction = new Function(`
        with (arguments[0]) {
            return function*() {
                "use strict";
                yield {
                    __proto__: null,
                    ${ getters.join(",") }
                };
                ${ transformedSource }
            }();
        }
    `);

    return {
        generator: genFunction(scope),
        importMetaName,
        dynamicImportName,
    };
}

type UnitializedState = {
    name: "uninitialized",
};

type InitializingState = {
    name: "initializing",
};

type InitializedState = {
    name: "initialized",
};

type EvaluatingState = {
    name: "evaluating",
};

type EvaluatedState = {
    name: "evaluated",
};

type ModuleEvaluatorState
    = UnitializedState
    | InitializingState
    | InitializedState
    | EvaluatingState
    | EvaluatedState;

type ModuleEvaluatorOptions = {
    source: string,
    parseResult: ParseResult,
    initializeImportMeta: (importMeta: any) => void,
    importModuleDynamically: (specifier: string) => Module | Promise<Module>,
    importEntries: Array<ImportEntry>,
};

export default class ModuleEvaluator {
    readonly #moduleScope: any = Object.create(null);
    readonly #localNamespace: any;
    readonly #importEntries: Array<ImportEntry>;
    readonly #importMeta: any = {};
    readonly #initializeImportMeta: (importMeta: any) => void;
    readonly #importModuleDynamically: (specifier: string) => Module | Promise<Module>;
    readonly #moduleEvaluationGenerator: ModuleEvaluationGenerator;
    #state: ModuleEvaluatorState = { name: "uninitialized" };

    constructor({
        source,
        parseResult,
        initializeImportMeta,
        importModuleDynamically,
        importEntries,
    }: ModuleEvaluatorOptions) {
        this.#moduleEvaluationGenerator = createModuleEvaluationGenerator(
            source,
            parseResult,
            this.#moduleScope,
        );
        this.#localNamespace = this.#moduleEvaluationGenerator
            .generator.next().value;
        this.#importModuleDynamically = importModuleDynamically;
        this.#initializeImportMeta = initializeImportMeta;
        this.#importEntries = importEntries;
    }

    get localNamespace(): any {
        return this.#localNamespace;
    }

    #dynamicImport = async (specifier: string): Promise<any> => {
        const module = await this.#importModuleDynamically(specifier);
        if (!module.isEvaluated) {
            throw new Error("importModuleDynamically must evaluate the module");
        }
        return module.namespace;
    };

    initialize(linkedModules: Map<string, Module>): void {
        if (this.#state.name !== "uninitialized") {
            throw new Error("evaluator is already initialized");
        }
        this.#state = { name: "initializing" };
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
            const binding = entry.importName === "*"
                ? { getBinding: () => linkedModule.namespace }
                : linkedModule.resolveExport(entry.importName);
            if (binding !== null && binding !== AMBIGUOUS) {
                Object.defineProperty(this.#moduleScope, entry.localName, {
                    get: binding.getBinding,
                });
            }
        }
        this.#state = { name: "initialized" };
    }

    evaluate(linkedModules: Map<string, Module>): void {
        if (this.#state.name !== "initialized") {
            throw new Error("evaluator must be initialized to evaluate");
        }
        this.#state = { name: "evaluating" };
        for (const entry of this.#importEntries) {
            const linkedModule = linkedModules.get(entry.specifier);
            if (!linkedModule) {
                throw new Error("linkedModules must contain all imported modules");
            }
            if (entry.importName !== "*") {
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
        this.#state = { name: "evaluated" };
    }
}
