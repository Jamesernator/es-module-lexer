var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _SourceTextModule_instances, _SourceTextModule_source, _SourceTextModule_localExportEntries, _SourceTextModule_indirectExportEntries, _SourceTextModule_starExportEntries, _SourceTextModule_moduleEvaluator, _SourceTextModule_getExportedNames, _SourceTextModule_resolveExport;
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
            getExportedNames: (...args) => __classPrivateFieldGet(this, _SourceTextModule_instances, "m", _SourceTextModule_getExportedNames).call(this, ...args),
            resolveExport: (...args) => __classPrivateFieldGet(this, _SourceTextModule_instances, "m", _SourceTextModule_resolveExport).call(this, ...args),
        });
        _SourceTextModule_instances.add(this);
        _SourceTextModule_source.set(this, void 0);
        _SourceTextModule_localExportEntries.set(this, void 0);
        _SourceTextModule_indirectExportEntries.set(this, void 0);
        _SourceTextModule_starExportEntries.set(this, void 0);
        _SourceTextModule_moduleEvaluator.set(this, void 0);
        __classPrivateFieldSet(this, _SourceTextModule_source, source, "f");
        __classPrivateFieldSet(this, _SourceTextModule_localExportEntries, localExportEntries, "f");
        __classPrivateFieldSet(this, _SourceTextModule_indirectExportEntries, indirectExportEntries, "f");
        __classPrivateFieldSet(this, _SourceTextModule_starExportEntries, starExportEntries, "f");
        __classPrivateFieldSet(this, _SourceTextModule_moduleEvaluator, moduleEvaluator, "f");
        Object.freeze(this);
    }
    static isSourceTextModule(value) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            __classPrivateFieldGet(value, _SourceTextModule_source, "f");
            return true;
        }
        catch {
            return false;
        }
    }
    static async fromSource({ source, resolveModule, importModuleDynamically, initializeImportMeta, }) {
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
        return __classPrivateFieldGet(this, _SourceTextModule_source, "f");
    }
}
_SourceTextModule_source = new WeakMap(), _SourceTextModule_localExportEntries = new WeakMap(), _SourceTextModule_indirectExportEntries = new WeakMap(), _SourceTextModule_starExportEntries = new WeakMap(), _SourceTextModule_moduleEvaluator = new WeakMap(), _SourceTextModule_instances = new WeakSet(), _SourceTextModule_getExportedNames = function _SourceTextModule_getExportedNames(exportStarSet) {
    const linkedModules = CyclicModule.linkedModules(this);
    if (exportStarSet.has(this)) {
        return [];
    }
    exportStarSet.add(this);
    const exportedNames = new Set();
    for (const exportEntry of __classPrivateFieldGet(this, _SourceTextModule_localExportEntries, "f")) {
        exportedNames.add(exportEntry.exportName);
    }
    for (const exportEntry of __classPrivateFieldGet(this, _SourceTextModule_indirectExportEntries, "f")) {
        exportedNames.add(exportEntry.exportName);
    }
    for (const exportEntry of __classPrivateFieldGet(this, _SourceTextModule_starExportEntries, "f")) {
        const requestedModule = linkedModules.get(exportEntry.specifier);
        const starNames = Module.getExportedNames(requestedModule, exportStarSet);
        for (const name of starNames) {
            if (name !== "default") {
                exportedNames.add(name);
            }
        }
    }
    return [...exportedNames];
}, _SourceTextModule_resolveExport = function _SourceTextModule_resolveExport(exportName, resolveSet = []) {
    const linkedModules = CyclicModule.linkedModules(this);
    for (const record of resolveSet) {
        if (record.module === this && record.exportName === exportName) {
            return null;
        }
    }
    resolveSet.push({ module: this, exportName });
    for (const exportEntry of __classPrivateFieldGet(this, _SourceTextModule_localExportEntries, "f")) {
        if (exportEntry.exportName === exportName) {
            return {
                module: this,
                bindingName: exportEntry.localName,
                getBinding: __classPrivateFieldGet(this, _SourceTextModule_moduleEvaluator, "f")
                    .getLocalBinding(exportEntry.exportName),
            };
        }
    }
    for (const exportEntry of __classPrivateFieldGet(this, _SourceTextModule_indirectExportEntries, "f")) {
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
    for (const exportEntry of __classPrivateFieldGet(this, _SourceTextModule_starExportEntries, "f")) {
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
};
Object.freeze(SourceTextModule);
Object.freeze(SourceTextModule.prototype);
//# sourceMappingURL=SourceTextModule.js.map