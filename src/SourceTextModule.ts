import type { ResolveModule } from "./CyclicModule.js";
import CyclicModule from "./CyclicModule.js";
import GeneratorModuleEvaluator from "./GeneratorModuleEvaluator.js";
import Module, { AMBIGUOUS, NAMESPACE } from "./Module.js";
import type {
    ResolvedExport,
    ResolveSet,
} from "./Module.js";
import type ReadonlyMap from "./ReadonlyMap.js";
import getModuleEntries from "./getModuleEntries.js";
import parse from "./parse.js";

export interface ModuleEvaluator {
    async: boolean;
    initialize: (linkedModules: ReadonlyMap<string, Module>) => void;
    execute: (linkedModules: ReadonlyMap<string, Module>) => void;
    getLocalBinding: (name: string) => () => any;
}

export type ImportEntry = {
    specifier: string,
    importName: string | typeof NAMESPACE,
    localName: string,
};

export type LocalExportEntry = {
    exportName: string,
    localName: string,
};

export type IndirectExportEntry = {
    specifier: string,
    importName: string | typeof NAMESPACE,
    exportName: string,
};

export type StarExportEntry = {
    specifier: string,
};

export type SourceTextModuleOptions = {
    async: boolean,
    source: string,
    importEntries: Array<ImportEntry>,
    localExportEntries: Array<LocalExportEntry>,
    indirectExportEntries: Array<IndirectExportEntry>,
    starExportEntries: Array<StarExportEntry>,
    moduleEvaluator: ModuleEvaluator,
    requestedModules: Array<string>,
    resolveModule: ResolveModule,
};

export type InitializeImportMeta
    = (importMeta: any, module: SourceTextModule) => void;

export type ImportModuleDynamically
    = (specifier: string, module: SourceTextModule) => void | Promise<void>;

export type SourceTextModuleCreationOptions = {
    source: string,
    resolveModule: ResolveModule,
    initializeImportMeta?: InitializeImportMeta,
    importModuleDynamically?: ImportModuleDynamically,
};

