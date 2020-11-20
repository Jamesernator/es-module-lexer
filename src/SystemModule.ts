import type { ResolveModule } from "./CyclicModule.js";
import CyclicModule from "./CyclicModule.js";
import type { ResolvedExport, ResolveSet } from "./Module.js";
import Module, { AMBIGUOUS, NAMESPACE } from "./Module.js";
import assertExists from "./assertExists.js";

export type ModuleContext = {
    imports: Array<{}>,
    dynamicImport: (arg: string) => Promise<{}>,
    importMeta: any,
};

type IndirectExports = Array<IndirectExportEntry>;

type StarExports = Array<{ specifier: string }>;

type SyncModuleGenerator = {
    async: false,
    generator: Generator<void, void, ModuleContext>,
};

type AsyncModuleGenerator = {
    async: true,
    generator: AsyncGenerator<void, void, ModuleContext>,
};

type ModuleGenerator = SyncModuleGenerator | AsyncModuleGenerator;

type CreateSyncModuleGenerator = {
    async?: false,
    create: (context: { exports: any }) => Generator<void, void, ModuleContext>,
};

type CreateAsyncModuleGenerator = {
    async: true,
    create: (context: { exports: any }) => AsyncGenerator<void, void, ModuleContext>,
};

type CreateGenerator = CreateSyncModuleGenerator | CreateAsyncModuleGenerator;

export type SystemModuleOptions = {
    imports: Array<string>,
    indirectExports?: IndirectExports,
    starExports?: StarExports,
    resolveModule: ResolveModule,
    initializeImportMeta?: InitializeImportMeta,
    importModuleDynamically?: ImportModuleDynamically,
    createGenerator: CreateGenerator,
};

export type IndirectExportEntry = {
    specifier: string,
    importName: string | typeof NAMESPACE,
    exportName: string,
};

export type StarExportEntry = {
    specifier: string,
};

export type ImportModuleDynamically
    = (specifier: string, module: SystemModule) => void | Promise<void>;


export type InitializeImportMeta
    = (importMeta: any, module: SystemModule) => void;


export default class SystemModule extends CyclicModule {
    readonly #imports: Array<string>;
    readonly #exports: any;
    readonly #indirectExportEntries: Array<IndirectExportEntry> = [];
    readonly #starExportEntries: Array<StarExportEntry> = [];
    readonly #moduleGenerator: ModuleGenerator;
    readonly #initializeImportMeta?: InitializeImportMeta;
    readonly #importModuleDynamically?: ImportModuleDynamically;

    constructor({
        imports,
        indirectExports=[],
        starExports=[],
        resolveModule,
        createGenerator,
        initializeImportMeta,
        importModuleDynamically,
    }: SystemModuleOptions) {
        super({
            requestedModules: [
                ...imports,
                ...indirectExports.map((i) => i.specifier),
                ...starExports.map((i) => i.specifier),
            ],
            resolveModule,
            async: createGenerator.async ?? false,
            initializeEnvironment: () => this.#initializeEnvironment(),
            executeModule: () => this.#executeModule(),
            getExportedNames: (exportStarSet) => {
                return this.#getExportedNames(exportStarSet);
            },
            resolveExport: (exportName, resolveSet) => {
                return this.#resolveExport(exportName, resolveSet);
            },
        });
        this.#imports = imports;
        this.#initializeImportMeta = initializeImportMeta;
        this.#importModuleDynamically = importModuleDynamically;
        this.#starExportEntries = [...starExports];
        this.#indirectExportEntries = [...indirectExports];
        const exports = Object.create(null);
        const context = { exports };
        this.#moduleGenerator = {
            async: createGenerator.async ?? false,
            generator: createGenerator.create(context),
        } as ModuleGenerator;
        void this.#moduleGenerator.generator.next();
        this.#exports = context.exports;
        Object.freeze(this.#exports);
    }

    #initializeEnvironment = (): void => {

    };

    #executeModule = (): void | Promise<void> => {
        const importedModules = [];
        const linkedModules = CyclicModule.linkedModules(this);
        for (const specifier of this.#imports) {
            const linkedModule = assertExists(
                linkedModules.get(specifier),
            );
            importedModules.push(linkedModule.namespace);
        }
        const importMeta = Object.create(null);
        this.#initializeImportMeta?.(importMeta, this);
        const dynamicImport = async (specifier: any) => {
            if (!this.#importModuleDynamically) {
                throw new Error("not importModuleDynamically hook specified");
            }
            specifier = String(specifier);
            await this
                .#importModuleDynamically(String(specifier), this);
            const linkedModules = CyclicModule.linkedModules(this);
            const module = assertExists(linkedModules.get(specifier));
            if (!Module.isEvaluated(module)) {
                throw new Error("importModuleDynamically hook must evaluate module");
            }
            return module.namespace;
        };

        const context: ModuleContext = {
            imports: importedModules,
            importMeta,
            dynamicImport,
        };

        if (this.#moduleGenerator.async) {
            const done = this.#moduleGenerator
                .generator
                .next(context)
                .then(() => undefined);
            return done;
        }

        this.#moduleGenerator.generator.next(context);
        return undefined;
    };

    #getLocalBinding = (name: string): () => any => {
        return () => this.#exports[name];
    };

    #getExportedNames = (exportStarSet: Set<Module>): Array<string> => {
        const linkedModules = CyclicModule.linkedModules(this);
        if (exportStarSet.has(this)) {
            return [];
        }
        exportStarSet.add(this);
        const exportedNames = new Set<string>();
        for (const exportedName of Object.keys(this.#exports)) {
            exportedNames.add(exportedName);
        }
        for (const exportEntry of this.#indirectExportEntries) {
            exportedNames.add(exportEntry.exportName);
        }
        for (const exportEntry of this.#starExportEntries) {
            const requestedModule = assertExists(
                linkedModules.get(exportEntry.specifier),
            );
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
        resolveSet: ResolveSet,
    ): ResolvedExport => {
        const linkedModules = CyclicModule.linkedModules(this);
        for (const record of resolveSet) {
            if (record.module === this && record.exportName === exportName) {
                return null;
            }
        }
        resolveSet.push({ module: this, exportName });
        if (exportName in this.#exports) {
            return {
                module: this,
                bindingName: exportName,
                getBinding: this.#getLocalBinding(exportName),
            };
        }
        for (const exportEntry of this.#indirectExportEntries) {
            if (exportEntry.exportName === exportName) {
                const importedModule = assertExists(
                    linkedModules.get(exportEntry.specifier),
                );
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
            const importedModule = assertExists(
                linkedModules.get(exportEntry.specifier),
            );
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
}
