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
var _GeneratorModuleEvaluator_importEntries, _GeneratorModuleEvaluator_indirectExportEntries, _GeneratorModuleEvaluator_initializeImportMeta, _GeneratorModuleEvaluator_importModuleDynamically, _GeneratorModuleEvaluator_moduleEvaluationGenerator, _GeneratorModuleEvaluator_importMeta, _GeneratorModuleEvaluator_moduleScope, _GeneratorModuleEvaluator_localNamespace, _GeneratorModuleEvaluator_state;
import Module, { AMBIGUOUS, NAMESPACE } from "./Module.js";
import createModuleEvaluationGenerator from "./createModuleEvaluationGenerator.js";
export default class GeneratorModuleEvaluator {
    constructor({ source, parseResult, initializeImportMeta, importModuleDynamically, importEntries, indirectExportEntries, }) {
        _GeneratorModuleEvaluator_importEntries.set(this, void 0);
        _GeneratorModuleEvaluator_indirectExportEntries.set(this, void 0);
        _GeneratorModuleEvaluator_initializeImportMeta.set(this, void 0);
        _GeneratorModuleEvaluator_importModuleDynamically.set(this, void 0);
        _GeneratorModuleEvaluator_moduleEvaluationGenerator.set(this, void 0);
        _GeneratorModuleEvaluator_importMeta.set(this, Object.create(null));
        _GeneratorModuleEvaluator_moduleScope.set(this, Object.create(null));
        _GeneratorModuleEvaluator_localNamespace.set(this, void 0);
        _GeneratorModuleEvaluator_state.set(this, "uninitialized");
        const context = {
            scope: __classPrivateFieldGet(this, _GeneratorModuleEvaluator_moduleScope, "f"),
            exports: Object.create(null),
        };
        __classPrivateFieldSet(this, _GeneratorModuleEvaluator_moduleEvaluationGenerator, createModuleEvaluationGenerator(source, parseResult, context), "f");
        void __classPrivateFieldGet(this, _GeneratorModuleEvaluator_moduleEvaluationGenerator, "f").generator.next();
        __classPrivateFieldSet(this, _GeneratorModuleEvaluator_localNamespace, context.exports, "f");
        __classPrivateFieldSet(this, _GeneratorModuleEvaluator_initializeImportMeta, initializeImportMeta, "f");
        __classPrivateFieldSet(this, _GeneratorModuleEvaluator_importModuleDynamically, importModuleDynamically, "f");
        __classPrivateFieldSet(this, _GeneratorModuleEvaluator_importEntries, importEntries, "f");
        __classPrivateFieldSet(this, _GeneratorModuleEvaluator_indirectExportEntries, indirectExportEntries, "f");
    }
    get async() {
        return __classPrivateFieldGet(this, _GeneratorModuleEvaluator_moduleEvaluationGenerator, "f").isAsync;
    }
    initialize(linkedModules) {
        if (__classPrivateFieldGet(this, _GeneratorModuleEvaluator_state, "f") !== "uninitialized") {
            throw new Error("initialization has already started or completed");
        }
        __classPrivateFieldSet(this, _GeneratorModuleEvaluator_state, "initializing", "f");
        Object.defineProperty(__classPrivateFieldGet(this, _GeneratorModuleEvaluator_moduleScope, "f"), __classPrivateFieldGet(this, _GeneratorModuleEvaluator_moduleEvaluationGenerator, "f").importMetaName, {
            get: () => __classPrivateFieldGet(this, _GeneratorModuleEvaluator_importMeta, "f"),
        });
        Object.defineProperty(__classPrivateFieldGet(this, _GeneratorModuleEvaluator_moduleScope, "f"), __classPrivateFieldGet(this, _GeneratorModuleEvaluator_moduleEvaluationGenerator, "f").dynamicImportName, {
            get: () => __classPrivateFieldGet(this, _GeneratorModuleEvaluator_importModuleDynamically, "f"),
        });
        for (const entry of __classPrivateFieldGet(this, _GeneratorModuleEvaluator_importEntries, "f")) {
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
                Object.defineProperty(__classPrivateFieldGet(this, _GeneratorModuleEvaluator_moduleScope, "f"), entry.localName, {
                    get: getBinding,
                });
            }
        }
        __classPrivateFieldSet(this, _GeneratorModuleEvaluator_state, "initialized", "f");
    }
    execute(linkedModules) {
        if (__classPrivateFieldGet(this, _GeneratorModuleEvaluator_state, "f") !== "initialized") {
            throw new Error("evaluator must be initialized to evaluate");
        }
        __classPrivateFieldSet(this, _GeneratorModuleEvaluator_state, "evaluating", "f");
        const entries = [
            ...__classPrivateFieldGet(this, _GeneratorModuleEvaluator_importEntries, "f"),
            ...__classPrivateFieldGet(this, _GeneratorModuleEvaluator_indirectExportEntries, "f"),
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
        __classPrivateFieldGet(this, _GeneratorModuleEvaluator_initializeImportMeta, "f").call(this, __classPrivateFieldGet(this, _GeneratorModuleEvaluator_importMeta, "f"));
        if (__classPrivateFieldGet(this, _GeneratorModuleEvaluator_moduleEvaluationGenerator, "f").isAsync) {
            const result = __classPrivateFieldGet(this, _GeneratorModuleEvaluator_moduleEvaluationGenerator, "f").generator.next();
            const finishEvaluation = () => {
                __classPrivateFieldSet(this, _GeneratorModuleEvaluator_state, "evaluated", "f");
            };
            return result
                .then(() => undefined)
                .finally(finishEvaluation);
        }
        __classPrivateFieldGet(this, _GeneratorModuleEvaluator_moduleEvaluationGenerator, "f").generator.next();
        __classPrivateFieldSet(this, _GeneratorModuleEvaluator_state, "evaluated", "f");
        return undefined;
    }
    getLocalBinding(name) {
        return () => __classPrivateFieldGet(this, _GeneratorModuleEvaluator_localNamespace, "f")[name];
    }
}
_GeneratorModuleEvaluator_importEntries = new WeakMap(), _GeneratorModuleEvaluator_indirectExportEntries = new WeakMap(), _GeneratorModuleEvaluator_initializeImportMeta = new WeakMap(), _GeneratorModuleEvaluator_importModuleDynamically = new WeakMap(), _GeneratorModuleEvaluator_moduleEvaluationGenerator = new WeakMap(), _GeneratorModuleEvaluator_importMeta = new WeakMap(), _GeneratorModuleEvaluator_moduleScope = new WeakMap(), _GeneratorModuleEvaluator_localNamespace = new WeakMap(), _GeneratorModuleEvaluator_state = new WeakMap();
//# sourceMappingURL=GeneratorModuleEvaluator.js.map