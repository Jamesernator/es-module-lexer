var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Module_instances, _Module_link, _Module_evaluate, _Module_getExportedNames, _Module_resolveExport, _Module_namespace, _Module_isLinked, _Module_isEvaluated, _Module_getModuleNamespace;
import createModuleNamespace from "./createModuleNamespace.js";
export const AMBIGUOUS = Symbol("ambiguous");
export const NAMESPACE = Symbol("namespace");
export default class Module {
    constructor({ link, evaluate, getExportedNames, resolveExport, }) {
        _Module_instances.add(this);
        _Module_link.set(this, void 0);
        _Module_evaluate.set(this, void 0);
        _Module_getExportedNames.set(this, void 0);
        _Module_resolveExport.set(this, void 0);
        _Module_namespace.set(this, undefined);
        _Module_isLinked.set(this, false);
        _Module_isEvaluated.set(this, false);
        if (typeof link !== "function") {
            throw new TypeError("link must be a function");
        }
        if (typeof evaluate !== "function") {
            throw new TypeError("evaluate must be a function");
        }
        if (typeof getExportedNames !== "function") {
            throw new TypeError("getExportedNames must be a function");
        }
        if (typeof resolveExport !== "function") {
            throw new TypeError("resolveExport must be a function");
        }
        __classPrivateFieldSet(this, _Module_link, link, "f");
        __classPrivateFieldSet(this, _Module_evaluate, evaluate, "f");
        __classPrivateFieldSet(this, _Module_getExportedNames, getExportedNames, "f");
        __classPrivateFieldSet(this, _Module_resolveExport, resolveExport, "f");
        Object.freeze(this);
    }
    static isModule(value) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            __classPrivateFieldGet(value, _Module_link, "f");
            return true;
        }
        catch {
            return false;
        }
    }
    static isEvaluated(module) {
        return __classPrivateFieldGet(module, _Module_isEvaluated, "f");
    }
    static isLinked(module) {
        return __classPrivateFieldGet(module, _Module_isLinked, "f");
    }
    static namespace(module) {
        return __classPrivateFieldGet(module, _Module_instances, "m", _Module_getModuleNamespace).call(module);
    }
    static getExportedNames(module, exportStarSet = new Set()) {
        return __classPrivateFieldGet(module, _Module_getExportedNames, "f").call(module, exportStarSet);
    }
    static resolveExport(module, exportName, resolveSet = []) {
        return __classPrivateFieldGet(module, _Module_resolveExport, "f").call(module, exportName, resolveSet);
    }
    static async link(module) {
        await __classPrivateFieldGet(module, _Module_link, "f").call(module);
        // eslint-disable-next-line require-atomic-updates
        __classPrivateFieldSet(module, _Module_isLinked, true, "f");
    }
    static async evaluate(module) {
        if (!Module.isLinked(module)) {
            throw new Error("Module must be linked before evaluation");
        }
        await __classPrivateFieldGet(module, _Module_evaluate, "f").call(module);
        // eslint-disable-next-line require-atomic-updates
        __classPrivateFieldSet(module, _Module_isEvaluated, true, "f");
    }
    get namespace() {
        return Module.namespace(this);
    }
    getExportedNames(exportStarSet = new Set()) {
        return Module.getExportedNames(this, exportStarSet);
    }
    resolveExport(exportName, resolveSet = []) {
        return Module.resolveExport(this, exportName, resolveSet);
    }
    async link() {
        return await Module.link(this);
    }
    async evaluate() {
        return await Module.evaluate(this);
    }
}
_Module_link = new WeakMap(), _Module_evaluate = new WeakMap(), _Module_getExportedNames = new WeakMap(), _Module_resolveExport = new WeakMap(), _Module_namespace = new WeakMap(), _Module_isLinked = new WeakMap(), _Module_isEvaluated = new WeakMap(), _Module_instances = new WeakSet(), _Module_getModuleNamespace = function _Module_getModuleNamespace() {
    if (__classPrivateFieldGet(this, _Module_namespace, "f")) {
        return __classPrivateFieldGet(this, _Module_namespace, "f");
    }
    const resolvedExports = new Map();
    const exportedNames = __classPrivateFieldGet(this, _Module_getExportedNames, "f").call(this, new Set());
    for (const exportName of exportedNames) {
        const resolvedExport = __classPrivateFieldGet(this, _Module_resolveExport, "f").call(this, exportName, []);
        if (resolvedExport !== AMBIGUOUS && resolvedExport !== null) {
            resolvedExports.set(exportName, resolvedExport.getBinding);
        }
    }
    __classPrivateFieldSet(this, _Module_namespace, createModuleNamespace(resolvedExports), "f");
    return __classPrivateFieldGet(this, _Module_namespace, "f");
};
Object.freeze(Module);
Object.freeze(Module.prototype);
//# sourceMappingURL=Module.js.map