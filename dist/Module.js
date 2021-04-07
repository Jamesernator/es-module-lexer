var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _link, _evaluate, _getExportedNames, _resolveExport, _namespace, _isLinked, _isEvaluated, _getModuleNamespace;
import createModuleNamespace from "./createModuleNamespace.js";
export const AMBIGUOUS = Symbol("ambiguous");
export const NAMESPACE = Symbol("namespace");
export default class Module {
    constructor({ link, evaluate, getExportedNames, resolveExport, }) {
        _link.set(this, void 0);
        _evaluate.set(this, void 0);
        _getExportedNames.set(this, void 0);
        _resolveExport.set(this, void 0);
        _namespace.set(this, undefined);
        _isLinked.set(this, false);
        _isEvaluated.set(this, false);
        _getModuleNamespace.set(this, () => {
            if (__classPrivateFieldGet(this, _namespace)) {
                return __classPrivateFieldGet(this, _namespace);
            }
            const resolvedExports = new Map();
            const exportedNames = __classPrivateFieldGet(this, _getExportedNames).call(this, new Set());
            for (const exportName of exportedNames) {
                const resolvedExport = __classPrivateFieldGet(this, _resolveExport).call(this, exportName, []);
                if (resolvedExport !== AMBIGUOUS && resolvedExport !== null) {
                    resolvedExports.set(exportName, resolvedExport.getBinding);
                }
            }
            __classPrivateFieldSet(this, _namespace, createModuleNamespace(resolvedExports));
            return __classPrivateFieldGet(this, _namespace);
        });
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
        __classPrivateFieldSet(this, _link, link);
        __classPrivateFieldSet(this, _evaluate, evaluate);
        __classPrivateFieldSet(this, _getExportedNames, getExportedNames);
        __classPrivateFieldSet(this, _resolveExport, resolveExport);
        Object.freeze(this);
    }
    static isModule(value) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            __classPrivateFieldGet(value, _link);
            return true;
        }
        catch {
            return false;
        }
    }
    static isEvaluated(module) {
        return __classPrivateFieldGet(module, _isEvaluated);
    }
    static isLinked(module) {
        return __classPrivateFieldGet(module, _isLinked);
    }
    static namespace(module) {
        return __classPrivateFieldGet(module, _getModuleNamespace).call(module);
    }
    static getExportedNames(module, exportStarSet = new Set()) {
        return __classPrivateFieldGet(module, _getExportedNames).call(module, exportStarSet);
    }
    static resolveExport(module, exportName, resolveSet = []) {
        return __classPrivateFieldGet(module, _resolveExport).call(module, exportName, resolveSet);
    }
    static async link(module) {
        await __classPrivateFieldGet(module, _link).call(module);
        // eslint-disable-next-line require-atomic-updates
        __classPrivateFieldSet(module, _isLinked, true);
    }
    static async evaluate(module) {
        if (!Module.isLinked(module)) {
            throw new Error("Module must be linked before evaluation");
        }
        await __classPrivateFieldGet(module, _evaluate).call(module);
        // eslint-disable-next-line require-atomic-updates
        __classPrivateFieldSet(module, _isEvaluated, true);
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
_link = new WeakMap(), _evaluate = new WeakMap(), _getExportedNames = new WeakMap(), _resolveExport = new WeakMap(), _namespace = new WeakMap(), _isLinked = new WeakMap(), _isEvaluated = new WeakMap(), _getModuleNamespace = new WeakMap();
Object.freeze(Module);
Object.freeze(Module.prototype);
//# sourceMappingURL=Module.js.map