import CyclicModule, { ResolveModule } from "./CyclicModule.js";
import { AMBIGUOUS, NAMESPACE, ResolvedExport, ResolveSet } from "./Module.js";
import type Module from "./Module.js";
import ModuleEvaluator from "./ModuleEvaluator.js";
import parse, { Export, ParseResult } from "./parse.js";

export type InitializeImportMeta
    = (importMeta: any, module: SourceTextModule) => void;

export type ImportModuleDynamically
    = (specifier: string, module: SourceTextModule) => Module | Promise<Module>;

export type SourceTextModuleOptions = {
    source: string,
    resolveModule: ResolveModule,
    initializeImportMeta?: InitializeImportMeta,
    importModuleDynamically?: ImportModuleDynamically,
};

const KEY = Symbol("key");

export type ImportEntry = {
    specifier: string,
    importName: string,
    localName: string,
};

export type LocalExportEntry = {
    exportName: string,
    localName: string,
};

export type IndirectExportEntry = {
    specifier: string,
    importName: string,
    exportName: string,
};

export type StarExportEntry = {
    specifier: string,
};

type EntriesLists = {
    importEntries: Array<ImportEntry>,
    localExportEntries: Array<LocalExportEntry>,
    indirectExportEntries: Array<IndirectExportEntry>,
    starExportEntries: Array<StarExportEntry>,
};

export default class SourceTextModule extends CyclicModule {
    static async create(
        options: SourceTextModuleOptions,
    ): Promise<SourceTextModule> {
        const parseResult = await parse(options.source);
        return new SourceTextModule(KEY, parseResult, options);
    }

    readonly #source: string;
    readonly #localExportEntries: Array<LocalExportEntry>;
    readonly #indirectExportEntries: Array<IndirectExportEntry>;
    readonly #starExportEntries: Array<StarExportEntry>;
    readonly #moduleEvaluator: ModuleEvaluator;

    private constructor(
        key: typeof KEY,
        parseResult: ParseResult,
        {
            source,
            resolveModule,
            initializeImportMeta,
            importModuleDynamically,
        }: SourceTextModuleOptions,
    ) {
        if (key !== KEY) {
            throw new Error("Use SourceTextModule.create() instead");
        }
        const requestedModules = [
            ...parseResult.imports.map((i) => i.specifier),
            ...parseResult.exports.flatMap((i) => {
                return i.specifier === null ? [] : [i.specifier];
            }),
        ];
        const uniqueRequestedModules = [...new Set(requestedModules)];

        super({
            requestedModules: uniqueRequestedModules,
            resolveModule,
            initializeEnvironment: (...args) => {
                return this.#initalizeEnvironment(...args);
            },
            executeModule: (linkedModules: Map<string, Module>) => {
                return this.#executeModule(linkedModules);
            },
            getExportedNames: (...args) => this.#getExportedNames(...args),
            resolveExport: (...args) => this.#resolveExport(...args),
        });
        this.#source = source;
        const {
            importEntries,
            localExportEntries,
            indirectExportEntries,
            starExportEntries,
        } = this.#getEntries(parseResult);
        this.#localExportEntries = localExportEntries;
        this.#indirectExportEntries = indirectExportEntries;
        this.#starExportEntries = starExportEntries;
        this.#moduleEvaluator = new ModuleEvaluator({
            source,
            parseResult,
            initializeImportMeta: (importMeta) => {
                initializeImportMeta?.(importMeta, this);
            },
            importModuleDynamically: (specifier) => {
                if (typeof importModuleDynamically === "function") {
                    return importModuleDynamically(specifier, this);
                }
                throw new Error(
                    "No importModuleDynamically hook implemented",
                );
            },
            importEntries,
        });

        Object.freeze(this);
    }

    #getEntries = (parseResult: ParseResult): EntriesLists => {
        const importEntries: Array<ImportEntry> = parseResult.imports
            .flatMap((i) => {
                return i.imports
                    .map(({ importName, localName }) => ({
                        specifier: i.specifier,
                        importName,
                        localName,
                    }));
            });
        const importedBoundNames = new Set(
            importEntries.map((i) => i.localName),
        );
        const indirectExportEntries: Array<IndirectExportEntry> = [];
        const localExportEntries: Array<LocalExportEntry> = [];
        const starExportEntries: Array<StarExportEntry> = [];

        function addEntry(
            exportEntry: Export,
            name: string,
            asName: string,
        ): void {
            if (exportEntry.specifier === null) {
                if (!importedBoundNames.has(name)) {
                    localExportEntries.push({
                        localName: name,
                        exportName: asName,
                    });
                    return;
                }
                const importEntry = importEntries
                    .find((i) => i.localName === name)!;
                if (importEntry.importName === "*") {
                    localExportEntries.push({
                        localName: name,
                        exportName: asName,
                    });
                } else {
                    indirectExportEntries.push({
                        specifier: importEntry.specifier,
                        importName: importEntry.localName,
                        exportName: asName,
                    });
                }
            } else if (name === "*" && asName === "*") {
                starExportEntries.push({
                    specifier: exportEntry.specifier,
                });
            } else {
                indirectExportEntries.push({
                    specifier: exportEntry.specifier,
                    importName: name,
                    exportName: asName,
                });
            }
        }

        for (const exportEntry of parseResult.exports) {
            for (const { importName, exportName } of exportEntry.exports) {
                addEntry(exportEntry, importName, exportName);
            }
        }

        return {
            importEntries,
            localExportEntries,
            indirectExportEntries,
            starExportEntries,
        };
    };

    #getExportedNames = (
        linkedModules: Map<string, Module>,
        exportStarSet: Set<Module>,
    ): Array<string> => {
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
            const starNames = requestedModule.getExportedNames(exportStarSet);
            for (const name of starNames) {
                if (name !== "default") {
                    exportedNames.add(name);
                }
            }
        }
        return [...exportedNames];
    };

    #resolveExport = (
        linkedModules: Map<string, Module>,
        exportName: string,
        resolveSet: ResolveSet=[],
    ): ResolvedExport => {
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
                    getBinding: () => {
                        return this.#moduleEvaluator
                            .localNamespace[exportEntry.exportName];
                    },
                };
            }
        }
        for (const exportEntry of this.#indirectExportEntries) {
            if (exportEntry.exportName === exportName) {
                const importedModule = linkedModules
                    .get(exportEntry.specifier)!;
                if (exportEntry.importName === "*") {
                    return {
                        module: this,
                        bindingName: NAMESPACE,
                        getBinding: () => importedModule.namespace,
                    };
                }
                return importedModule.resolveExport(
                    exportName,
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
            const resolution = importedModule.resolveExport(
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

    #initalizeEnvironment = (linkedModules: Map<string, Module>): void => {
        this.#moduleEvaluator.initialize(linkedModules);
    };

    #executeModule = (linkedModules: Map<string, Module>): void => {
        this.#moduleEvaluator.evaluate(linkedModules);
    };

    get source(): string {
        return this.#source;
    }
}

Object.freeze(SourceTextModule);
Object.freeze(SourceTextModule.prototype);
