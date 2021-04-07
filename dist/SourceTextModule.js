var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _source, _localExportEntries, _indirectExportEntries, _starExportEntries, _moduleEvaluator, _getExportedNames, _resolveExport;
import CyclicModule from "./CyclicModule.js";
import GeneratorModuleEvaluator from "./GeneratorModuleEvaluator.js";
import Module, { AMBIGUOUS, NAMESPACE } from "./Module.js";
import getModuleEntries from "./getModuleEntries.js";
import parse from "./parse.js";
export default class SourceTextModule extends CyclicModule {
    constructor({ async, source, localExportEntries, indirectExportEntries, starExportEntries, moduleEvaluator, requestedModules, resolveModule, }) {
        super({
            async,
            requestedModules,
            resolveModule,
            initializeEnvironment: () => {
                const linkedModules = CyclicModule.linkedModules(this);
                return moduleEvaluator.initialize(linkedModules);
            },
            executeModule: () => {
                const linkedModules = CyclicModule.linkedModules(this);
                return moduleEvaluator.execute(linkedModules);
            },
            getExportedNames: (...args) => __classPrivateFieldGet(this, _getExportedNames).call(this, ...args),
            resolveExport: (...args) => __classPrivateFieldGet(this, _resolveExport).call(this, ...args),
        });
        _source.set(this, void 0);
        _localExportEntries.set(this, void 0);
        _indirectExportEntries.set(this, void 0);
        _starExportEntries.set(this, void 0);
        _moduleEvaluator.set(this, void 0);
        _getExportedNames.set(this, (exportStarSet) => {
            const linkedModules = CyclicModule.linkedModules(this);
            if (exportStarSet.has(this)) {
                return [];
            }
            exportStarSet.add(this);
            const exportedNames = new Set();
            for (const exportEntry of __classPrivateFieldGet(this, _localExportEntries)) {
                exportedNames.add(exportEntry.exportName);
            }
            for (const exportEntry of __classPrivateFieldGet(this, _indirectExportEntries)) {
                exportedNames.add(exportEntry.exportName);
            }
            for (const exportEntry of __classPrivateFieldGet(this, _starExportEntries)) {
                const requestedModule = linkedModules.get(exportEntry.specifier);
                const starNames = Module.getExportedNames(requestedModule, exportStarSet);
                for (const name of starNames) {
                    if (name !== "default") {
                        exportedNames.add(name);
                    }
                }
            }
            return [...exportedNames];
        });
        _resolveExport.set(this, (exportName, resolveSet = []) => {
            const linkedModules = CyclicModule.linkedModules(this);
            for (const record of resolveSet) {
                if (record.module === this && record.exportName === exportName) {
                    return null;
                }
            }
            resolveSet.push({ module: this, exportName });
            for (const exportEntry of __classPrivateFieldGet(this, _localExportEntries)) {
                if (exportEntry.exportName === exportName) {
                    return {
                        module: this,
                        bindingName: exportEntry.localName,
                        getBinding: __classPrivateFieldGet(this, _moduleEvaluator).getLocalBinding(exportEntry.exportName),
                    };
                }
            }
            for (const exportEntry of __classPrivateFieldGet(this, _indirectExportEntries)) {
                if (exportEntry.exportName === exportName) {
                    const importedModule = linkedModules
                        .get(exportEntry.specifier);
                    if (exportEntry.importName === NAMESPACE) {
                        return {
                            module: this,
                            bindingName: NAMESPACE,
                            getBinding: () => Module.namespace(importedModule),
                        };
                    }
                    return Module.resolveExport(importedModule, exportEntry.importName, resolveSet);
                }
            }
            if (exportName === "default") {
                return null;
            }
            let starResolution = null;
            for (const exportEntry of __classPrivateFieldGet(this, _starExportEntries)) {
                const importedModule = linkedModules
                    .get(exportEntry.specifier);
                const resolution = Module.resolveExport(importedModule, exportName, resolveSet);
                if (resolution === AMBIGUOUS) {
                    return AMBIGUOUS;
                }
                if (resolution !== null) {
                    if (starResolution === null) {
                        starResolution = resolution;
                    }
                    else if (resolution.module !== starResolution.module
                        || resolution.bindingName !== starResolution.bindingName) {
                        return AMBIGUOUS;
                    }
                }
            }
            return starResolution;
        });
        __classPrivateFieldSet(this, _source, source);
        __classPrivateFieldSet(this, _localExportEntries, localExportEntries);
        __classPrivateFieldSet(this, _indirectExportEntries, indirectExportEntries);
        __classPrivateFieldSet(this, _starExportEntries, starExportEntries);
        __classPrivateFieldSet(this, _moduleEvaluator, moduleEvaluator);
        Object.freeze(this);
    }
    static isSourceTextModule(value) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            __classPrivateFieldGet(value, _source);
            return true;
        }
        catch {
            return false;
        }
    }
    static async create({ source, resolveModule, importModuleDynamically, initializeImportMeta, }) {
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
        const moduleEvaluator = new GeneratorModuleEvaluator({
            source,
            parseResult,
            importEntries: moduleEntries.importEntries,
            indirectExportEntries: moduleEntries.indirectExportEntries,
            initializeImportMeta: (importMeta) => {
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                initializeImportMeta?.(importMeta, module);
            },
            importModuleDynamically: async (specifier) => {
                if (typeof importModuleDynamically !== "function") {
                    throw new Error("No importModuleDynamically hook implemented");
                }
                specifier = String(specifier);
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                await importModuleDynamically(specifier, module);
                const importedModule = await CyclicModule.resolveModule(
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                module, specifier);
                if (!Module.isEvaluated(importedModule)) {
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
    get source() {
        return __classPrivateFieldGet(this, _source);
    }
}
_source = new WeakMap(), _localExportEntries = new WeakMap(), _indirectExportEntries = new WeakMap(), _starExportEntries = new WeakMap(), _moduleEvaluator = new WeakMap(), _getExportedNames = new WeakMap(), _resolveExport = new WeakMap();
Object.freeze(SourceTextModule);
Object.freeze(SourceTextModule.prototype);
//# sourceMappingURL=SourceTextModule.js.map