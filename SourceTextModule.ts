import CyclicModule, { ResolveModule } from "./CyclicModule.js";
import type { ResolvedExport } from "./Module.js";
import type Module from "./Module.js";
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

type ImportEntry = {
    specifier: string,
    importName: string,
    localName: string,
};

type LocalExportEntry = {
    exportName: string,
    localName: string,
};

type IndirectExportEntry = {
    specifier: string,
    importName: string,
    exportName: string,
};

type StarExportEntry = {
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
    readonly #localNamespace: any;
    readonly #moduleScope: any = Object.create(null);
    readonly #importMeta: any = {};
    readonly #importEntries: Array<ImportEntry>;
    readonly #localExportEntries: Array<LocalExportEntry>;
    readonly #indirectExportEntries: Array<IndirectExportEntry>;
    readonly #starExportEntries: Array<StarExportEntry>;

    private constructor(
        key: typeof KEY,
        parseResult: ParseResult,
        {
            source,
            resolveModule,
        }: SourceTextModuleOptions,
    ) {
        if (key !== KEY) {
            throw new Error("Use SourceTextModule.create() instead");
        }
        const importedNames = parseResult.imports.map((i) => i.specifier);
        const uniqueRequestedModules = [...new Set(importedNames)];

        super({
            requestedModules: uniqueRequestedModules,
            resolveModule,
            initializeEnvironment: (...args) => {
                return this.#initalizeEnvironment(...args);
            },
            executeModule: () => this.#executeModule(),
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
        this.#importEntries = importEntries;
        this.#localExportEntries = localExportEntries;
        this.#indirectExportEntries = indirectExportEntries;
        this.#starExportEntries = starExportEntries;
    }

    #getEntries = (parseResult: ParseResult): EntriesLists => {
        const importEntries: Array<ImportEntry> = parseResult.imports
            .flatMap((i) => {
                return Object.entries(i.imports)
                    .map(([importName, localName]) => ({
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
            for (const [name, asName] of Object.entries(exportEntry.exports)) {
                addEntry(exportEntry, name, asName);
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
        resolveSet: Array<{ module: Module, exportName: string }>=[],
    ): ResolvedExport => {

    };

    #initalizeEnvironment = (linkedModules: Map<string, Module>): void => {

    };

    #executeModule = (): void => {

    };
}