export default class SourceTextModule extends CyclicModule {
    static isSourceTextModule(value: any | any): value is SourceTextModule {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            value.#source;
            return true;
        } catch {
            return false;
        }
    }

    static async create({
        source,
        resolveModule,
        importModuleDynamically,
        initializeImportMeta,
    }: SourceTextModuleCreationOptions): Promise<SourceTextModule> {
        const parseResult = await parse(source);
        const moduleEntries = getModuleEntries(parseResult);
        const requestedModules = [
            ...parseResult.imports,
            ...parseResult.exports,
        ]
            .sort((a, b) => a.startPosition - b.startPosition)
            .flatMap((i) => {
                return i.specifier === null ? [] : i.specifier;
            });

        const uniqueRequestedModules = [...new Set(requestedModules)];
        const moduleEvaluator: ModuleEvaluator = new GeneratorModuleEvaluator({
            source,
            parseResult,
            importEntries: moduleEntries.importEntries,
            indirectExportEntries: moduleEntries.indirectExportEntries,
            initializeImportMeta: (importMeta) => {
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                initializeImportMeta?.(importMeta, module);
            },
            importModuleDynamically: async (specifier: any) => {
                if (typeof importModuleDynamically !== "function") {
                    throw new Error(
                        "No importModuleDynamically hook implemented",
                    );
                }
                specifier = String(specifier);
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                await importModuleDynamically(specifier, module);
                const importedModule = await CyclicModule.resolveModule(
                    // eslint-disable-next-line @typescript-eslint/no-use-before-define
                    module,
                    specifier,
                );
                if (Module.isEvaluated(importedModule)) {
                    throw new Error("dynamically imported module must already be evaluated");
                }
                return importedModule.namespace;
            },
        });
        const module = new SourceTextModule({
            async: moduleEvaluator.async,
            source,
            ...moduleEntries,
            requestedModules: uniqueRequestedModules,
            resolveModule,
            moduleEvaluator,
        });
        return module;
    }

    readonly #source: string;
    readonly #localExportEntries: Array<LocalExportEntry>;
    readonly #indirectExportEntries: Array<IndirectExportEntry>;
    readonly #starExportEntries: Array<StarExportEntry>;
    readonly #moduleEvaluator: ModuleEvaluator;

    constructor({
        async,
        source,
        localExportEntries,
        indirectExportEntries,
        starExportEntries,
        moduleEvaluator,
        requestedModules,
        resolveModule,
    }: SourceTextModuleOptions) {
        const uniqueRequestedModules = [...new Set(requestedModules)];
        super({
            async,
            requestedModules: uniqueRequestedModules,
            resolveModule,
            initializeEnvironment: () => {
                const linkedModules = CyclicModule.linkedModules(this);
                return moduleEvaluator.initialize(linkedModules);
            },
            executeModule: () => {
                const linkedModules = CyclicModule.linkedModules(this);
                return moduleEvaluator.execute(linkedModules);
            },
            getExportedNames: (...args) => this.#getExportedNames(...args),
            resolveExport: (...args) => this.#resolveExport(...args),
        });
        this.#source = source;
        this.#localExportEntries = localExportEntries;
        this.#indirectExportEntries = indirectExportEntries;
        this.#starExportEntries = starExportEntries;
        this.#moduleEvaluator = moduleEvaluator;
        Object.freeze(this);
    }

    #getExportedNames = (
        exportStarSet: Set<Module>,
    ): Array<string> => {
        const linkedModules = CyclicModule.linkedModules(this);
        if (exportStarSet.has(this)) {
            return [];
        }
        exportStarSet.add(this);
        const exportedNames = new Set<string>();
        for (const exportEntry of this.#localExportEntries) {
            exportedNames.add(exportEntry.exportName);
        }
        for (const exportEntry of this.#indirectExportEntries) {
            exportedNames.add(exportEntry.exportName);
        }
        for (const exportEntry of this.#starExportEntries) {
            const requestedModule = linkedModules.get(exportEntry.specifier)!;
            const starNames = Module.getExportedNames(
                requestedModule,
                exportStarSet,
            );
            for (const name of starNames) {
                if (name !== "default") {
                    exportedNames.add(name);
                }
            }
        }
        return [...exportedNames];
    };

    #resolveExport = (
        exportName: string,
        resolveSet: ResolveSet=[],
    ): ResolvedExport => {
        const linkedModules = CyclicModule.linkedModules(this);
        for (const record of resolveSet) {
            if (record.module === this && record.exportName === exportName) {
                return null;
            }
        }
        resolveSet.push({ module: this, exportName });
        for (const exportEntry of this.#localExportEntries) {
            if (exportEntry.exportName === exportName) {
                return {
                    module: this,
                    bindingName: exportEntry.localName,
                    getBinding: this.#moduleEvaluator
                        .getLocalBinding(exportEntry.exportName),
                };
            }
        }
        for (const exportEntry of this.#indirectExportEntries) {
            if (exportEntry.exportName === exportName) {
                const importedModule = linkedModules
                    .get(exportEntry.specifier)!;
                if (exportEntry.importName === NAMESPACE) {
                    return {
                        module: this,
                        bindingName: NAMESPACE,
                        getBinding: () => Module.namespace(importedModule),
                    };
                }

                return Module.resolveExport(
                    importedModule,
                    exportEntry.importName,
                    resolveSet,
                );
            }
        }
        if (exportName === "default") {
            return null;
        }
        let starResolution = null;
        for (const exportEntry of this.#starExportEntries) {
            const importedModule = linkedModules
                .get(exportEntry.specifier)!;
            const resolution = Module.resolveExport(
                importedModule,
                exportName,
                resolveSet,
            );
            if (resolution === AMBIGUOUS) {
                return AMBIGUOUS;
            }
            if (resolution !== null) {
                if (starResolution === null) {
                    starResolution = resolution;
                } else if (resolution.module !== starResolution.module
                    || resolution.bindingName !== starResolution.bindingName) {
                    return AMBIGUOUS;
                }
            }
        }
        return starResolution;
    };

    get source(): string {
        return this.#source;
    }
}

Object.freeze(SourceTextModule);
Object.freeze(SourceTextModule.prototype);
