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
var _importEntries, _indirectExportEntries, _initializeImportMeta, _importModuleDynamically, _moduleEvaluationGenerator, _importMeta, _moduleScope, _localNamespace, _state;
import Module, { AMBIGUOUS, NAMESPACE } from "./Module.js";
import createModuleEvaluationGenerator from "./createModuleEvaluationGenerator.js";
export default class GeneratorModuleEvaluator {
    constructor({ source, parseResult, initializeImportMeta, importModuleDynamically, importEntries, indirectExportEntries, }) {
        _importEntries.set(this, void 0);
        _indirectExportEntries.set(this, void 0);
        _initializeImportMeta.set(this, void 0);
        _importModuleDynamically.set(this, void 0);
        _moduleEvaluationGenerator.set(this, void 0);
        _importMeta.set(this, Object.create(null));
        _moduleScope.set(this, Object.create(null));
        _localNamespace.set(this, void 0);
        _state.set(this, "uninitialized");
        const context = {
            scope: __classPrivateFieldGet(this, _moduleScope),
            exports: Object.create(null),
        };
        __classPrivateFieldSet(this, _moduleEvaluationGenerator, createModuleEvaluationGenerator(source, parseResult, context));
        void __classPrivateFieldGet(this, _moduleEvaluationGenerator).generator.next();
        __classPrivateFieldSet(this, _localNamespace, context.exports);
        __classPrivateFieldSet(this, _initializeImportMeta, initializeImportMeta);
        __classPrivateFieldSet(this, _importModuleDynamically, importModuleDynamically);
        __classPrivateFieldSet(this, _importEntries, importEntries);
        __classPrivateFieldSet(this, _indirectExportEntries, indirectExportEntries);
    }
    get async() {
        return __classPrivateFieldGet(this, _moduleEvaluationGenerator).isAsync;
    }
    initialize(linkedModules) {
        if (__classPrivateFieldGet(this, _state) !== "uninitialized") {
            throw new Error("initialization has already started or completed");
        }
        __classPrivateFieldSet(this, _state, "initializing");
        Object.defineProperty(__classPrivateFieldGet(this, _moduleScope), __classPrivateFieldGet(this, _moduleEvaluationGenerator).importMetaName, {
            get: () => __classPrivateFieldGet(this, _importMeta),
        });
        Object.defineProperty(__classPrivateFieldGet(this, _moduleScope), __classPrivateFieldGet(this, _moduleEvaluationGenerator).dynamicImportName, {
            get: () => __classPrivateFieldGet(this, _importModuleDynamically),
        });
        for (const entry of __classPrivateFieldGet(this, _importEntries)) {
            const linkedModule = linkedModules.get(entry.specifier);
            if (!linkedModule) {
                throw new Error("linkedModules must contain all imported modules");
            }
            let getBinding;
            if (entry.importName === NAMESPACE) {
                getBinding = () => Module.namespace(linkedModule);
            }
            else {
                const binding = Module.resolveExport(linkedModule, entry.importName);
                if (binding !== null && binding !== AMBIGUOUS) {
                    ({ getBinding } = binding);
                }
            }
            if (getBinding !== undefined) {
                Object.defineProperty(__classPrivateFieldGet(this, _moduleScope), entry.localName, {
                    get: getBinding,
                });
            }
        }
        __classPrivateFieldSet(this, _state, "initialized");
    }
    execute(linkedModules) {
        if (__classPrivateFieldGet(this, _state) !== "initialized") {
            throw new Error("evaluator must be initialized to evaluate");
        }
        __classPrivateFieldSet(this, _state, "evaluating");
        const entries = [
            ...__classPrivateFieldGet(this, _importEntries),
            ...__classPrivateFieldGet(this, _indirectExportEntries),
        ];
        for (const entry of entries) {
            const linkedModule = linkedModules.get(entry.specifier);
            if (!linkedModule) {
                throw new Error("linkedModules must contain all imported modules");
            }
            if (entry.importName !== NAMESPACE) {
                const binding = linkedModule.resolveExport(entry.importName);
                if (binding === null) {
                    throw new SyntaxError(`no imported name ${JSON.stringify(entry.importName)}`);
                }
                else if (binding === AMBIGUOUS) {
                    throw new SyntaxError(`imported name ${entry.importName} is ambiguous`);
                }
            }
        }
        __classPrivateFieldGet(this, _initializeImportMeta).call(this, __classPrivateFieldGet(this, _importMeta));
        if (__classPrivateFieldGet(this, _moduleEvaluationGenerator).isAsync) {
            const result = __classPrivateFieldGet(this, _moduleEvaluationGenerator).generator.next();
            const finishEvaluation = () => {
                __classPrivateFieldSet(this, _state, "evaluated");
            };
            return result
                .then(() => undefined)
                .finally(finishEvaluation);
        }
        __classPrivateFieldGet(this, _moduleEvaluationGenerator).generator.next();
        __classPrivateFieldSet(this, _state, "evaluated");
        return undefined;
    }
    getLocalBinding(name) {
        return () => __classPrivateFieldGet(this, _localNamespace)[name];
    }
}
_importEntries = new WeakMap(), _indirectExportEntries = new WeakMap(), _initializeImportMeta = new WeakMap(), _importModuleDynamically = new WeakMap(), _moduleEvaluationGenerator = new WeakMap(), _importMeta = new WeakMap(), _moduleScope = new WeakMap(), _localNamespace = new WeakMap(), _state = new WeakMap();
//# sourceMappingURL=GeneratorModuleEvaluator.js.map