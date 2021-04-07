'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function isAccessorDescriptor(descriptor) {
    return Boolean(descriptor.get ?? descriptor.set);
}
function createModuleNamespace(resolvedExports) {
    const sortedExportNames = Array.from(resolvedExports.keys()).sort();
    const target = Object.create(null);
    Object.defineProperty(target, Symbol.toStringTag, {
        value: "Module",
    });
    for (const exportName of sortedExportNames) {
        Object.defineProperty(target, exportName, {
            value: undefined,
            enumerable: true,
            writable: true,
            configurable: false,
        });
    }
    Object.preventExtensions(target);
    return new Proxy(target, {
        setPrototypeOf(target, proto) {
            return proto === null;
        },
        getOwnPropertyDescriptor(target, prop) {
            if (typeof prop === "symbol") {
                return Reflect.getOwnPropertyDescriptor(target, prop);
            }
            if (!Reflect.has(target, prop)) {
                return undefined;
            }
            const getBinding = resolvedExports.get(prop);
            Reflect.set(target, prop, getBinding());
            return Reflect.getOwnPropertyDescriptor(target, prop);
        },
        defineProperty(target, prop, descriptor) {
            if (typeof prop === "symbol") {
                return Reflect.defineProperty(target, prop, descriptor);
            }
            const current = Reflect.getOwnPropertyDescriptor(target, prop);
            if (current === undefined) {
                return false;
            }
            if (isAccessorDescriptor(current)) {
                return false;
            }
            if (descriptor.writable !== undefined
                && !descriptor.writable) {
                return false;
            }
            if (descriptor.enumerable !== undefined
                && !descriptor.enumerable) {
                return false;
            }
            if (descriptor.configurable !== undefined
                && descriptor.configurable) {
                return false;
            }
            if ("value" in descriptor) {
                return Object.is(descriptor.value, current.value);
            }
            return true;
        },
        get(target, prop, receiver) {
            if (typeof prop === "symbol") {
                return Reflect.get(target, prop, receiver);
            }
            const getBinding = resolvedExports.get(prop);
            const value = getBinding?.();
            if (getBinding) {
                Reflect.set(target, prop, value);
            }
            return value;
        },
        set() {
            return false;
        },
    });
}

var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _link, _evaluate, _getExportedNames, _resolveExport, _namespace, _isLinked, _isEvaluated, _getModuleNamespace;
const AMBIGUOUS = Symbol("ambiguous");
const NAMESPACE = Symbol("namespace");
class Module {
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

var __classPrivateFieldSet$1 = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet$1 = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _map;
class ReadonlyMap {
    constructor(map) {
        _map.set(this, void 0);
        __classPrivateFieldSet$1(this, _map, map);
    }
    get(key) {
        return __classPrivateFieldGet$1(this, _map).get(key);
    }
    has(key) {
        return __classPrivateFieldGet$1(this, _map).has(key);
    }
    *entries() {
        yield* __classPrivateFieldGet$1(this, _map).entries();
    }
    *values() {
        yield* __classPrivateFieldGet$1(this, _map).values();
    }
    *keys() {
        yield* __classPrivateFieldGet$1(this, _map).keys();
    }
}
_map = new WeakMap();
Object.freeze(ReadonlyMap);
Object.freeze(ReadonlyMap.prototype);

function assert(condition, message) {
    if (!condition) {
        throw new Error(message ?? "assertion failed");
    }
}

var __classPrivateFieldSet$2 = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet$2 = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _resolve, _reject, _promise, _requestedModules, _initializeEnvironment, _executeModule, _resolveModule, _async, _linkedModules, _linkedModulesView, _evaluationError, _topLevelCapability, _status, _linkRequiredModule, _finalizeLinking, _innerModuleLinking, _link$1, _getAsyncCycleRoot, _onDependencyFinishedSuccessfully, _asyncModuleExecutionFulfilled, _asyncModuleExectionRejected, _executeAsyncModule, _executeOtherModule, _executeRequiredModule, _finalizeEvaluation, _innerModuleEvaluation, _evaluate$1;
class PromiseCapability {
    constructor() {
        _resolve.set(this, void 0);
        _reject.set(this, void 0);
        _promise.set(this, new Promise((resolve, reject) => {
            __classPrivateFieldSet$2(this, _resolve, resolve);
            __classPrivateFieldSet$2(this, _reject, reject);
        }));
    }
    get resolve() {
        return __classPrivateFieldGet$2(this, _resolve);
    }
    get reject() {
        return __classPrivateFieldGet$2(this, _reject);
    }
    get promise() {
        return __classPrivateFieldGet$2(this, _promise);
    }
}
_resolve = new WeakMap(), _reject = new WeakMap(), _promise = new WeakMap();
class CyclicModule extends Module {
    constructor({ async, requestedModules, initializeEnvironment, executeModule, resolveModule, resolveExport, getExportedNames, }) {
        super({
            link: () => __classPrivateFieldGet$2(this, _link$1).call(this),
            evaluate: () => __classPrivateFieldGet$2(this, _evaluate$1).call(this),
            getExportedNames: (exportStarSet) => {
                if (__classPrivateFieldGet$2(this, _status).name === "unlinked") {
                    throw new Error("can't get exported names before linking");
                }
                return getExportedNames(exportStarSet);
            },
            resolveExport: (exportName, resolveSet) => {
                if (__classPrivateFieldGet$2(this, _status).name === "unlinked") {
                    throw new Error("can't resolve export before linking");
                }
                return resolveExport(exportName, resolveSet);
            },
        });
        _requestedModules.set(this, void 0);
        _initializeEnvironment.set(this, void 0);
        _executeModule.set(this, void 0);
        _resolveModule.set(this, void 0);
        _async.set(this, void 0);
        _linkedModules.set(this, new Map());
        _linkedModulesView.set(this, new ReadonlyMap(__classPrivateFieldGet$2(this, _linkedModules)));
        _evaluationError.set(this, void 0);
        _topLevelCapability.set(this, void 0);
        _status.set(this, { name: "unlinked" });
        _linkRequiredModule.set(this, async (requiredSpecifier, stack, index) => {
            assert(__classPrivateFieldGet$2(this, _status).name === "linking");
            const requiredModule = await CyclicModule.resolveModule(this, requiredSpecifier);
            if (CyclicModule.isCyclicModule(requiredModule)) {
                index = await __classPrivateFieldGet$2(requiredModule, _innerModuleLinking).call(requiredModule, stack, index);
                assert(__classPrivateFieldGet$2(requiredModule, _status).name === "linking"
                    || __classPrivateFieldGet$2(requiredModule, _status).name === "linked"
                    || __classPrivateFieldGet$2(requiredModule, _status).name === "evaluated");
                if (__classPrivateFieldGet$2(requiredModule, _status).name === "linking") {
                    assert(stack.includes(requiredModule));
                    __classPrivateFieldGet$2(this, _status).dfsAncestorIndex = Math.min(__classPrivateFieldGet$2(this, _status).dfsAncestorIndex, __classPrivateFieldGet$2(requiredModule, _status).dfsAncestorIndex);
                }
            }
            else {
                await requiredModule.link();
            }
            return index;
        });
        _finalizeLinking.set(this, (stack) => {
            assert(__classPrivateFieldGet$2(this, _status).name === "linking");
            if (__classPrivateFieldGet$2(this, _status).dfsAncestorIndex === __classPrivateFieldGet$2(this, _status).dfsIndex) {
                let done = false;
                while (!done) {
                    const requiredModule = stack.pop();
                    __classPrivateFieldSet$2(requiredModule, _status, { name: "linked" });
                    if (requiredModule === this) {
                        done = true;
                    }
                }
            }
        });
        _innerModuleLinking.set(this, async (stack, index) => {
            if (__classPrivateFieldGet$2(this, _status).name === "linking"
                || __classPrivateFieldGet$2(this, _status).name === "linked"
                || __classPrivateFieldGet$2(this, _status).name === "evaluated") {
                return index;
            }
            assert(__classPrivateFieldGet$2(this, _status).name === "unlinked");
            __classPrivateFieldSet$2(this, _status, {
                name: "linking",
                dfsIndex: index,
                dfsAncestorIndex: index,
            });
            index += 1;
            stack.push(this);
            for (const required of __classPrivateFieldGet$2(this, _requestedModules)) {
                await __classPrivateFieldGet$2(this, _linkRequiredModule).call(this, required, stack, index);
            }
            __classPrivateFieldGet$2(this, _initializeEnvironment).call(this);
            __classPrivateFieldGet$2(this, _finalizeLinking).call(this, stack);
            return index;
        });
        _link$1.set(this, async () => {
            if (__classPrivateFieldGet$2(this, _status).name === "linking") {
                throw new TypeError("module can't be linked again during linking");
            }
            if (__classPrivateFieldGet$2(this, _status).name === "evaluating") {
                throw new TypeError("module can't be linked during evaluation");
            }
            if (__classPrivateFieldGet$2(this, _status).name !== "unlinked") {
                return;
            }
            const stack = [];
            try {
                await __classPrivateFieldGet$2(this, _innerModuleLinking).call(this, stack, 0);
            }
            catch (error) {
                for (const module of stack) {
                    assert(__classPrivateFieldGet$2(module, _status).name === "linking");
                    __classPrivateFieldSet$2(module, _status, { name: "unlinked" });
                    __classPrivateFieldGet$2(module, _linkedModules).clear();
                }
                assert(__classPrivateFieldGet$2(this, _status).name === "unlinked");
                throw error;
            }
            assert(stack.length === 0);
        });
        _getAsyncCycleRoot.set(this, (module) => {
            if (__classPrivateFieldGet$2(module, _status).name !== "evaluated") {
                throw new Error("Should only get async cycle root after evaluation");
            }
            if (__classPrivateFieldGet$2(module, _status).asyncParentModules.length === 0) {
                return module;
            }
            while (__classPrivateFieldGet$2(module, _status).dfsIndex > __classPrivateFieldGet$2(module, _status).dfsAncestorIndex) {
                assert(__classPrivateFieldGet$2(module, _status).asyncParentModules.length > 0);
                const nextCycleModule = __classPrivateFieldGet$2(module, _status).asyncParentModules[0];
                assert(__classPrivateFieldGet$2(nextCycleModule, _status).name === "evaluating"
                    || __classPrivateFieldGet$2(nextCycleModule, _status).name === "evaluated");
                assert(__classPrivateFieldGet$2(nextCycleModule, _status).dfsAncestorIndex
                    <= __classPrivateFieldGet$2(module, _status).dfsAncestorIndex);
                module = nextCycleModule;
                assert(__classPrivateFieldGet$2(module, _status).name === "evaluating"
                    || __classPrivateFieldGet$2(module, _status).name === "evaluated");
            }
            assert(__classPrivateFieldGet$2(module, _status).dfsIndex === __classPrivateFieldGet$2(module, _status).dfsAncestorIndex);
            return module;
        });
        _onDependencyFinishedSuccessfully.set(this, () => {
            assert(__classPrivateFieldGet$2(this, _status).name === "evaluating"
                || __classPrivateFieldGet$2(this, _status).name === "evaluated");
            __classPrivateFieldGet$2(this, _status).pendingAsyncDependencies -= 1;
            if (__classPrivateFieldGet$2(this, _status).pendingAsyncDependencies === 0
                && __classPrivateFieldGet$2(this, _evaluationError) === undefined) {
                assert(__classPrivateFieldGet$2(this, _status).asyncEvaluating);
                const cycleRoot = __classPrivateFieldGet$2(this, _getAsyncCycleRoot).call(this, this);
                if (__classPrivateFieldGet$2(cycleRoot, _evaluationError)) {
                    return;
                }
                if (__classPrivateFieldGet$2(this, _async)) {
                    void __classPrivateFieldGet$2(this, _executeAsyncModule).call(this);
                }
                else {
                    try {
                        const value = __classPrivateFieldGet$2(this, _executeModule).call(this);
                        assert(value === undefined, "synchronous executeModule must not return a value");
                        __classPrivateFieldGet$2(this, _asyncModuleExecutionFulfilled).call(this);
                    }
                    catch (error) {
                        __classPrivateFieldGet$2(this, _asyncModuleExectionRejected).call(this, error);
                    }
                }
            }
        });
        _asyncModuleExecutionFulfilled.set(this, () => {
            assert(__classPrivateFieldGet$2(this, _status).name === "evaluated");
            if (!__classPrivateFieldGet$2(this, _status).asyncEvaluating) {
                assert(__classPrivateFieldGet$2(this, _evaluationError) !== undefined);
                return;
            }
            assert(__classPrivateFieldGet$2(this, _evaluationError) === undefined);
            __classPrivateFieldGet$2(this, _status).asyncEvaluating = false;
            for (const parent of __classPrivateFieldGet$2(this, _status).asyncParentModules) {
                __classPrivateFieldGet$2(parent, _onDependencyFinishedSuccessfully).call(parent);
            }
            if (__classPrivateFieldGet$2(this, _topLevelCapability)) {
                assert(__classPrivateFieldGet$2(this, _status).dfsIndex === __classPrivateFieldGet$2(this, _status).dfsAncestorIndex);
                __classPrivateFieldGet$2(this, _topLevelCapability).resolve();
            }
        });
        _asyncModuleExectionRejected.set(this, (error) => {
            assert(__classPrivateFieldGet$2(this, _status).name === "evaluated");
            if (!__classPrivateFieldGet$2(this, _status).asyncEvaluating) {
                assert(__classPrivateFieldGet$2(this, _evaluationError) !== undefined);
                return;
            }
            assert(__classPrivateFieldGet$2(this, _evaluationError) === undefined);
            __classPrivateFieldSet$2(this, _evaluationError, { error });
            __classPrivateFieldGet$2(this, _status).asyncEvaluating = false;
            for (const parent of __classPrivateFieldGet$2(this, _status).asyncParentModules) {
                __classPrivateFieldGet$2(parent, _asyncModuleExectionRejected).call(parent, error);
            }
            if (__classPrivateFieldGet$2(this, _topLevelCapability)) {
                assert(__classPrivateFieldGet$2(this, _status).dfsIndex === __classPrivateFieldGet$2(this, _status).dfsAncestorIndex);
                __classPrivateFieldGet$2(this, _topLevelCapability).reject(error);
            }
        });
        _executeAsyncModule.set(this, async () => {
            assert(__classPrivateFieldGet$2(this, _status).name === "evaluating"
                || __classPrivateFieldGet$2(this, _status).name === "evaluated");
            assert(__classPrivateFieldGet$2(this, _async));
            __classPrivateFieldGet$2(this, _status).asyncEvaluating = true;
            try {
                await __classPrivateFieldGet$2(this, _executeModule).call(this);
                __classPrivateFieldGet$2(this, _asyncModuleExecutionFulfilled).call(this);
            }
            catch (error) {
                __classPrivateFieldGet$2(this, _asyncModuleExectionRejected).call(this, error);
            }
        });
        _executeOtherModule.set(this, async (module) => {
            try {
                await module.evaluate();
                __classPrivateFieldGet$2(this, _onDependencyFinishedSuccessfully).call(this);
            }
            catch (error) {
                __classPrivateFieldGet$2(this, _asyncModuleExectionRejected).call(this, error);
            }
        });
        _executeRequiredModule.set(this, (requiredModule, stack, index) => {
            assert(__classPrivateFieldGet$2(this, _status).name === "evaluating");
            if (CyclicModule.isCyclicModule(requiredModule)) {
                index = __classPrivateFieldGet$2(requiredModule, _innerModuleEvaluation).call(requiredModule, stack, index);
                assert(__classPrivateFieldGet$2(requiredModule, _status).name === "evaluating"
                    || __classPrivateFieldGet$2(requiredModule, _status).name === "evaluated");
                if (__classPrivateFieldGet$2(requiredModule, _status).name === "evaluating") {
                    assert(stack.includes(requiredModule));
                }
                if (__classPrivateFieldGet$2(requiredModule, _status).name === "evaluating") {
                    __classPrivateFieldGet$2(this, _status).dfsAncestorIndex = Math.min(__classPrivateFieldGet$2(requiredModule, _status).dfsAncestorIndex, __classPrivateFieldGet$2(requiredModule, _status).dfsAncestorIndex);
                }
                else if (__classPrivateFieldGet$2(requiredModule, _evaluationError)) {
                    const rootModule = __classPrivateFieldGet$2(this, _getAsyncCycleRoot).call(this, requiredModule);
                    assert(__classPrivateFieldGet$2(rootModule, _status).name === "evaluated");
                    if (__classPrivateFieldGet$2(rootModule, _evaluationError)) {
                        throw __classPrivateFieldGet$2(rootModule, _evaluationError).error;
                    }
                }
                if (__classPrivateFieldGet$2(requiredModule, _status).asyncEvaluating) {
                    __classPrivateFieldGet$2(this, _status).pendingAsyncDependencies += 1;
                    __classPrivateFieldGet$2(requiredModule, _status).asyncParentModules.push(this);
                }
            }
            else {
                __classPrivateFieldGet$2(this, _status).pendingAsyncDependencies += 1;
                void __classPrivateFieldGet$2(this, _executeOtherModule).call(this, requiredModule);
            }
            return index;
        });
        _finalizeEvaluation.set(this, (stack) => {
            assert(__classPrivateFieldGet$2(this, _status).name === "evaluating");
            if (__classPrivateFieldGet$2(this, _status).dfsAncestorIndex === __classPrivateFieldGet$2(this, _status).dfsIndex) {
                let done = false;
                while (!done) {
                    const requiredModule = stack.pop();
                    assert(__classPrivateFieldGet$2(requiredModule, _status).name === "evaluating");
                    __classPrivateFieldSet$2(requiredModule, _status, {
                        name: "evaluated",
                        dfsIndex: __classPrivateFieldGet$2(requiredModule, _status).dfsIndex,
                        dfsAncestorIndex: __classPrivateFieldGet$2(requiredModule, _status).dfsAncestorIndex,
                        asyncParentModules: __classPrivateFieldGet$2(requiredModule, _status).asyncParentModules,
                        asyncEvaluating: __classPrivateFieldGet$2(requiredModule, _status).asyncEvaluating,
                        pendingAsyncDependencies: __classPrivateFieldGet$2(requiredModule, _status).pendingAsyncDependencies,
                    });
                    done = requiredModule === this;
                }
            }
        });
        _innerModuleEvaluation.set(this, (stack, index) => {
            if (__classPrivateFieldGet$2(this, _status).name === "evaluated") {
                if (__classPrivateFieldGet$2(this, _evaluationError)) {
                    throw __classPrivateFieldGet$2(this, _evaluationError).error;
                }
                return index;
            }
            if (__classPrivateFieldGet$2(this, _status).name === "evaluating") {
                return index;
            }
            assert(__classPrivateFieldGet$2(this, _status).name === "linked");
            __classPrivateFieldSet$2(this, _status, {
                name: "evaluating",
                dfsIndex: index,
                dfsAncestorIndex: index,
                pendingAsyncDependencies: 0,
                asyncParentModules: [],
                asyncEvaluating: false,
            });
            index += 1;
            stack.push(this);
            for (const required of __classPrivateFieldGet$2(this, _requestedModules)) {
                const requiredModule = __classPrivateFieldGet$2(this, _linkedModules).get(required);
                assert(requiredModule !== undefined);
                index = __classPrivateFieldGet$2(this, _executeRequiredModule).call(this, requiredModule, stack, index);
            }
            if (__classPrivateFieldGet$2(this, _status).pendingAsyncDependencies > 0) {
                __classPrivateFieldGet$2(this, _status).asyncEvaluating = true;
            }
            else if (__classPrivateFieldGet$2(this, _async)) {
                void __classPrivateFieldGet$2(this, _executeAsyncModule).call(this);
            }
            else {
                const value = __classPrivateFieldGet$2(this, _executeModule).call(this);
                assert(value === undefined, "executeModule for a synchronous module must not return a value");
            }
            __classPrivateFieldGet$2(this, _finalizeEvaluation).call(this, stack);
            return index;
        });
        _evaluate$1.set(this, () => {
            assert(__classPrivateFieldGet$2(this, _status).name === "linked"
                || __classPrivateFieldGet$2(this, _status).name === "evaluated");
            const module = __classPrivateFieldGet$2(this, _status).name === "evaluated"
                ? __classPrivateFieldGet$2(this, _getAsyncCycleRoot).call(this, this)
                : this;
            if (__classPrivateFieldGet$2(module, _topLevelCapability)) {
                return __classPrivateFieldGet$2(module, _topLevelCapability).promise;
            }
            const stack = [];
            const capability = new PromiseCapability();
            __classPrivateFieldSet$2(module, _topLevelCapability, capability);
            try {
                __classPrivateFieldGet$2(this, _innerModuleEvaluation).call(this, stack, 0);
                assert(__classPrivateFieldGet$2(module, _status).name === "evaluated");
                assert(__classPrivateFieldGet$2(module, _evaluationError) === undefined);
                if (!__classPrivateFieldGet$2(module, _status).asyncEvaluating) {
                    capability.resolve(undefined);
                }
            }
            catch (error) {
                for (const module of stack) {
                    assert(__classPrivateFieldGet$2(module, _status).name === "evaluating");
                    __classPrivateFieldSet$2(module, _status, {
                        name: "evaluated",
                        dfsIndex: __classPrivateFieldGet$2(module, _status).dfsIndex,
                        dfsAncestorIndex: __classPrivateFieldGet$2(module, _status).dfsAncestorIndex,
                        asyncEvaluating: __classPrivateFieldGet$2(module, _status).asyncEvaluating,
                        asyncParentModules: __classPrivateFieldGet$2(module, _status).asyncParentModules,
                        pendingAsyncDependencies: __classPrivateFieldGet$2(module, _status).pendingAsyncDependencies,
                    });
                }
                capability.reject(error);
            }
            return capability.promise;
        });
        __classPrivateFieldSet$2(this, _async, async);
        if (!Array.isArray(requestedModules)) {
            throw new TypeError("requestedModules must be a list of strings");
        }
        __classPrivateFieldSet$2(this, _requestedModules, Object.freeze([...new Set(requestedModules)]));
        if (__classPrivateFieldGet$2(this, _requestedModules).some((i) => typeof i !== "string")) {
            throw new TypeError(`requestedModules contains a non-string value`);
        }
        if (typeof initializeEnvironment !== "function") {
            throw new TypeError("initializeEnvironment must be a function");
        }
        if (typeof executeModule !== "function") {
            throw new TypeError("executeModule must be a function");
        }
        if (typeof resolveModule !== "function") {
            throw new TypeError("resolveModule must be a function");
        }
        __classPrivateFieldSet$2(this, _initializeEnvironment, initializeEnvironment);
        __classPrivateFieldSet$2(this, _executeModule, executeModule);
        __classPrivateFieldSet$2(this, _resolveModule, resolveModule);
        Object.freeze(this);
    }
    static isCyclicModule(value) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            __classPrivateFieldGet$2(value, _requestedModules);
            return true;
        }
        catch {
            return false;
        }
    }
    static linkedModules(cyclicModule) {
        return __classPrivateFieldGet$2(cyclicModule, _linkedModulesView);
    }
    static async resolveModule(cyclicModule, specifier) {
        const alreadyLinkedModule = __classPrivateFieldGet$2(cyclicModule, _linkedModules).get(specifier);
        if (alreadyLinkedModule) {
            return alreadyLinkedModule;
        }
        const linkedModule = await __classPrivateFieldGet$2(cyclicModule, _resolveModule).call(cyclicModule, specifier, cyclicModule);
        if (__classPrivateFieldGet$2(cyclicModule, _linkedModules).has(specifier)
            && __classPrivateFieldGet$2(cyclicModule, _linkedModules).get(specifier) !== linkedModule) {
            throw new Error("cyclic module has already resolved successfully");
        }
        __classPrivateFieldGet$2(cyclicModule, _linkedModules).set(specifier, linkedModule);
        return linkedModule;
    }
    get async() {
        return __classPrivateFieldGet$2(this, _async);
    }
    get linkedModules() {
        return __classPrivateFieldGet$2(this, _linkedModulesView);
    }
    get requestedModules() {
        return __classPrivateFieldGet$2(this, _requestedModules);
    }
    get status() {
        return __classPrivateFieldGet$2(this, _status).name;
    }
    async resolveModule(specifier) {
        return await CyclicModule.resolveModule(this, specifier);
    }
}
_requestedModules = new WeakMap(), _initializeEnvironment = new WeakMap(), _executeModule = new WeakMap(), _resolveModule = new WeakMap(), _async = new WeakMap(), _linkedModules = new WeakMap(), _linkedModulesView = new WeakMap(), _evaluationError = new WeakMap(), _topLevelCapability = new WeakMap(), _status = new WeakMap(), _linkRequiredModule = new WeakMap(), _finalizeLinking = new WeakMap(), _innerModuleLinking = new WeakMap(), _link$1 = new WeakMap(), _getAsyncCycleRoot = new WeakMap(), _onDependencyFinishedSuccessfully = new WeakMap(), _asyncModuleExecutionFulfilled = new WeakMap(), _asyncModuleExectionRejected = new WeakMap(), _executeAsyncModule = new WeakMap(), _executeOtherModule = new WeakMap(), _executeRequiredModule = new WeakMap(), _finalizeEvaluation = new WeakMap(), _innerModuleEvaluation = new WeakMap(), _evaluate$1 = new WeakMap();
Object.freeze(CyclicModule);
Object.freeze(CyclicModule.prototype);

var __classPrivateFieldSet$3 = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet$3 = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _string, _names;
class NameGenerator {
    constructor(string) {
        _string.set(this, void 0);
        _names.set(this, new Map());
        __classPrivateFieldSet$3(this, _string, string);
    }
    createName(prefix) {
        let currentN = __classPrivateFieldGet$3(this, _names).get(prefix) ?? 0;
        let name = `${prefix}$$${currentN}`;
        while (__classPrivateFieldGet$3(this, _string).includes(name)) {
            currentN += 1;
            name = `${prefix}$${currentN}`;
        }
        __classPrivateFieldGet$3(this, _names).set(prefix, currentN + 1);
        return name;
    }
}
_string = new WeakMap(), _names = new WeakMap();

function assertIsString(value) {
    if (typeof value !== "string") {
        throw new Error(`expected value to be a string`);
    }
}

function replaceRanges(string, replacements) {
    const sortedReplacements = [...replacements]
        .sort((a, b) => b.start - a.start);
    const parts = [];
    let last;
    for (const { start, end, replacement } of sortedReplacements) {
        if (last && (start > last.start || end > last.end)) {
            throw new Error("Cannot replace overlapping ranges");
        }
        const suffix = string.slice(end);
        string = string.slice(0, start);
        parts.push(suffix);
        parts.push(replacement);
        last = { start, end };
    }
    parts.push(string);
    parts.reverse();
    return parts.join("");
}

const AsyncFunction = (async () => null).constructor;
function isAsyncSource(transformedSource) {
    try {
        // eslint-disable-next-line no-new, no-new-func, @typescript-eslint/no-implied-eval
        new Function(`
            "use strict";
            ${transformedSource}
        `);
        return false;
    }
    catch {
        // eslint-disable-next-line no-new
        new AsyncFunction(`
            "use strict";
            ${transformedSource}
        `);
        return true;
    }
}
function createModuleEvaluationGenerator(sourceText, parseResult, context) {
    const nameGenerator = new NameGenerator(sourceText);
    const defaultExportName = nameGenerator.createName("default");
    const importMetaName = nameGenerator.createName("importMeta");
    const dynamicImportName = nameGenerator.createName("dynamicImport");
    const getters = parseResult.exports
        .filter((e) => e.specifier === null)
        .flatMap((e) => {
        return e.exports
            .map(({ importName, exportName }) => {
            assertIsString(importName);
            assertIsString(exportName);
            if (importName === "default") {
                importName = defaultExportName;
            }
            return `get ${JSON.stringify(exportName)}() { return ${importName}; }`;
        });
    });
    const replacements = [
        ...parseResult.imports.map((i) => {
            return {
                start: i.startPosition,
                end: i.endPosition,
                replacement: "",
            };
        }),
        ...parseResult.dynamicImports.map((i) => {
            return {
                start: i.startPosition,
                end: i.startPosition + 6,
                replacement: dynamicImportName,
            };
        }),
        ...parseResult.importMetas.map((i) => {
            return {
                start: i.startPosition,
                end: i.endPosition,
                replacement: importMetaName,
            };
        }),
        ...parseResult.exports.map((i) => {
            let replacement = "";
            if (i.exports[0]?.exportName === "default"
                && i.exports[0]?.importName === "default"
                && i.specifier === null) {
                replacement = `const ${defaultExportName} = `;
            }
            return {
                start: i.startPosition,
                end: i.endPosition,
                replacement,
            };
        }),
    ];
    const transformedSource = replaceRanges(sourceText, replacements);
    const isAsync = isAsyncSource(transformedSource);
    const contextName = nameGenerator.createName("context");
    // eslint-disable-next-line no-new-func, @typescript-eslint/no-implied-eval
    const genFunction = new Function(`
        const ${contextName} = arguments[0];
        with (${contextName}.scope) {
            return ${isAsync ? "async" : ""} function*() {
                "use strict";
                ${contextName}.exports = {
                    __proto__: null,
                    ${getters.join(",")}
                };
                yield;
                ${transformedSource}
            }();
        }
    `);
    return {
        isAsync,
        generator: genFunction(context),
        importMetaName,
        dynamicImportName,
    };
}

var __classPrivateFieldGet$4 = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet$4 = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _importEntries, _indirectExportEntries, _initializeImportMeta, _importModuleDynamically, _moduleEvaluationGenerator, _importMeta, _moduleScope, _localNamespace, _state;
class GeneratorModuleEvaluator {
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
            scope: __classPrivateFieldGet$4(this, _moduleScope),
            exports: Object.create(null),
        };
        __classPrivateFieldSet$4(this, _moduleEvaluationGenerator, createModuleEvaluationGenerator(source, parseResult, context));
        void __classPrivateFieldGet$4(this, _moduleEvaluationGenerator).generator.next();
        __classPrivateFieldSet$4(this, _localNamespace, context.exports);
        __classPrivateFieldSet$4(this, _initializeImportMeta, initializeImportMeta);
        __classPrivateFieldSet$4(this, _importModuleDynamically, importModuleDynamically);
        __classPrivateFieldSet$4(this, _importEntries, importEntries);
        __classPrivateFieldSet$4(this, _indirectExportEntries, indirectExportEntries);
    }
    get async() {
        return __classPrivateFieldGet$4(this, _moduleEvaluationGenerator).isAsync;
    }
    initialize(linkedModules) {
        if (__classPrivateFieldGet$4(this, _state) !== "uninitialized") {
            throw new Error("initialization has already started or completed");
        }
        __classPrivateFieldSet$4(this, _state, "initializing");
        Object.defineProperty(__classPrivateFieldGet$4(this, _moduleScope), __classPrivateFieldGet$4(this, _moduleEvaluationGenerator).importMetaName, {
            get: () => __classPrivateFieldGet$4(this, _importMeta),
        });
        Object.defineProperty(__classPrivateFieldGet$4(this, _moduleScope), __classPrivateFieldGet$4(this, _moduleEvaluationGenerator).dynamicImportName, {
            get: () => __classPrivateFieldGet$4(this, _importModuleDynamically),
        });
        for (const entry of __classPrivateFieldGet$4(this, _importEntries)) {
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
                Object.defineProperty(__classPrivateFieldGet$4(this, _moduleScope), entry.localName, {
                    get: getBinding,
                });
            }
        }
        __classPrivateFieldSet$4(this, _state, "initialized");
    }
    execute(linkedModules) {
        if (__classPrivateFieldGet$4(this, _state) !== "initialized") {
            throw new Error("evaluator must be initialized to evaluate");
        }
        __classPrivateFieldSet$4(this, _state, "evaluating");
        const entries = [
            ...__classPrivateFieldGet$4(this, _importEntries),
            ...__classPrivateFieldGet$4(this, _indirectExportEntries),
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
        __classPrivateFieldGet$4(this, _initializeImportMeta).call(this, __classPrivateFieldGet$4(this, _importMeta));
        if (__classPrivateFieldGet$4(this, _moduleEvaluationGenerator).isAsync) {
            const result = __classPrivateFieldGet$4(this, _moduleEvaluationGenerator).generator.next();
            const finishEvaluation = () => {
                __classPrivateFieldSet$4(this, _state, "evaluated");
            };
            return result
                .then(() => undefined)
                .finally(finishEvaluation);
        }
        __classPrivateFieldGet$4(this, _moduleEvaluationGenerator).generator.next();
        __classPrivateFieldSet$4(this, _state, "evaluated");
        return undefined;
    }
    getLocalBinding(name) {
        return () => __classPrivateFieldGet$4(this, _localNamespace)[name];
    }
}
_importEntries = new WeakMap(), _indirectExportEntries = new WeakMap(), _initializeImportMeta = new WeakMap(), _importModuleDynamically = new WeakMap(), _moduleEvaluationGenerator = new WeakMap(), _importMeta = new WeakMap(), _moduleScope = new WeakMap(), _localNamespace = new WeakMap(), _state = new WeakMap();

function getModuleEntries(parseResult) {
    const importEntries = parseResult.imports
        .flatMap((i) => {
        return i.imports
            .map(({ importName, localName }) => ({
            specifier: i.specifier,
            importName,
            localName,
        }));
    });
    const importedBoundNames = new Set(importEntries.map((i) => i.localName));
    const indirectExportEntries = [];
    const localExportEntries = [];
    const starExportEntries = [];
    function addEntry(exportEntry, name, exportName) {
        if (exportEntry.specifier === null) {
            assertIsString(name);
            assertIsString(exportName);
            if (!importedBoundNames.has(name)) {
                localExportEntries.push({
                    localName: name,
                    exportName,
                });
                return;
            }
            const importEntry = importEntries
                .find((i) => i.localName === name);
            if (importEntry.importName === NAMESPACE) {
                localExportEntries.push({
                    localName: name,
                    exportName,
                });
            }
            else {
                indirectExportEntries.push({
                    specifier: importEntry.specifier,
                    importName: importEntry.localName,
                    exportName,
                });
            }
        }
        else if (name === NAMESPACE && exportName === NAMESPACE) {
            starExportEntries.push({
                specifier: exportEntry.specifier,
            });
        }
        else {
            assertIsString(exportName);
            indirectExportEntries.push({
                specifier: exportEntry.specifier,
                importName: name,
                exportName,
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
}

const PAGE_SIZE = 2 ** 16;
const parserModulePromise = WebAssembly.compile(
// The string $$ENCODED_WASM$$ is replaced with an encoded wasm blob in Base64 during build
decodeString("\u0000asm\u0001\u0000\u0000\u0000\u0001\u001f\u0006`\u0002\u0000`\u0001\u0000`\u0004\u0000`\u0003\u0000`\u0000\u0000`\u0001\u0001\u0002¨\u0002\r\u0003env\u000bsyntaxError\u0000\u0000\u0003env\u000eemitImportName\u0000\u0002\u0003env\u0013emitImportNamespace\u0000\u0000\u0003env\u000efinalizeImport\u0000\u0003\u0003env\u0011emitDynamicImport\u0000\u0002\u0003env\u000eemitImportMeta\u0000\u0000\u0003env\nopenImport\u0000\u0001\u0003env\u000eemitExportName\u0000\u0002\u0003env\u0019emitExportNamespaceAsName\u0000\u0000\u0003env\u0017finalizeDelegatedExport\u0000\u0003\u0003env\nopenExport\u0000\u0001\u0003env\u000efinalizeExport\u0000\u0001\u0003env\u0013emitExportNamespace\u0000\u0004\u0003\b\u0007\u0001\u0005\u0000\u0000\u0000\u0000\u0000\u0005\u0004\u0001\u0000\u0001\u0006\u0017\u0003\u0001A \u0004\u000b\u0000A \u0004\u000b\u0000A \u0011\u000b\u0007-\u0004\u0006memory\u0002\u0000\u000b__heap_base\u0003\u0001\n__data_end\u0003\u0002\u0005parse\u0000\u0013\n_\u0007ª\u0004\u0001\u000b\u0002@ \u0000(\u0002\u0004\"\u0005 \u0000(\u0002\u0010\"\u0002L\r\u0000 \u0000A\u0010j!\u0007\u0003@ \u0000(\u0000\u0000 \u0002A\u0001tj\"\u0006/\u0001\u0000!\u0003\u0002@\u0002@\u0002@ \u0005 \u0002kA\u0002GA\u0000 \u0002A\u0002j\"\u0004 \u0005J\u001b\r\u0000\u0002@\u0002@\u0002@\u0002@ \u0006A¨\tF\r\u0000 \u0003A/G\"\tE\u0004@A\u0002!\u0001A\u0000!\b\u0003@ \bA\u0001j\"\bA\u0001K\r\u0002 \u0001 \u0006j!\n \u0001A¨\tj \u0001A\u0002j!\u0001/\u0001\u0000 \n/\u0001\u0000F\r\u0000\u000b\u000b \u0006A®\tF\r\u0002 \u0003A\u001fK\r\u0001 \u0003A\tkA\u0005I\r\u0005\f\b\u000b \u0006A\u0002j!\u0001\u0003@ \u0002A\u0001j\"\u0004 \u0005N\r\u0005 \u0001/\u0001\u0000\"\u0003A\rF\"\u0006E\u0004@ \u0001A\u0002j!\u0001 \u0004!\u0002 \u0003A\nG\r\u0001\u000b\u000b \u0007 \u00046\u0002\u0000A\u0000 \u0003A\nG \u0006\u001b\r\u0002 \u0004A\u0001j!\u0002\f\u0005\u000b \u0003A F \u0003A \u0001Fr\r\u0003 \t\r\u0006A\u0002!\u0001A\u0000!\b\u0003@ \bA\u0001j\"\bA\u0001K\r\u0001 \u0001 \u0006j!\t \u0001A®\tj \u0001A\u0002j!\u0001/\u0001\u0000 \t/\u0001\u0000F\r\u0000\u000b\f\u0002\u000b \u0007 \u00046\u0002\u0000 \u0004 \u0005H\u0004@A\u0000 \u0005k!\u0003 \u0006A\u0004j!\u0001\u0003@\u0002@ \u0003 \u0004jA~GA\u0000 \u0004A\u0002j\"\u0002 \u0005J\u001b\r\u0000 \u0001Aô\tF\r\u0006 \u0001/\u0001\u0000A*G\r\u0000 \u0001A\u0002j/\u0001\u0000A/F\r\u0006\u000b \u0007 \u0004A\u0001j\"\u00046\u0002\u0000 \u0001A\u0002j!\u0001 \u0004 \u0005H\r\u0000\u000b\u000bA´\tA\u001f\u0010\u0000 \u0000A\u0004j(\u0002\u0000\"\u0005 \u0007(\u0002\u0000\"\u0002J\r\u0004\f\u0005\u000b \u0005 \u0004\"\u0002J\r\u0003\f\u0004\u000b \u0003A \u0001F \u0003A\tkA\u0005Ir\r\u0000 \u0003A G\r\u0003\u000b \u0002A\u0001j!\u0002\u000b \u0007 \u00026\u0002\u0000 \u0002 \u0005H\r\u0000\u000b\u000b\u000bÓ\u0002\u0001\f \u0000 \u0000(\u0002\u0010\"\u0001A\u0001j\"\u00026\u0002\u0010 \u0000(\u0000\u0000\"\t \u0001A\u0001tj/\u0001\u0000!\n\u0002@ \u0002 \u0000(\u0002\u0004\"\u0004H\u0004@ \u0000A\u0010j!\u0005\u0003@ \u0001!\u0006\u0002@\u0002@\u0002@ \t \u0002A\u0001tj\"\u0007/\u0001\u0000\"\u0003Aà\u0000G\u0004@ \u0004 \u0002kA\u0002GA\u0000 \u0004 \u0006A\u0003jH\u001b\r\u0001 \u0007Aú\tF\r\u0006 \u0003AÜ\u0000F\r\u0002\u0002@ \u0003A$F\u0004@A\u0002!\u0001A\u0000!\b\u0003@ \bA\u0001j\"\bA\u0001K\r\u0002 \u0001 \u0007j!\u000b \u0001Aú\tj \u0001A\u0002j!\u0001/\u0001\u0000 \u000b/\u0001\u0000F\r\u0000\u000b\f\u0003\u000b \u0002!\u0001\f\u0004\u000bA$!\u0003\f\u0006\u000bAà\u0000!\u0003\f\u0005\u000b \u0002!\u0001 \u0003AÜ\u0000G\r\u0001\u000b \u0005 \u0006A\u0002j\"\u00016\u0002\u0000\u000b \u0005 \u0001A\u0001j\"\u00026\u0002\u0000 \u0002 \u0004H\r\u0000\u000b\u000bA\nA$\u0010\u0000 \u0000(\u0000\u0000 \u0000A\u0010j(\u0002\u0000\"\u0002A\u0001tj/\u0001\u0000!\u0003\u000b \u0000A\u0010j \u0002A\u0001A\u0002 \u0003Aà\u0000F\"\u0000\u001b\"\u0001j6\u0002\u0000 \u0001A\u0004A\u0003 \u0000\u001b \nAà\u0000F\u001b\u000bO\u0002\u0014\u0001~#\u0000A\u0010k\"\u000b$\u0000 \u0000\u0010\r\u0002@ \u0000(\u0002\u0010\"\u0007 \u0000(\u0002\u0004\"\tH\u0004@ \u0000A\u0010j!\u0006 \u0001A\u0003G!\u0012 \u0000A\bj!\f \u0000A\fj!\u000f\u0003@\u0002@ \u0012E\u0004@ \u0000(\u0000\u0000\"\b \u0007A\u0001tj\"\n/\u0001\u0000\"\u0003A)G\r\u0001\f\u0004\u000b\u0002@ \u0001A\u0001G\u0004@ \u0001A\u0002G\r\u0001 \u0000(\u0000\u0000\"\b \u0007A\u0001tj\"\n/\u0001\u0000\"\u0003Aý\u0000G\r\u0002\f\u0005\u000b \u0000(\u0000\u0000\"\b \u0007A\u0001tj\"\n/\u0001\u0000\"\u0003Aà\u0000F\r\u0004 \u0003Aý\u0000G\r\u0001\f\u0004\u000b \u0000(\u0000\u0000\"\b \u0007A\u0001tj\"\n/\u0001\u0000!\u0003\u000b\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@ \u0003Aÿÿ\u0003q\"\rAà\u0000G\u0004@ \rA/G\r\u0001 \u000f(\u0002\u0000\"\u0003E\r\u0006 \f(\u0000\u0000\"\u0002/\u0001\u0000\"\u0004A!k\"\u0005A\u0005KA\u0001 \u0005tA1qEr\r\u0002\f\u0006\u000b \u0000\u0010\u000e \f \u0000(\u0002\u0000 \u0007A\u0001tj6\u0002\u0000 \u000f \u0006(\u0002\u0000 \u0007k6\u0002\u0000A\u0001F\r\u0006\u0003@ \u0000A\u0001\u0010\u000f \u0006(\u0002\u0000!\u0002 \u0000\u0010\u000e \f \u0000(\u0002\u0000 \u0002A\u0001tj6\u0002\u0000 \u000f \u0006(\u0002\u0000 \u0002k6\u0002\u0000A\u0004G\r\u0000\u000b\f\u0006\u000b \u0003Aÿ\u0001q\"\u0002A'GA\u0000 \u0002A\"G\u001bE\u0004@ \u0006 \u0007A\u0001j\"\u00036\u0002\u0000 \u0007!\u0005\u0002@ \u0003 \tH\u0004@\u0003@ \b \u0003A\u0001tj/\u0001\u0000\"\u0002 \rF\r\u0002 \u0003!\u0004 \u0002AÜ\u0000F\u0004@ \u0006 \u0005A\u0002j\"\u00046\u0002\u0000\u000b \u0006 \u0004A\u0001j\"\u00036\u0002\u0000 \u0004!\u0005 \u0003 \tH\r\u0000\u000b\u000bAÊ\nA\u001b\u0010\u0000 \u0000(\u0002\u0000 \u0007A\u0001tj!\n \u0006(\u0002\u0000!\u0003\u000b \f \n6\u0002\u0000 \u0006 \u0003A\u0001j\"\u00026\u0002\u0000 \u000f \u0002 \u0007k6\u0002\u0000\f\u0006\u000b \rA'K\r\u0001 \rA!F \rA%kA\u0002Ir\r\u0003\f\u0002\u000b \u0004A)G \u0004A(kAÿÿ\u0003qA\u0007Iq \u0004A:kAÿÿ\u0003qA\u0006Ir \u0004AÛ\u0000F \u0004AÞ\u0000Frr \u0004Aý\u0000GA\u0000 \u0004Aû\u0000kAÿÿ\u0003qA\u0004I\u001br\r\u0003\u0002@ \u0003A\u0005G\u0004@ \u0003A\u0002k\"\u0003A\bK\r\u0001\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@ \u0003A\u0001k\u000e\b\u0001\u0002\u000e\u0003\u000e\u0004\u000e\u0005\u0000\u000b \u0002A¶\bF\r\u0011 \u0004Aä\u0000G\r\t \u0002/\u0001\u0002Aï\u0000F\r\u0011 \u0002AÆ\bG\r\r\f\u0011\u000b \u0002Aâ\bF\r\u0010 \u0004Aî\u0000G\r\f \u0002/\u0001\u0002Aå\u0000G\r\f \u0002/\u0001\u0004A÷\u0000G\r\f\f\u0010\u000b \u0002A\bF\r\u000f \u0004Aã\u0000G\r\u0004 \u0002/\u0001\u0002Aá\u0000G\r\u0004 \u0002/\u0001\u0004Aó\u0000G\r\u0004 \u0002/\u0001\u0006Aå\u0000F \u0002A¼\bFr\r\u000f \u0002A\tG\r\t\f\u000f\u000b \u0002A¨\bF\r\u000e \u0004Aä\u0000G\r\u0002 \u0002/\u0001\u0002Aå\u0000G\r\u0002 \u0002/\u0001\u0004Aì\u0000G\r\u0002 \u0002/\u0001\u0006Aå\u0000G\r\u0002 \u0002/\u0001\bAô\u0000G\r\u0002 \u0002/\u0001\nAå\u0000F \u0002Aê\bFr\r\u000e \u0002A\tG\r\u0005\f\u000e\u000b \u0002A\bF\r\r \u0004Aä\u0000G\r\t \u0002/\u0001\u0002Aå\u0000G\r\t \u0002/\u0001\u0004Aâ\u0000G\r\t \u0002/\u0001\u0006Aõ\u0000G\r\t \u0002/\u0001\bAç\u0000G\r\t \u0002/\u0001\nAç\u0000G\r\t \u0002/\u0001\fAå\u0000G\r\t \u0002/\u0001\u000eAò\u0000G\r\t\f\r\u000b \u0002AÌ\bF\r\f \u0004Aé\u0000G\r\b \u0002/\u0001\u0002Aî\u0000G\r\b \u0002/\u0001\u0004Aó\u0000G\r\b \u0002/\u0001\u0006Aô\u0000G\r\b \u0002/\u0001\bAá\u0000G\r\b \u0002/\u0001\nAî\u0000G\r\b \u0002/\u0001\fAã\u0000G\r\b \u0002/\u0001\u000eAå\u0000G\r\b \u0002/\u0001\u0010Aï\u0000G\r\b \u0002/\u0001\u0012Aæ\u0000G\r\b\f\f\u000b \u0002Aê\bF\r\u000b \u0004Aò\u0000G\r\u0001 \u0002/\u0001\u0002Aå\u0000G\r\u0001 \u0002/\u0001\u0004Aô\u0000G\r\u0001 \u0002/\u0001\u0006Aõ\u0000G\r\u0001 \u0002/\u0001\bAò\u0000G\r\u0001 \u0002/\u0001\nAî\u0000F\r\u000b \u0002A\tG\r\u0007\f\u000b\u000b \u0002A¼\bF\r\n \u0004Aå\u0000G\r\u0003 \u0002/\u0001\u0002Aì\u0000G\r\u0003 \u0002/\u0001\u0004Aó\u0000G\r\u0003 \u0002/\u0001\u0006Aå\u0000F\r\n \u0002A\tG\r\u0006\f\n\u000b \u0002A\tF\r\t\u000b \u0004Aô\u0000G\r\u0004 \u0002/\u0001\u0002Aù\u0000G\r\u0004 \u0002/\u0001\u0004Að\u0000G\r\u0004 \u0002/\u0001\u0006Aå\u0000G\r\u0004 \u0002/\u0001\bAï\u0000G\r\u0004 \u0002/\u0001\nAæ\u0000G\r\u0004\f\b\u000b \u0002AÆ\bF\r\u0007 \u0004Aé\u0000G\r\u0003 \u0002/\u0001\u0002Aî\u0000G\r\u0003\f\u0007\u000b \u0002A\tF\r\u0006\u000b \u0004Aö\u0000G\r\u0001 \u0002/\u0001\u0002Aï\u0000G\r\u0001 \u0002/\u0001\u0004Aé\u0000G\r\u0001 \u0002/\u0001\u0006Aä\u0000F\r\u0005\f\u0001\u000b \u0002A\bF\r\u0004\u0002@\u0002@\u0002@ \u0004Aá\u0000G\r\u0000 \u0002/\u0001\u0002A÷\u0000G\r\u0000 \u0002/\u0001\u0004Aá\u0000G\r\u0000 \u0002/\u0001\u0006Aé\u0000F\r\u0001\u000b \u0002Aø\bF\r\u0006\u0002@ \u0004Aô\u0000G\r\u0000 \u0002/\u0001\u0002Aè\u0000G\r\u0000 \u0002/\u0001\u0004Aò\u0000G\r\u0000 \u0002/\u0001\u0006Aï\u0000G\r\u0000 \u0002/\u0001\bA÷\u0000F\r\u0007 \u0002A\tG\r\u0002\f\u0007\u000b \u0002A\tF\r\u0006\f\u0001\u000b \u0002/\u0001\bAô\u0000F \u0002Aø\bFr \u0002A\tFr\r\u0005\u000b \u0004Aù\u0000G\r\u0000 \u0002/\u0001\u0002Aé\u0000G\r\u0000 \u0002/\u0001\u0004Aå\u0000G\r\u0000 \u0002/\u0001\u0006Aì\u0000G\r\u0000 \u0002/\u0001\bAä\u0000F\r\u0004\u000b \u000fA\u00016\u0002\u0000 \f \n6\u0002\u0000 \u0006 \u0007A\u0001j6\u0002\u0000\f\u0004\u000b \rAû\u0000G\u0004@ \rA(G\r\u0001 \u000f(\u0002\u0000!\u0004 \f(\u0002\u0000!\u0002A\u0010A\u0010(\u0002\u0000A\u0001j6\u0002\u0000 \u000fA\u00016\u0002\u0000 \f \b \u0007A\u0001tj6\u0002\u0000 \u0006 \u0007A\u0001j6\u0002\u0000 \u0000A\u0003\u0010\u000f \u000fA\u00016\u0002\u0000 \u0006 \u0006(\u0002\u0000\"\u0003A\u0001j6\u0002\u0000 \f \u0000(\u0002\u0000 \u0003A\u0001tj6\u0002\u0000 \u0000\u0010\r \u0000(\u0000\u0000 \u0006(\u0002\u0000A\u0001tj/\u0001\u0000A/G\r\u0004 \u0004A\u0005F\u0004@ \u0002A\u0010F\r\u0004 \u0002/\u0001\u0000A÷\u0000G\r\u0005 \u0002/\u0001\u0002Aè\u0000G\r\u0005 \u0002/\u0001\u0004Aé\u0000G\r\u0005 \u0002/\u0001\u0006Aì\u0000G\r\u0005 \u0002/\u0001\bAå\u0000F\r\u0004\f\u0005\u000b \u0004A\u0003F\u0004@ \u0002A\u0010F\r\u0004 \u0002/\u0001\u0000Aæ\u0000G\r\u0005 \u0002/\u0001\u0002Aï\u0000G\r\u0005 \u0002/\u0001\u0004Aò\u0000F\r\u0004\f\u0005\u000b \u0004A\u0002G\r\u0004 \u0002A\u0010F\r\u0003 \u0002/\u0001\u0000Aé\u0000G\r\u0004 \u0002/\u0001\u0002Aæ\u0000F\r\u0003\f\u0004\u000b \u0006 \u0007A\u0001j6\u0002\u0000 \f(\u0002\u0000!\u0002 \f \b \u0007A\u0001tj6\u0002\u0000 \u000f(\u0002\u0000!\u0004 \u000fA\u00016\u0002\u0000 \u0000A\u0002\u0010\u000f \u000fA\u00016\u0002\u0000 \u0006 \u0006(\u0002\u0000\"\u0003A\u0001j6\u0002\u0000 \f \u0000(\u0002\u0000 \u0003A\u0001tj6\u0002\u0000 \u0000\u0010\r \u0000(\u0000\u0000 \u0006(\u0002\u0000A\u0001tj/\u0001\u0000A/G\r\u0003 \u0004A\u0007F\u0004@ \u0002Aø\u000fF\r\u0003 \u0002/\u0001\u0000Aæ\u0000G\r\u0004 \u0002/\u0001\u0002Aé\u0000G\r\u0004 \u0002/\u0001\u0004Aî\u0000G\r\u0004 \u0002/\u0001\u0006Aá\u0000G\r\u0004 \u0002/\u0001\bAì\u0000G\r\u0004 \u0002/\u0001\nAì\u0000G\r\u0004 \u0002/\u0001\fAù\u0000F\r\u0003\f\u0004\u000b \u0004A\u0001G\r\u0003 \u0002Að\u000fF \u0002Aô\u000fFr\r\u0002 \u0002/\u0001\u0000\"\u0002A)F \u0002A;Fr\r\u0002\f\u0003\u000b \u0003Aøÿ\u0003qA(F \u0003A:kAÿÿ\u0003qA\u0006Ir\r\u0000 \u0003Aû\u0000kAÿÿ\u0003qA\u0004I \rAÛ\u0000k\"\u0002A\u0003MA\u0000 \u0002A\u0001G\u001br\r\u0000 \b \u0007A\u0001tjA\u0002j\"\b!\u0005 \u0003!\u0004 \u0007!\u0002\u0003@\u0002@ \u0004Aÿÿ\u0003q\"\u000eA\tk\"\u0010A\u001dMA\u0000A\u0001 \u0010tA\u0003q\u001b \u000eA \u0001F \u0004Aøÿ\u0003qA(Frr \u0004A:kAÿÿ\u0003qA\u0006Ir\r\u0000 \u0004Aû\u0000kAÿÿ\u0003qA\u0004I \u000eAÛ\u0000k\"\u0004A\u0003MA\u0000 \u0004A\u0001G\u001br\r\u0000 \u0006 \u0002A\u0001j\"\u00026\u0002\u0000 \u0002 \tN\r\u0000 \u0005/\u0001\u0000!\u0004 \u0005A\u0002j!\u0005\f\u0001\u000b\u000b \u0006 \u00076\u0002\u0000\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002@\u0002\u0002@ \u0002 \u0007kA\u0006G\r\u0000\u0002@ \nA\u000bF\r\u0000 \rAé\u0000G\r\u0001A\u0002!\u0004A\u0000!\u0002\u0003@ \u0002A\u0001j\"\u0002A\u0005K\r\u0001 \u0004 \nj!\u0005 \u0004A\u000bj \u0004A\u0002j!\u0004/\u0001\u0000 \u0005/\u0001\u0000F\r\u0000\u000b\f\u0001\u000b \u000f(\u0000\u0000A\u0001F\u0004@ \f(\u0000\u0000\"\u0002A\u000bF\r\u0001 \u0007 \u0002/\u0001\u0000A.F\r\u0002\u001a\u000b \u000bA\bj \u0000\u0010\u0010 \u0000\u0010\r \u0000(\u0000\u0000 \u0006(\u0002\u0000\"\u0002A\u0001tj\"\u0004/\u0001\u0000\"\u0003A(k\"\u0005A\u0015K\r\u0002\u0002@ \u0005A\u0001k\u000e\u0015\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u001c\u0003\u001c\u0000\u000b \u000fA\u00016\u0002\u0000 \f \u00046\u0002\u0000 \u0006 \u0002A\u0001j\"\u00046\u0002\u0000 \u0000\u0010\r \u0000A\u0003\u0010\u000f \u0000\u0010\r \u000fA\u00016\u0002\u0000 \u0006 \u0006(\u0002\u0000\"\u0002A\u0001j\"\u00036\u0002\u0000 \f \u0000(\u0002\u0000 \u0002A\u0001tj6\u0002\u0000 \u0000\u0010\r \u0000(\u0000\u0000 \u0006(\u0002\u0000A\u0001tj/\u0001\u0000Aû\u0000F\r\u001b \u0007 \u0003 \u0004 \u0002\u0010\u0004\f\u001b\u000b \u0007\u000b!\u0004\u0003@\u0002@ \u0003Aÿÿ\u0003q\"\u0002A\tk\"\u0005A\u001dMA\u0000A\u0001 \u0005tA\u0003q\u001b \u0002A \u0001F \u0003Aøÿ\u0003qA(Frr \u0003A:kAÿÿ\u0003qA\u0006Ir\r\u0000 \u0003Aû\u0000kAÿÿ\u0003qA\u0004I \u0002AÛ\u0000k\"\u0002A\u0003MA\u0000 \u0002A\u0001G\u001br\r\u0000 \u0006 \u0004A\u0001j\"\u00046\u0002\u0000 \u0004 \tN\r\u0000 \b/\u0001\u0000!\u0003 \bA\u0002j!\b\f\u0001\u000b\u000b \u0006 \u00076\u0002\u0000\u0002@\u0002@ \u0004 \u0007kA\u0006G\r\u0000 \nA\u000bF\r\u0001 \rAå\u0000G\r\u0000A\u0002!\u0003A\u0000!\u0004\u0003@ \u0004A\u0001j\"\u0004A\u0005K\r\u0002 \u0003 \nj!\u0002 \u0003A\u000bj \u0003A\u0002j!\u0003/\u0001\u0000 \u0002/\u0001\u0000F\r\u0000\u000b\u000b \u000bA\bj \u0000\u0010\u0010\f\u001a\u000b \u000bA\bj \u0000\u0010\u0010 \u0000\u0010\r \u0000(\u0000\u0000 \u0006(\u0002\u0000A\u0001tj/\u0001\u0000\"\u0002A;F \u0002A=Fr\r\u0019 \u0007\u0010\n\u0002@ \u0006(\u0002\u0000\"\u0004 \u0000A\u0004j\"\r(\u0002\u0000\"\u000eH\u0004@ \u0000(\u0000\u0000\"\n \u0004A\u0001tj!\t \u0004!\u0002\u0003@ \t/\u0001\u0000\"\u0003A\tk\"\u0005A\u001dMA\u0000A\u0001 \u0005tA\u0003q\u001b \u0003A \u0001F \u0003Aøÿ\u0003qA(Frr \u0003A:kAÿÿ\u0003qA\u0006Ir\r\u0002 \u0003Aû\u0000kAÿÿ\u0003qA\u0004I \u0003AÛ\u0000k\"\u0003A\u0003MA\u0000 \u0003A\u0001G\u001br\r\u0002 \u0006 \u0002A\u0001j\"\u00026\u0002\u0000 \tA\u0002j!\t \u0002 \u000eH\r\u0000\u000b\f\u0001\u000b \u0000(\u0002\u0000!\n \u0004!\u0002\u000b \u0006 \u00046\u0002\u0000 \n \u0004A\u0001t\"\u0010j!\b\u0002@\u0002@\u0002@ \u0002 \u0004kA\u0005G\r\u0000 \bAÎ\fF\r\u0001 \b/\u0001\u0000Aã\u0000G\r\u0000 \b/\u0001\u0002Aï\u0000G\r\u0000 \b/\u0001\u0004Aî\u0000G\r\u0000 \b/\u0001\u0006Aó\u0000G\r\u0000 \b/\u0001\bAô\u0000F\r\u0001\u000b\u0002@ \u000e \u0004\"\u0002L\"\u0003\r\u0000 \n \u0010j!\t\u0003@ \t/\u0001\u0000\"\u0005A\tk\"\u0011A\u001dMA\u0000A\u0001 \u0011tA\u0003q\u001b \u0005A \u0001F \u0005Aøÿ\u0003qA(Frr \u0005A:kAÿÿ\u0003qA\u0006Ir\r\u0001 \u0005Aû\u0000kAÿÿ\u0003qA\u0004I \u0005AÛ\u0000k\"\u0005A\u0003MA\u0000 \u0005A\u0001G\u001br\r\u0001 \u0006 \u0002A\u0001j\"\u00026\u0002\u0000 \tA\u0002j!\t \u0002 \u000eH\r\u0000\u000b\u000b \u0006 \u00046\u0002\u0000\u0002@ \u0002 \u0004kA\u0003G\r\u0000 \bAÚ\fF\r\u0001 \b/\u0001\u0000Aì\u0000G\r\u0000 \b/\u0001\u0002Aå\u0000G\r\u0000 \b/\u0001\u0004Aô\u0000F\r\u0001\u000b \u0004!\u0002\u0002@ \u0003\r\u0000 \n \u0010j!\t\u0003@ \t/\u0001\u0000\"\u0005A\tk\"\u0011A\u001dMA\u0000A\u0001 \u0011tA\u0003q\u001b \u0005A \u0001F \u0005Aøÿ\u0003qA(Frr \u0005A:kAÿÿ\u0003qA\u0006Ir\r\u0001 \u0005Aû\u0000kAÿÿ\u0003qA\u0004I \u0005AÛ\u0000k\"\u0005A\u0003MA\u0000 \u0005A\u0001G\u001br\r\u0001 \u0006 \u0002A\u0001j\"\u00026\u0002\u0000 \tA\u0002j!\t \u0002 \u000eH\r\u0000\u000b\u000b \u0006 \u00046\u0002\u0000 \u0002 \u0004kA\u0003G\r\u0001 \bAâ\fF\r\u0000 \b/\u0001\u0000Aö\u0000G\r\u0001 \b/\u0001\u0002Aá\u0000G\r\u0001 \b/\u0001\u0004Aò\u0000G\r\u0001\u000b \u000bA\bj \u0000\u0010\u0010 \u0000\u0010\r \u000bA\bj \u0000\u0010\u0010 \u000b(\u0002\b\"\u0002 \u000b(\u0002\f\"\u0004 \u0002 \u0004\u0010\u0007 \u0007A\u0006j\u0010\u000b\f\u001a\u000b \u0004!\u0002\u0002@ \u0003\r\u0000 \n \u0010j!\t\u0003@ \t/\u0001\u0000\"\u0005A\tk\"\u0011A\u001dMA\u0000A\u0001 \u0011tA\u0003q\u001b \u0005A \u0001F \u0005Aøÿ\u0003qA(Frr \u0005A:kAÿÿ\u0003qA\u0006Ir\r\u0001 \u0005Aû\u0000kAÿÿ\u0003qA\u0004I \u0005AÛ\u0000k\"\u0005A\u0003MA\u0000 \u0005A\u0001G\u001br\r\u0001 \u0006 \u0002A\u0001j\"\u00026\u0002\u0000 \tA\u0002j!\t \u0002 \u000eH\r\u0000\u000b\u000b \u0006 \u00046\u0002\u0000\u0002@\u0002@ \u0002 \u0004kA\u0005G\r\u0000 \bAê\fF\r\u0001 \b/\u0001\u0000Aá\u0000G\r\u0000 \b/\u0001\u0002Aó\u0000G\r\u0000 \b/\u0001\u0004Aù\u0000G\r\u0000 \b/\u0001\u0006Aî\u0000G\r\u0000 \b/\u0001\bAã\u0000F\r\u0001\u000b \u0004!\u0002\u0002@ \u0003\r\u0000 \n \u0010j!\t\u0003@ \t/\u0001\u0000\"\u0005A\tk\"\nA\u001dMA\u0000A\u0001 \ntA\u0003q\u001b \u0005A \u0001F \u0005Aøÿ\u0003qA(Frr \u0005A:kAÿÿ\u0003qA\u0006Ir\r\u0001 \u0005Aû\u0000kAÿÿ\u0003qA\u0004I \u0005AÛ\u0000k\"\u0005A\u0003MA\u0000 \u0005A\u0001G\u001br\r\u0001 \u0006 \u0002A\u0001j\"\u00026\u0002\u0000 \tA\u0002j!\t \u0002 \u000eH\r\u0000\u000b\u000b \u0006 \u00046\u0002\u0000 \u0002 \u0004kA\bG\r\u0003 \bAö\fF\r\u0000 \b/\u0001\u0000Aæ\u0000G\r\u0003 \b/\u0001\u0002Aõ\u0000G\r\u0003 \b/\u0001\u0004Aî\u0000G\r\u0003 \b/\u0001\u0006Aã\u0000G\r\u0003 \b/\u0001\bAô\u0000G\r\u0003 \b/\u0001\nAé\u0000G\r\u0003 \b/\u0001\fAï\u0000G\r\u0003 \b/\u0001\u000eAî\u0000G\r\u0003\u000b \u000bA\bj \u0000\u0010\u0011 \u000b(\u0002\b\"\u0002 \u000b(\u0002\f\"\u0004 \u0002 \u0004\u0010\u0007 \u0007A\u0006j\u0010\u000b\f\u0019\u000b \u0007\u0010\u0006 \u0003Aÿ\u0001q\"\u0002A'GA\u0000 \u0002A\"G\u001b\r\u0002 \u0006 \u0006(\u0002\u0000\"\u0007A\u0001j\"\u00036\u0002\u0000 \u0007A\u0001t!\u0005\u0002@ \u0000A\u0004j(\u0002\u0000\"\t \u0003J\u0004@ \u0000(\u0000\u0000\"\n \u0005j\"\b/\u0001\u0000!\r \u0007!\u0002\u0003@ \n \u0003A\u0001tj/\u0001\u0000\"\u000e \rF\r\u0002 \u0003!\u0004 \u000eAÜ\u0000F\u0004@ \u0006 \u0002A\u0002j\"\u00046\u0002\u0000\u000b \u0006 \u0004A\u0001j\"\u00036\u0002\u0000 \u0004!\u0002 \u0003 \tH\r\u0000\u000b\u000bAÊ\nA\u001b\u0010\u0000 \u0000(\u0002\u0000 \u0005j!\b \u0006(\u0002\u0000!\u0003\u000b \f \b6\u0002\u0000 \u000f \u0003A\u0001j\"\u0002 \u0007k6\u0002\u0000 \u0006 \u00026\u0002\u0000 \u0002 \f)\u0002\u0000\"\u0016§ \u0016B §\u0010\u0003\f\u0018\u000b \u000fA\u00016\u0002\u0000 \f \u00046\u0002\u0000 \u0006 \u0002A\u0001j6\u0002\u0000 \u0000\u0010\r \u000bA\bj \u0000\u0010\u0010\u0002@\u0002@ \u000b(\u0002\fA\u0004G\r\u0000 \u000b(\u0002\b\"\u0002A\u000eF\r\u0001 \u0002/\u0001\u0000Aí\u0000G\r\u0000 \u0002/\u0001\u0002Aå\u0000G\r\u0000 \u0002/\u0001\u0004Aô\u0000G\r\u0000 \u0002/\u0001\u0006Aá\u0000F\r\u0001\u000bA\u000eA1\u0010\u0000\u000b \u0007 \u0006(\u0002\u0000\u0010\u0005\f\u0017\u000b \u0004!\u0002\u0002@ \u0003\r\u0000 \b!\t\u0003@ \t/\u0001\u0000\"\u0005A\tk\"\nA\u001dMA\u0000A\u0001 \ntA\u0003q\u001b \u0005A \u0001F \u0005Aøÿ\u0003qA(Frr \u0005A:kAÿÿ\u0003qA\u0006Ir\r\u0001 \u0005Aû\u0000kAÿÿ\u0003qA\u0004I \u0005AÛ\u0000k\"\u0005A\u0003MA\u0000 \u0005A\u0001G\u001br\r\u0001 \u0006 \u0002A\u0001j\"\u00026\u0002\u0000 \tA\u0002j!\t \u0002 \u000eH\r\u0000\u000b\u000b \u0006 \u00046\u0002\u0000 \u0002 \u0004kA\u0005G\r\u0001 \bA\rG\u0004@ \b/\u0001\u0000\"\u0005Aã\u0000G\r\u0003Aã\u0000!\u0005 \b/\u0001\u0002Aì\u0000G\r\u0004 \b/\u0001\u0004Aá\u0000G\r\u0004 \b/\u0001\u0006Aó\u0000G\r\u0004 \b/\u0001\bAó\u0000G\r\u0004\u000b \u000bA\bj \u0000\u0010\u0012 \u000b(\u0002\b\"\u0002 \u000b(\u0002\f\"\u0004 \u0002 \u0004\u0010\u0007 \u0007A\u0006j\u0010\u000b\f\u0016\u000b \u0000(\u0000\u0000 \u0006(\u0002\u0000\"\u0002A\u0001tj\"\u0004/\u0001\u0000\"\u0003A*F\r\u0004 \u0003Aû\u0000G\r\u0005\f\u0006\u000b \b/\u0001\u0000!\u0005\u000b \u0005Aÿÿ\u0003q\"\u0002A*F\r\u0001 \u0002Aû\u0000G\r\u0000 \u000fA\u00016\u0002\u0000 \f \b6\u0002\u0000 \u0006 \u0004A\u0001j6\u0002\u0000 \u0000\u0010\r\u0002@ \u0006(\u0002\u0000\"\u0003 \r(\u0002\u0000H\u0004@\u0003@ \u0000(\u0000\u0000 \u0003A\u0001tj\"\u0004/\u0001\u0000Aý\u0000F\r\u0002 \u0000\u0010\r\u0002@ \u0000(\u0000\u0000\"\b \u0006(\u0002\u0000\"\u0007A\u0001t\"\tj\"\n/\u0001\u0000\"\u0005A'GA\u0000 \u0005A\"G\u001bE\u0004@ \u0006 \u0007A\u0001j\"\u00036\u0002\u0000 \u0007!\u0002\u0002@ \r(\u0002\u0000\"\u000e \u0003J\u0004@\u0003@ \b \u0003A\u0001tj/\u0001\u0000\"\u0010 \u0005F\r\u0002 \u0003!\u0004 \u0010AÜ\u0000F\u0004@ \u0006 \u0002A\u0002j\"\u00046\u0002\u0000\u000b \u0006 \u0004A\u0001j\"\u00036\u0002\u0000 \u0004!\u0002 \u0003 \u000eH\r\u0000\u000b\u000bAÊ\nA\u001b\u0010\u0000 \u0000(\u0002\u0000 \tj!\n \u0006(\u0002\u0000!\u0003\u000b \f \n6\u0002\u0000 \u000f \u0003A\u0001j\"\u0002 \u0007k6\u0002\u0000 \u0006 \u00026\u0002\u0000 \u000b \f)\u0002\u00007\u0003\b\f\u0001\u000b \u000bA\bj \u0000\u0010\u0010\u000b \u0000\u0010\r\u0002@\u0002@ \u0000(\u0000\u0000 \u0006(\u0002\u0000A\u0001tj/\u0001\u0000\"\u0002A!k\"\u0004A\u0005MA\u0000A\u0001 \u0004tA1q\u001b \u0002Aøÿ\u0003qA(F \u0002A:kAÿÿ\u0003qA\u0006Irr\r\u0000 \u0002Aû\u0000kAÿÿ\u0003qA\u0004I \u0002AÛ\u0000k\"\u0002A\u0003MA\u0000 \u0002A\u0001G\u001br\r\u0000 \u000b \u0000\u0010\u0010 \u0000\u0010\r\u0002 \u0000(\u0000\u0000\"\b \u0006(\u0002\u0000\"\u0007A\u0001t\"\tj\"\n/\u0001\u0000\"\u0005A'GA\u0000 \u0005A\"G\u001bE\u0004@ \u0006 \u0007A\u0001j\"\u00036\u0002\u0000 \u0007!\u0002\u0002@ \r(\u0002\u0000\"\u000e \u0003J\u0004@\u0003@ \b \u0003A\u0001tj/\u0001\u0000\"\u0010 \u0005F\r\u0002 \u0003!\u0004 \u0010AÜ\u0000F\u0004@ \u0006 \u0002A\u0002j\"\u00046\u0002\u0000\u000b \u0006 \u0004A\u0001j\"\u00036\u0002\u0000 \u0004!\u0002 \u0003 \u000eH\r\u0000\u000b\u000bAÊ\nA\u001b\u0010\u0000 \u0000(\u0002\u0000 \tj!\n \u0006(\u0002\u0000!\u0003\u000b \f \n6\u0002\u0000 \u000f \u0003A\u0001j\"\u0002 \u0007k6\u0002\u0000 \u0006 \u00026\u0002\u0000 \u000b \f)\u0002\u0000\"\u00167\u0003\u0000 \u0016§!\u0003 \u0016B §\f\u0001\u000b \u000b \u0000\u0010\u0010 \u000b(\u0002\u0000!\u0003 \u000b(\u0002\u0004\u000b!\u0002 \u000b(\u0002\b \u000b(\u0002\f \u0003 \u0002\u0010\u0007\f\u0001\u000b \u000b(\u0002\b\"\u0002 \u000b(\u0002\f\"\u0004 \u0002 \u0004\u0010\u0007\u000b \u0000\u0010\r \u0000(\u0000\u0000 \u0006(\u0002\u0000\"\u0003A\u0001tj\"\u0002/\u0001\u0000A,F\u0004@ \u000fA\u00016\u0002\u0000 \f \u00026\u0002\u0000 \u0006 \u0003A\u0001j6\u0002\u0000 \u0000\u0010\r \u0006(\u0002\u0000!\u0003\u000b \u0003 \r(\u0002\u0000H\r\u0000\u000b\u000bAÌ\rA\u0015\u0010\u0000 \u0000(\u0002\u0000 \u0006(\u0002\u0000\"\u0003A\u0001tj!\u0004\u000b \u000fA\u00016\u0002\u0000 \f \u00046\u0002\u0000 \u0006 \u0003A\u0001j\"\b6\u0002\u0000 \u0000\u0010\r \u0006(\u0002\u0000\"\u0002 \r(\u0002\u0000\"\tN\r\u0006 \u0000(\u0000\u0000\"\u0005 \u0002A\u0001tj!\u0007 \u0002!\u0004\u0003@ \u0007/\u0001\u0000\"\u0003A\tk\"\nA\u001dMA\u0000A\u0001 \ntA\u0003q\u001b \u0003A \u0001F \u0003Aøÿ\u0003qA(Frr \u0003A:kAÿÿ\u0003qA\u0006Ir\r\b \u0003Aû\u0000kAÿÿ\u0003qA\u0004I \u0003AÛ\u0000k\"\u0003A\u0003MA\u0000 \u0003A\u0001G\u001br\r\b \u0006 \u0004A\u0001j\"\u00046\u0002\u0000 \u0007A\u0002j!\u0007 \u0004 \tH\r\u0000\u000b\f\u0007\u000b \u0004!\u0007\u0002@ \u0003\r\u0000 \bA\u0002j!\t \u0005!\u0003\u0003@ \u0003Aÿÿ\u0003q\"\u0002A\tk\"\nA\u001dMA\u0000A\u0001 \ntA\u0003q\u001b \u0002A \u0001F \u0003Aøÿ\u0003qA(Frr \u0003A:kAÿÿ\u0003qA\u0006Ir\r\u0001 \u0003Aû\u0000kAÿÿ\u0003qA\u0004I \u0002AÛ\u0000k\"\u0002A\u0003MA\u0000 \u0002A\u0001G\u001br\r\u0001 \u0006 \u0007A\u0001j\"\u00076\u0002\u0000 \u0007 \u000eN\r\u0001 \t/\u0001\u0000!\u0003 \tA\u0002j!\t\f\u0000\u000b\u0000\u000b \u0006 \u00046\u0002\u0000\u0002@ \u0007 \u0004kA\u0007G\r\u0000 \bA\rF\r\n \u0005Aÿÿ\u0003qAä\u0000G\r\u0000A\u0002!\u0003A\u0000!\u0004\u0003@ \u0004A\u0001j\"\u0004A\u0006K\r\u000b \u0003 \bj!\u0002 \u0003A\rj \u0003A\u0002j!\u0003/\u0001\u0000 \u0002/\u0001\u0000F\r\u0000\u000b\u000bA®\rA\u000e\u0010\u0000\f\u0012\u000b \u000fA\u00016\u0002\u0000 \f \b6\u0002\u0000 \u0006 \u0004A\u0001j6\u0002\u0000 \u0000\u0010\r \u0006(\u0002\u0000\"\u0002 \r(\u0002\u0000\"\u0005N\r\u0006 \u0000(\u0000\u0000\"\b \u0002A\u0001tj!\u0007 \u0002!\u0004\u0003@ \u0007/\u0001\u0000\"\u0003A\tk\"\tA\u001dMA\u0000A\u0001 \ttA\u0003q\u001b \u0003A \u0001F \u0003Aøÿ\u0003qA(Frr \u0003A:kAÿÿ\u0003qA\u0006Ir\r\b \u0003Aû\u0000kAÿÿ\u0003qA\u0004I \u0003AÛ\u0000k\"\u0003A\u0003MA\u0000 \u0003A\u0001G\u001br\r\b \u0006 \u0004A\u0001j\"\u00046\u0002\u0000 \u0007A\u0002j!\u0007 \u0004 \u0005H\r\u0000\u000b\f\u0007\u000b \u000fA\u00016\u0002\u0000 \u0006 \u0002A\u0002j6\u0002\u0000 \f \u0004A\u0002j6\u0002\u0000 \u0000\u0010\r \u000bA\bj \u0000\u0010\u0010 \u0000\u0010\r \u000bA\bj \u0000\u0010\u0010 \u000b(\u0002\b \u000b(\u0002\f\u0010\u0002\f\r\u000b \u000b \u0000\u0010\u0010A\rA\u0007 \u000b(\u0002\u0000 \u000b(\u0002\u0004\u0010\u0001 \u0000\u0010\r \u0000(\u0000\u0000 \u0006(\u0002\u0000\"\u0002A\u0001tj\"\u0004/\u0001\u0000A,G\r\f \u000fA\u00016\u0002\u0000 \f \u00046\u0002\u0000 \u0006 \u0002A\u0001j6\u0002\u0000 \u0000\u0010\r \u0000(\u0000\u0000 \u0006(\u0002\u0000\"\u0002A\u0001tj\"\u0004/\u0001\u0000\"\u0003A*F\r\u000b \u0003Aû\u0000G\r\u0001\u000b#\u0000A\u0010k\"\u0005$\u0000 \u0000 \u0000(\u0002\u0010A\u0001j\"\u00036\u0002\u0010\u0002@ \u0000(\u0002\u0004 \u0003J\u0004@ \u0000A\u0010j!\b \u0000A\u0004j!\n \u0000A\bj!\t \u0000A\fj!\r\u0003@ \u0000(\u0000\u0000 \u0003A\u0001tj\"\u0002/\u0001\u0000Aý\u0000F\r\u0002 \u0000\u0010\r\u0002@ \u0000(\u0000\u0000\"\u0011 \b(\u0002\u0000\"\u0007A\u0001t\"\u0013j\"\u000e/\u0001\u0000\"\u0010A'GA\u0000 \u0010A\"G\u001bE\u0004@ \b \u0007A\u0001j\"\u00036\u0002\u0000 \u0007!\u0004\u0002@ \n(\u0002\u0000\"\u0014 \u0003J\u0004@\u0003@ \u0011 \u0003A\u0001tj/\u0001\u0000\"\u0015 \u0010F\r\u0002 \u0003!\u0002 \u0015AÜ\u0000F\u0004@ \b \u0004A\u0002j\"\u00026\u0002\u0000\u000b \b \u0002A\u0001j\"\u00036\u0002\u0000 \u0002!\u0004 \u0003 \u0014H\r\u0000\u000b\u000bAÊ\nA\u001b\u0010\u0000 \u0000(\u0002\u0000 \u0013j!\u000e \b(\u0002\u0000!\u0003\u000b \t \u000e6\u0002\u0000 \r \u0003A\u0001j\"\u0002 \u0007k6\u0002\u0000 \b \u00026\u0002\u0000 \u0005 \t)\u0002\u00007\u0003\b\f\u0001\u000b \u0005A\bj \u0000\u0010\u0010\u000b \u0000\u0010\r\u0002@\u0002@ \u0000(\u0000\u0000 \b(\u0002\u0000A\u0001tj/\u0001\u0000\"\u0002A!k\"\u0004A\u0005MA\u0000A\u0001 \u0004tA1q\u001b \u0002Aøÿ\u0003qA(F \u0002A:kAÿÿ\u0003qA\u0006Irr\r\u0000 \u0002Aû\u0000kAÿÿ\u0003qA\u0004I \u0002AÛ\u0000k\"\u0002A\u0003MA\u0000 \u0002A\u0001G\u001br\r\u0000 \u0005 \u0000\u0010\u0010 \u0000\u0010\r \u0005 \u0000\u0010\u0010 \u0005(\u0002\b \u0005(\u0002\f \u0005(\u0002\u0000 \u0005(\u0002\u0004\u0010\u0001\f\u0001\u000b \u0005(\u0002\b\"\u0002 \u0005(\u0002\f\"\u0004 \u0002 \u0004\u0010\u0001\u000b \u0000\u0010\r \u0000(\u0000\u0000 \b(\u0002\u0000\"\u0003A\u0001tj\"\u0002/\u0001\u0000A,F\u0004@ \rA\u00016\u0002\u0000 \t \u00026\u0002\u0000 \b \u0003A\u0001j6\u0002\u0000 \u0000\u0010\r \b(\u0002\u0000!\u0003\u000b \u0003 \n(\u0002\u0000H\r\u0000\u000b\u000bAÄ\u000fA\u0015\u0010\u0000 \u0000(\u0002\u0000 \u0000A\u0010j(\u0002\u0000\"\u0003A\u0001tj!\u0002\u000b \u0000A\fjA\u00016\u0002\u0000 \u0000A\bj \u00026\u0002\u0000 \u0000A\u0010j \u0003A\u0001j6\u0002\u0000 \u0005A\u0010j$\u0000\f\u000b\u000bAø\u000eA%\u0010\u0000\f\n\u000b \u0000(\u0002\u0000!\u0005 \u0002!\u0004\u000b \u0006 \u00026\u0002\u0000\u0002@ \u0004 \u0002kA\u0004G\r\u0000 \u0005 \u0002A\u0001tj\"\u0002A\rG\u0004@ \u0002/\u0001\u0000Aæ\u0000G\r\u0001 \u0002/\u0001\u0002Aò\u0000G\r\u0001 \u0002/\u0001\u0004Aï\u0000G\r\u0001 \u0002/\u0001\u0006Aí\u0000G\r\u0001\u000b \u000bA\bj \u0000\u0010\u0010 \u0000\u0010\r \u0006 \u0006(\u0002\u0000\"\u0007A\u0001j\"\u00036\u0002\u0000 \u0007A\u0001t!\u0005\u0002@ \r(\u0002\u0000\"\t \u0003J\u0004@ \u0000(\u0000\u0000\"\n \u0005j\"\b/\u0001\u0000!\r \u0007!\u0002\u0003@ \n \u0003A\u0001tj/\u0001\u0000\"\u000e \rF\r\u0002 \u0003!\u0004 \u000eAÜ\u0000F\u0004@ \u0006 \u0002A\u0002j\"\u00046\u0002\u0000\u000b \u0006 \u0004A\u0001j\"\u00036\u0002\u0000 \u0004!\u0002 \u0003 \tH\r\u0000\u000b\u000bAÊ\nA\u001b\u0010\u0000 \u0000(\u0002\u0000 \u0005j!\b \u0006(\u0002\u0000!\u0003\u000b \f \b6\u0002\u0000 \u000f \u0003A\u0001j\"\u0002 \u0007k6\u0002\u0000 \u0006 \u00026\u0002\u0000 \u0002 \f)\u0002\u0000\"\u0016§ \u0016B §\u0010\t\f\f\u000b \b\u0010\u000b\f\u000b\u000b \u0000(\u0002\u0000!\b \u0002!\u0004\u000b \u0006 \u00026\u0002\u0000\u0002@ \u0004 \u0002kA\u0004G\r\u0000 \b \u0002A\u0001tj\"\u0002A\rG\u0004@ \u0002/\u0001\u0000Aæ\u0000G\r\u0001 \u0002/\u0001\u0002Aò\u0000G\r\u0001 \u0002/\u0001\u0004Aï\u0000G\r\u0001 \u0002/\u0001\u0006Aí\u0000G\r\u0001\u000b \u000bA\bj \u0000\u0010\u0010 \u0000\u0010\r \u0006 \u0006(\u0002\u0000\"\u0007A\u0001j\"\u00036\u0002\u0000 \u0007A\u0001t!\u0005\u0002@ \r(\u0002\u0000\"\t \u0003J\u0004@ \u0000(\u0000\u0000\"\n \u0005j\"\b/\u0001\u0000!\r \u0007!\u0002\u0003@ \n \u0003A\u0001tj/\u0001\u0000\"\u000e \rF\r\u0002 \u0003!\u0004 \u000eAÜ\u0000F\u0004@ \u0006 \u0002A\u0002j\"\u00046\u0002\u0000\u000b \u0006 \u0004A\u0001j\"\u00036\u0002\u0000 \u0004!\u0002 \u0003 \tH\r\u0000\u000b\u000bAÊ\nA\u001b\u0010\u0000 \u0000(\u0002\u0000 \u0005j!\b \u0006(\u0002\u0000!\u0003\u000b \f \b6\u0002\u0000 \u000f \u0003A\u0001j\"\u0002 \u0007k6\u0002\u0000 \u0006 \u00026\u0002\u0000 \f)\u0002\u0000!\u0016\u0010\f \u0006(\u0002\u0000 \u0016§ \u0016B §\u0010\t\f\n\u000b \u000bA\bj \u0000\u0010\u0010 \u0000\u0010\r \u0000(\u0000\u0000\"\b \u0006(\u0002\u0000\"\u0007A\u0001t\"\tj\"\n/\u0001\u0000\"\u0005A'GA\u0000 \u0005A\"G\u001b\r\u0001 \u0006 \u0007A\u0001j\"\u00036\u0002\u0000 \u0007!\u0002\u0002@ \r(\u0002\u0000\"\u000e \u0003J\u0004@\u0003@ \b \u0003A\u0001tj/\u0001\u0000\"\u0010 \u0005F\r\u0002 \u0003!\u0004 \u0010AÜ\u0000F\u0004@ \u0006 \u0002A\u0002j\"\u00046\u0002\u0000\u000b \u0006 \u0004A\u0001j\"\u00036\u0002\u0000 \u0004!\u0002 \u0003 \u000eH\r\u0000\u000b\u000bAÊ\nA\u001b\u0010\u0000 \u0000(\u0002\u0000 \tj!\n \u0006(\u0002\u0000!\u0003\u000b \f \n6\u0002\u0000 \u000f \u0003A\u0001j\"\u0002 \u0007k6\u0002\u0000 \u0006 \u00026\u0002\u0000 \u000b \f)\u0002\u00007\u0003\b\f\u0002\u000b \u000bA\bj \u0000\u0010\u0010 \u0006(\u0002\u0000!\t \u0000\u0010\r \u0006(\u0002\u0000\"\u0004 \r(\u0002\u0000\"\bN\r\u0002 \u0000(\u0000\u0000\"\u0005 \u0004A\u0001tj!\u0002 \u0004!\u0007\u0003@ \u0002/\u0001\u0000\"\u0003A\tk\"\nA\u001dMA\u0000A\u0001 \ntA\u0003q\u001b \u0003A \u0001F \u0003Aøÿ\u0003qA(Frr \u0003A:kAÿÿ\u0003qA\u0006Ir\r\u0004 \u0003Aû\u0000kAÿÿ\u0003qA\u0004I \u0003AÛ\u0000k\"\u0003A\u0003MA\u0000 \u0003A\u0001G\u001br\r\u0004 \u0006 \u0007A\u0001j\"\u00076\u0002\u0000 \u0002A\u0002j!\u0002 \u0007 \bH\r\u0000\u000b\f\u0003\u000b \u000bA\bj \u0000\u0010\u0010\u000b \u0000\u0010\r \u000b \u0000\u0010\u0010 \u0000\u0010\r \u0006 \u0006(\u0002\u0000\"\u0007A\u0001j\"\u00036\u0002\u0000 \u0007A\u0001t!\u0005\u0002@ \r(\u0002\u0000\"\t \u0003J\u0004@ \u0000(\u0000\u0000\"\n \u0005j\"\b/\u0001\u0000!\r \u0007!\u0002\u0003@ \n \u0003A\u0001tj/\u0001\u0000\"\u000e \rF\r\u0002 \u0003!\u0004 \u000eAÜ\u0000F\u0004@ \u0006 \u0002A\u0002j\"\u00046\u0002\u0000\u000b \u0006 \u0004A\u0001j\"\u00036\u0002\u0000 \u0004!\u0002 \u0003 \tH\r\u0000\u000b\u000bAÊ\nA\u001b\u0010\u0000 \u0000(\u0002\u0000 \u0005j!\b \u0006(\u0002\u0000!\u0003\u000b \f \b6\u0002\u0000 \u000f \u0003A\u0001j\"\u0002 \u0007k6\u0002\u0000 \u0006 \u00026\u0002\u0000 \f)\u0002\u0000!\u0016 \u000b(\u0002\b \u000b(\u0002\f\u0010\b \u0006(\u0002\u0000 \u0016§ \u0016B §\u0010\t\f\u0006\u000b \u0000(\u0002\u0000!\u0005 \u0004!\u0007\u000b \u0006 \u00046\u0002\u0000 \u0005 \u0004A\u0001t\"\u0002j!\u0003\u0002@\u0002@\u0002@\u0002@ \u0007 \u0004kA\u0005G\r\u0000 \u0003Aê\fF\r\u0001 \u0003/\u0001\u0000Aá\u0000G\r\u0000 \u0003/\u0001\u0002Aó\u0000G\r\u0000 \u0003/\u0001\u0004Aù\u0000G\r\u0000 \u0003/\u0001\u0006Aî\u0000G\r\u0000 \u0003/\u0001\bAã\u0000F\r\u0001\u000b\u0002@ \b \u0004\"\u0007L\"\n\r\u0000 \u0002 \u0005j!\u0002\u0003@ \u0002/\u0001\u0000\"\u0005A\tk\"\rA\u001dMA\u0000A\u0001 \rtA\u0003q\u001b \u0005A \u0001F \u0005Aøÿ\u0003qA(Frr \u0005A:kAÿÿ\u0003qA\u0006Ir\r\u0001 \u0005Aû\u0000kAÿÿ\u0003qA\u0004I \u0005AÛ\u0000k\"\u0005A\u0003MA\u0000 \u0005A\u0001G\u001br\r\u0001 \u0006 \u0007A\u0001j\"\u00076\u0002\u0000 \u0002A\u0002j!\u0002 \u0007 \bH\r\u0000\u000b\u000b \u0006 \u00046\u0002\u0000 \u0007 \u0004kA\bG\r\u0001 \u0003Aö\fF\r\u0000 \u0003/\u0001\u0000Aæ\u0000G\r\u0001 \u0003/\u0001\u0002Aõ\u0000G\r\u0001 \u0003/\u0001\u0004Aî\u0000G\r\u0001 \u0003/\u0001\u0006Aã\u0000G\r\u0001 \u0003/\u0001\bAô\u0000G\r\u0001 \u0003/\u0001\nAé\u0000G\r\u0001 \u0003/\u0001\fAï\u0000G\r\u0001 \u0003/\u0001\u000eAî\u0000G\r\u0001\u000b \u000b \u0000\u0010\u0011 \u000b(\u0002\u0004\"\u0002E\r\u0001 \u000b(\u0002\u0000 \u0002A\rA\u0007\u0010\u0007 \t\u0010\u000b\f\u0006\u000b \u0004!\u0007\u0002@ \n\r\u0000 \u0003!\u0002\u0003@ \u0002/\u0001\u0000\"\u0005A\tk\"\nA\u001dMA\u0000A\u0001 \ntA\u0003q\u001b \u0005A \u0001F \u0005Aøÿ\u0003qA(Frr \u0005A:kAÿÿ\u0003qA\u0006Ir\r\u0001 \u0005Aû\u0000kAÿÿ\u0003qA\u0004I \u0005AÛ\u0000k\"\u0005A\u0003MA\u0000 \u0005A\u0001G\u001br\r\u0001 \u0006 \u0007A\u0001j\"\u00076\u0002\u0000 \u0002A\u0002j!\u0002 \u0007 \bH\r\u0000\u000b\u000b \u0006 \u00046\u0002\u0000 \u0007 \u0004kA\u0005G\r\u0000 \u0003A\rG\u0004@ \u0003/\u0001\u0000Aã\u0000G\r\u0001 \u0003/\u0001\u0002Aì\u0000G\r\u0001 \u0003/\u0001\u0004Aá\u0000G\r\u0001 \u0003/\u0001\u0006Aó\u0000G\r\u0001 \u0003/\u0001\bAó\u0000G\r\u0001\u000b \u000b \u0000\u0010\u0012 \u000b(\u0002\u0004\"\u0002E\r\u0000 \u000b(\u0002\u0000 \u0002A\rA\u0007\u0010\u0007 \t\u0010\u000b\f\u0005\u000bA\rA\u0007A\rA\u0007\u0010\u0007 \t\u0010\u000b\f\u0004\u000b \u000fA\u00016\u0002\u0000 \u0006 \u0002A\u0002j6\u0002\u0000 \f \u0004A\u0002j6\u0002\u0000 \u0000\u0010\r \u000bA\bj \u0000\u0010\u0010 \u0000\u0010\r \u000bA\bj \u0000\u0010\u0010 \u000b(\u0002\b \u000b(\u0002\f\u0010\u0002\u000b \u0000\u0010\r \u000b \u0000\u0010\u0010 \u0000\u0010\r \u0006 \u0006(\u0002\u0000\"\u0007A\u0001j\"\u00036\u0002\u0000 \u0007A\u0001t!\u0005\u0002@ \u0000A\u0004j(\u0002\u0000\"\t \u0003J\u0004@ \u0000(\u0000\u0000\"\n \u0005j\"\b/\u0001\u0000!\r \u0007!\u0002\u0003@ \n \u0003A\u0001tj/\u0001\u0000\"\u000e \rF\r\u0002 \u0003!\u0004 \u000eAÜ\u0000F\u0004@ \u0006 \u0002A\u0002j\"\u00046\u0002\u0000\u000b \u0006 \u0004A\u0001j\"\u00036\u0002\u0000 \u0004!\u0002 \u0003 \tH\r\u0000\u000b\u000bAÊ\nA\u001b\u0010\u0000 \u0000(\u0002\u0000 \u0005j!\b \u0006(\u0002\u0000!\u0003\u000b \f \b6\u0002\u0000 \u000f \u0003A\u0001j\"\u0002 \u0007k6\u0002\u0000 \u0006 \u00026\u0002\u0000 \u0002 \f)\u0002\u0000\"\u0016§ \u0016B §\u0010\u0003\f\u0002\u000b \u000fA\u00016\u0002\u0000 \f \n6\u0002\u0000 \u0006 \u0007A\u0001j6\u0002\u0000\f\u0001\u000b \u0000 \u0000(\u0002\u0010\"\bA\u0001j\"\u00026\u0002\u0010\u0002@ \u0000(\u0002\u0004\"\u0007 \u0002J\u0004@ \u0000A\u0010j!\u0003 \u0000A\u0004j!\t\u0003@\u0002@\u0002@ \u0000(\u0000\u0000\"\u0005 \u0002A\u0001tj/\u0001\u0000\"\u0004AÛ\u0000G\u0004@ \u0004AÜ\u0000F\r\u0001 \u0004A/F\r\u0005 \u0002!\u0004\f\u0002\u000b \u0003 \u0002A\u0001j\"\u00046\u0002\u0000 \u0004 \u0007H\u0004@\u0003@\u0002@ \u0005 \u0004A\u0001tj/\u0001\u0000\"\nAÜ\u0000G\u0004@ \nAÝ\u0000F\r\u0005 \u0004!\u0002\f\u0001\u000b \u0003 \u0002A\u0002j\"\u00026\u0002\u0000\u000b \u0003 \u0002A\u0001j\"\u00046\u0002\u0000 \u0004 \u0007H\r\u0000\u000b\u000bAæ\u0010A\u001c\u0010\u0000 \t(\u0002\u0000!\u0007 \u0003(\u0002\u0000!\u0004\f\u0001\u000b \u0003 \u0002A\u0001j\"\u00046\u0002\u0000\u000b \u0003 \u0004A\u0001j\"\u00026\u0002\u0000 \u0002 \u0007H\r\u0000\u000b\u000bA¦\u0010A\u001f\u0010\u0000 \u0000A\u0010j(\u0002\u0000!\u0002 \u0000(\u0002\u0000!\u0005\u000b \u0000A\u0010j \u0002A\u0001j\"\u00026\u0002\u0000 \u0000 \u0005 \bA\u0001tj6\u0002\b \u0000A\fj \u0002 \bk6\u0002\u0000\u000b \u0000\u0010\r \u0006(\u0002\u0000\"\u0007 \u0000A\u0004j(\u0002\u0000\"\tH\r\u0000\u000b\u000b \u0001A\u0003G\r\u0000A¢\u000bA'\u0010\u0000\u000b \u000bA\u0010j$\u0000\u000b\u0002\u0001\b\u0002@ \u0001(\u0002\u0010\"\u0004 \u0001(\u0002\u0004\"\bH\u0004@ \u0001(\u0000\u0000\"\u0007 \u0004A\u0001tj!\u0005 \u0001A\u0010j!\t \u0004!\u0003\u0003@\u0002@ \u0005/\u0001\u0000\"\u0002A\tk\"\u0006A\u001dMA\u0000A\u0001 \u0006tA\u0003q\u001b \u0002A \u0001F \u0002Aøÿ\u0003qA(Frr \u0002A:kAÿÿ\u0003qA\u0006Ir\r\u0000\u0002@ \u0002Aú\u0000M\u0004@ \u0002A\"F \u0002AÛ\u0000k\"\u0006A\u0003MA\u0000 \u0006A\u0001G\u001br\r\u0002 \u0002A'G\r\u0001\f\u0002\u000b \u0002Aû\u0000kA\u0004I\r\u0001\u000b \t \u0003A\u0001j\"\u00036\u0002\u0000 \u0005A\u0002j!\u0005 \u0003 \bH\r\u0001\u000b\u000b \u0003 \u0004G\r\u0001\u000bAò\u000bA-\u0010\u0000 \u0001A\u0010j(\u0002\u0000!\u0003 \u0001(\u0002\u0000!\u0007\u000b \u0001A\fj \u0003 \u0004k6\u0002\u0000 \u0001 \u0007 \u0004A\u0001tj6\u0002\b \u0000 \u0001)\u0002\b7\u0002\u0000\u000b\u0004\u0001\t#\u0000A\u0010k\"\u0006$\u0000\u0002@ \u0001(\u0002\u0010\"\u0004 \u0001(\u0002\u0004\"\tH\u0004@ \u0001(\u0000\u0000\"\b \u0004A\u0001tj!\u0007 \u0001A\u0010j!\n \u0004!\u0002\u0003@ \u0007/\u0001\u0000\"\u0005A\tk\"\u0003A\u001dMA\u0000A\u0001 \u0003tA\u0003q\u001b \u0005A \u0001F \u0005Aøÿ\u0003qA(Frr \u0005A:kAÿÿ\u0003qA\u0006Ir\r\u0002 \u0005Aû\u0000kAÿÿ\u0003qA\u0004I \u0005AÛ\u0000k\"\u0003A\u0003MA\u0000 \u0003A\u0001G\u001br\r\u0002 \n \u0002A\u0001j\"\u00026\u0002\u0000 \u0007A\u0002j!\u0007 \u0002 \tH\r\u0000\u000b\f\u0001\u000b \u0001(\u0002\u0000!\b \u0004!\u0002\u000b \u0001A\u0010j\"\u0003 \u00046\u0002\u0000\u0002@ \u0002 \u0004kA\u0005G\r\u0000 \b \u0004A\u0001tj\"\u0002Aê\fG\u0004@ \u0002/\u0001\u0000Aá\u0000G\r\u0001 \u0002/\u0001\u0002Aó\u0000G\r\u0001 \u0002/\u0001\u0004Aù\u0000G\r\u0001 \u0002/\u0001\u0006Aî\u0000G\r\u0001 \u0002/\u0001\bAã\u0000G\r\u0001\u000b \u0006A\bj \u0001\u0010\u0010 \u0001\u0010\r\u000b \u0006A\bj \u0001\u0010\u0010 \u0001\u0010\r\u0002@\u0002@ \u0001(\u0000\u0000 \u0003(\u0002\u0000\"\u0004A\u0001tj\"\u0002/\u0001\u0000\"\u0003A*F\u0004@ \u0001 \u00026\u0002\b \u0001A\fjA\u00016\u0002\u0000 \u0001A\u0010j\"\u0002 \u0004A\u0001j6\u0002\u0000 \u0001\u0010\r \u0001(\u0000\u0000 \u0002(\u0002\u0000A\u0001tj/\u0001\u0000!\u0003\u000b \u0003A!k\"\u0002A\u0005MA\u0000A\u0001 \u0002tA1q\u001b \u0003Aøÿ\u0003qA(F \u0003A:kAÿÿ\u0003qA\u0006Irr\r\u0000 \u0003Aû\u0000kAÿÿ\u0003qA\u0003M \u0003AÛ\u0000k\"\u0002A\u0003MA\u0000 \u0002A\u0001G\u001br\r\u0000 \u0000 \u0001\u0010\u0010\f\u0001\u000b \u0000A\u00006\u0002\u0004 \u0000Aø\r6\u0002\u0000\u000b \u0006A\u0010j$\u0000\u000b©\u0002\u0001\u0003#\u0000A\u0010k\"\u0002$\u0000 \u0002A\bj \u0001\u0010\u0010 \u0001\u0010\r\u0002@\u0002@ \u0001(\u0000\u0000 \u0001(\u0002\u0010A\u0001tj/\u0001\u0000\"\u0003A!k\"\u0004A\u0005MA\u0000A\u0001 \u0004tA1q\u001b \u0003Aøÿ\u0003qA(F \u0003A:kAÿÿ\u0003qA\u0006Irr\r\u0000 \u0003Aû\u0000kAÿÿ\u0003qA\u0003M \u0003AÛ\u0000k\"\u0004A\u0003MA\u0000 \u0004A\u0001G\u001br\r\u0000 \u0002A\bj \u0001\u0010\u0010\u0002@ \u0002(\u0002\fA\u0007G\r\u0000 \u0002(\u0002\b\"\u0001Aú\rG\u0004@ \u0001/\u0001\u0000Aå\u0000G\r\u0001 \u0001/\u0001\u0002Aø\u0000G\r\u0001 \u0001/\u0001\u0004Aô\u0000G\r\u0001 \u0001/\u0001\u0006Aå\u0000G\r\u0001 \u0001/\u0001\bAî\u0000G\r\u0001 \u0001/\u0001\nAä\u0000G\r\u0001 \u0001/\u0001\fAó\u0000G\r\u0001\u000b \u0000A\u00006\u0002\u0004 \u0000Aø\r6\u0002\u0000\f\u0002\u000b \u0000 \u0002)\u0003\b7\u0002\u0000\f\u0001\u000b \u0000A\u00006\u0002\u0004 \u0000Aø\r6\u0002\u0000\u000b \u0002A\u0010j$\u0000\u000b=\u0001\u0001#\u0000A k\"\u0002$\u0000 \u0002A\u0014jB\u00007\u0002\u0000 \u0002 \u00016\u0002\f \u0002 \u00006\u0002\b \u0002Aø\r6\u0002\u0010 \u0002A\bjA\u0000\u0010\u000f \u0002A j$\u0000\u000b\u000b®\n1\u0000A\b\u000b\ta\u0000w\u0000a\u0000i\u0000t\u0000A\b\u000b\u0007c\u0000a\u0000s\u0000e\u0000A\b\u000b\u000fd\u0000e\u0000b\u0000u\u0000g\u0000g\u0000e\u0000r\u0000A¨\b\u000b\u000bd\u0000e\u0000l\u0000e\u0000t\u0000e\u0000A¶\b\u000b\u0003d\u0000o\u0000A¼\b\u000b\u0007e\u0000l\u0000s\u0000e\u0000AÆ\b\u000b\u0003i\u0000n\u0000AÌ\b\u000b\u0013i\u0000n\u0000s\u0000t\u0000a\u0000n\u0000c\u0000e\u0000o\u0000f\u0000Aâ\b\u000b\u0005n\u0000e\u0000w\u0000Aê\b\u000b\u000br\u0000e\u0000t\u0000u\u0000r\u0000n\u0000Aø\b\u000b\tt\u0000h\u0000r\u0000o\u0000w\u0000A\t\u000b\u000bt\u0000y\u0000p\u0000e\u0000o\u0000f\u0000A\t\u000b\u0007v\u0000o\u0000i\u0000d\u0000A\t\u000b\ty\u0000i\u0000e\u0000l\u0000d\u0000A¨\t\u000b\u0003/\u0000/\u0000A®\t\u000b\u0003/\u0000*\u0000A´\t\u000b=F\u0000a\u0000i\u0000l\u0000e\u0000d\u0000 \u0000t\u0000o\u0000 \u0000c\u0000o\u0000n\u0000s\u0000u\u0000m\u0000e\u0000 \u0000b\u0000l\u0000o\u0000c\u0000k\u0000 \u0000c\u0000o\u0000m\u0000m\u0000e\u0000n\u0000t\u0000Aô\t\u000b\u0003*\u0000/\u0000Aú\t\u000b\u0003$\u0000{\u0000A\n\u000bGT\u0000e\u0000m\u0000p\u0000l\u0000a\u0000t\u0000e\u0000 \u0000l\u0000i\u0000t\u0000e\u0000r\u0000a\u0000l\u0000 \u0000r\u0000e\u0000a\u0000c\u0000h\u0000e\u0000d\u0000 \u0000e\u0000n\u0000d\u0000 \u0000o\u0000f\u0000 \u0000c\u0000o\u0000d\u0000e\u0000AÊ\n\u000b5U\u0000n\u0000t\u0000e\u0000r\u0000m\u0000i\u0000n\u0000a\u0000t\u0000e\u0000d\u0000 \u0000s\u0000t\u0000r\u0000i\u0000n\u0000g\u0000 \u0000l\u0000i\u0000t\u0000e\u0000r\u0000a\u0000l\u0000A\u000b\u000b\u000bi\u0000m\u0000p\u0000o\u0000r\u0000t\u0000A\u000b\u000b\u0001.\u0000A\u000b\u000b\u000be\u0000x\u0000p\u0000o\u0000r\u0000t\u0000A¢\u000b\u000bMR\u0000e\u0000a\u0000c\u0000h\u0000e\u0000d\u0000 \u0000e\u0000n\u0000d\u0000 \u0000w\u0000i\u0000t\u0000h\u0000o\u0000u\u0000t\u0000 \u0000c\u0000l\u0000o\u0000s\u0000i\u0000n\u0000g\u0000 \u0000p\u0000a\u0000r\u0000e\u0000n\u0000t\u0000h\u0000e\u0000s\u0000i\u0000s\u0000Aò\u000b\u000bYE\u0000x\u0000p\u0000e\u0000c\u0000t\u0000e\u0000d\u0000 \u0000a\u0000 \u0000c\u0000h\u0000a\u0000r\u0000a\u0000c\u0000t\u0000e\u0000r\u0000 \u0000s\u0000e\u0000q\u0000u\u0000e\u0000n\u0000c\u0000e\u0000 \u0000b\u0000u\u0000t\u0000 \u0000g\u0000o\u0000t\u0000 \u0000n\u0000o\u0000t\u0000h\u0000i\u0000n\u0000g\u0000AÎ\f\u000b\tc\u0000o\u0000n\u0000s\u0000t\u0000AÚ\f\u000b\u0005l\u0000e\u0000t\u0000Aâ\f\u000b\u0005v\u0000a\u0000r\u0000Aê\f\u000b\ta\u0000s\u0000y\u0000n\u0000c\u0000Aö\f\u000b\u000ff\u0000u\u0000n\u0000c\u0000t\u0000i\u0000o\u0000n\u0000A\r\u000b\tc\u0000l\u0000a\u0000s\u0000s\u0000A\r\u000b\u0007f\u0000r\u0000o\u0000m\u0000A\r\u000b\rd\u0000e\u0000f\u0000a\u0000u\u0000l\u0000t\u0000A®\r\u000b\u001bI\u0000n\u0000v\u0000a\u0000l\u0000i\u0000d\u0000 \u0000e\u0000x\u0000p\u0000o\u0000r\u0000t\u0000AÌ\r\u000b)U\u0000n\u0000c\u0000l\u0000o\u0000s\u0000e\u0000d\u0000 \u0000n\u0000a\u0000m\u0000e\u0000d\u0000 \u0000e\u0000x\u0000p\u0000o\u0000r\u0000t\u0000Aú\r\u000b\re\u0000x\u0000t\u0000e\u0000n\u0000d\u0000s\u0000A\u000e\u000b\u0007m\u0000e\u0000t\u0000a\u0000A\u000e\u000bai\u0000m\u0000p\u0000o\u0000r\u0000t\u0000.\u0000m\u0000e\u0000t\u0000a\u0000 \u0000i\u0000s\u0000 \u0000o\u0000n\u0000l\u0000y\u0000 \u0000i\u0000m\u0000p\u0000o\u0000r\u0000t\u0000 \u0000m\u0000e\u0000t\u0000a\u0000p\u0000r\u0000o\u0000p\u0000e\u0000r\u0000t\u0000y\u0000 \u0000s\u0000u\u0000p\u0000p\u0000o\u0000r\u0000t\u0000e\u0000d\u0000Aø\u000e\u000bIU\u0000n\u0000e\u0000x\u0000p\u0000e\u0000c\u0000t\u0000e\u0000d\u0000 \u0000t\u0000o\u0000k\u0000e\u0000n\u0000 \u0000a\u0000f\u0000t\u0000e\u0000r\u0000 \u0000d\u0000e\u0000f\u0000a\u0000u\u0000l\u0000t\u0000 \u0000i\u0000m\u0000p\u0000o\u0000r\u0000t\u0000AÄ\u000f\u000b)U\u0000n\u0000c\u0000l\u0000o\u0000s\u0000e\u0000d\u0000 \u0000n\u0000a\u0000m\u0000e\u0000d\u0000 \u0000i\u0000m\u0000p\u0000o\u0000r\u0000t\u0000Að\u000f\u000b\u0001;\u0000Aô\u000f\u000b\u0001)\u0000Aø\u000f\u000b\rf\u0000i\u0000n\u0000a\u0000l\u0000l\u0000y\u0000A\u0010\u000b\u0003i\u0000f\u0000A\u0010\u000b\u0005f\u0000o\u0000r\u0000A\u0010\u000b\tw\u0000h\u0000i\u0000l\u0000e\u0000A¦\u0010\u000b=U\u0000n\u0000t\u0000e\u0000r\u0000m\u0000i\u0000n\u0000a\u0000t\u0000e\u0000d\u0000 \u0000R\u0000e\u0000g\u0000u\u0000l\u0000a\u0000r\u0000 \u0000E\u0000x\u0000p\u0000r\u0000e\u0000s\u0000s\u0000i\u0000o\u0000n\u0000Aæ\u0010\u000b7U\u0000n\u0000t\u0000e\u0000r\u0000m\u0000i\u0000n\u0000a\u0000t\u0000e\u0000d\u0000 \u0000C\u0000h\u0000a\u0000r\u0000a\u0000c\u0000t\u0000e\u0000r\u0000 \u0000C\u0000l\u0000a\u0000s\u0000s"));
function decodeString(byteString) {
    return new Uint8Array(Array.from(byteString).map((i) => i.charCodeAt(0))).buffer;
}
async function parse(code) {
    const imports = [];
    const importMetas = [];
    const dynamicImports = [];
    const exports = [];
    let openImport = null;
    let openExport = null;
    const parserModule = await parserModulePromise;
    const instance = await WebAssembly.instantiate(parserModule, {
        env: {
            syntaxError(start, length) {
                throw new SyntaxError(readString(start, length));
            },
            openImport(startPosition) {
                if (openImport) {
                    throw new Error("import statement already open");
                }
                openImport = {
                    startPosition,
                    imports: [],
                };
            },
            emitImportName(importNameStart, importNameLength, localNameStart, localNameLength) {
                if (!openImport) {
                    throw new Error("Emitted name without import");
                }
                openImport.imports.push({
                    importName: readName(importNameStart, importNameLength),
                    localName: readIdentifier(localNameStart, localNameLength),
                });
            },
            emitImportNamespace(localNameStart, localNameLength) {
                if (!openImport) {
                    throw new Error("Emitted name without import");
                }
                openImport.imports.push({
                    importName: NAMESPACE,
                    localName: readIdentifier(localNameStart, localNameLength),
                });
            },
            finalizeImport(endPosition, specifierStart, specifierLength) {
                if (!openImport) {
                    throw new Error("Emitted import without opening");
                }
                imports.push({
                    startPosition: openImport.startPosition,
                    endPosition,
                    specifier: readStringLiteral(specifierStart, specifierLength),
                    imports: openImport.imports,
                });
                openImport = null;
            },
            emitImportMeta(startPosition, endPosition) {
                importMetas.push({ startPosition, endPosition });
            },
            emitDynamicImport(startPosition, endPosition, contentStartPosition, contentEndPosition) {
                dynamicImports.push({
                    startPosition,
                    endPosition,
                    contentStartPosition,
                    contentEndPosition,
                });
            },
            openExport(startPosition) {
                if (openExport) {
                    throw new Error("export statement already open");
                }
                openExport = {
                    startPosition,
                    exports: [],
                };
            },
            emitExportName(importNameStart, importNameLength, exportNameStart, exportNameLength) {
                if (!openExport) {
                    throw new Error("Emitted export name without opening");
                }
                openExport.exports.push({
                    importName: readName(importNameStart, importNameLength),
                    exportName: readName(exportNameStart, exportNameLength),
                });
            },
            emitExportNamespaceAsName(exportNameStart, exportNameLength) {
                if (!openExport) {
                    throw new Error("Emitted export name without opening");
                }
                openExport.exports.push({
                    importName: NAMESPACE,
                    exportName: readName(exportNameStart, exportNameLength),
                });
            },
            emitExportNamespace() {
                if (!openExport) {
                    throw new Error("Emitted export name without opening");
                }
                openExport.exports.push({
                    importName: NAMESPACE,
                    exportName: NAMESPACE,
                });
            },
            finalizeExport(endPosition) {
                if (!openExport) {
                    throw new Error("Emitted export without opening");
                }
                exports.push({
                    startPosition: openExport.startPosition,
                    endPosition,
                    specifier: null,
                    exports: openExport.exports,
                });
                openExport = null;
            },
            finalizeDelegatedExport(endPosition, specifierStart, specifierLength) {
                if (!openExport) {
                    throw new Error("Emitted export without opening");
                }
                exports.push({
                    startPosition: openExport.startPosition,
                    endPosition,
                    specifier: readStringLiteral(specifierStart, specifierLength),
                    exports: openExport.exports,
                });
                openExport = null;
            },
        },
    });
    function readString(start, length) {
        const characters = new Uint16Array(
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        instance.exports.memory.buffer, start, length);
        return [...characters]
            .map((ch) => String.fromCharCode(ch))
            .join("");
    }
    function readIdentifier(start, length) {
        const string = readString(start, length);
        return JSON.parse(`"${string}"`);
    }
    function readStringLiteral(start, length) {
        const stringLiteral = readString(start, length);
        const withQuotesReplaced = stringLiteral
            .slice(1, -1)
            .replace(/"/ug, `\\"`);
        return JSON.parse(`"${withQuotesReplaced}"`);
    }
    function readName(start, length) {
        const string = readString(start, length);
        if (string.startsWith(`'`) || string.startsWith(`"`)) {
            const withQuotesReplaced = string
                .slice(1, -1)
                .replace(/"/ug, `\\"`);
            return JSON.parse(`"${withQuotesReplaced}"`);
        }
        return JSON.parse(`"${string}"`);
    }
    const { memory, parse } = instance.exports;
    const initialPage = memory.grow(Math.ceil(code.length / PAGE_SIZE * Uint16Array.BYTES_PER_ELEMENT));
    const characterArray = new Uint16Array(memory.buffer, initialPage * PAGE_SIZE, code.length);
    for (let i = 0; i < code.length; i += 1) {
        characterArray[i] = code[i].charCodeAt(0);
    }
    parse(initialPage * PAGE_SIZE, code.length);
    return {
        imports,
        importMetas,
        dynamicImports,
        exports,
    };
}

var __classPrivateFieldGet$5 = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet$5 = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _source, _localExportEntries, _indirectExportEntries$1, _starExportEntries, _moduleEvaluator, _getExportedNames$1, _resolveExport$1;
class SourceTextModule extends CyclicModule {
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
            getExportedNames: (...args) => __classPrivateFieldGet$5(this, _getExportedNames$1).call(this, ...args),
            resolveExport: (...args) => __classPrivateFieldGet$5(this, _resolveExport$1).call(this, ...args),
        });
        _source.set(this, void 0);
        _localExportEntries.set(this, void 0);
        _indirectExportEntries$1.set(this, void 0);
        _starExportEntries.set(this, void 0);
        _moduleEvaluator.set(this, void 0);
        _getExportedNames$1.set(this, (exportStarSet) => {
            const linkedModules = CyclicModule.linkedModules(this);
            if (exportStarSet.has(this)) {
                return [];
            }
            exportStarSet.add(this);
            const exportedNames = new Set();
            for (const exportEntry of __classPrivateFieldGet$5(this, _localExportEntries)) {
                exportedNames.add(exportEntry.exportName);
            }
            for (const exportEntry of __classPrivateFieldGet$5(this, _indirectExportEntries$1)) {
                exportedNames.add(exportEntry.exportName);
            }
            for (const exportEntry of __classPrivateFieldGet$5(this, _starExportEntries)) {
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
        _resolveExport$1.set(this, (exportName, resolveSet = []) => {
            const linkedModules = CyclicModule.linkedModules(this);
            for (const record of resolveSet) {
                if (record.module === this && record.exportName === exportName) {
                    return null;
                }
            }
            resolveSet.push({ module: this, exportName });
            for (const exportEntry of __classPrivateFieldGet$5(this, _localExportEntries)) {
                if (exportEntry.exportName === exportName) {
                    return {
                        module: this,
                        bindingName: exportEntry.localName,
                        getBinding: __classPrivateFieldGet$5(this, _moduleEvaluator).getLocalBinding(exportEntry.exportName),
                    };
                }
            }
            for (const exportEntry of __classPrivateFieldGet$5(this, _indirectExportEntries$1)) {
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
            for (const exportEntry of __classPrivateFieldGet$5(this, _starExportEntries)) {
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
        __classPrivateFieldSet$5(this, _source, source);
        __classPrivateFieldSet$5(this, _localExportEntries, localExportEntries);
        __classPrivateFieldSet$5(this, _indirectExportEntries$1, indirectExportEntries);
        __classPrivateFieldSet$5(this, _starExportEntries, starExportEntries);
        __classPrivateFieldSet$5(this, _moduleEvaluator, moduleEvaluator);
        Object.freeze(this);
    }
    static isSourceTextModule(value) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            __classPrivateFieldGet$5(value, _source);
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
        return __classPrivateFieldGet$5(this, _source);
    }
}
_source = new WeakMap(), _localExportEntries = new WeakMap(), _indirectExportEntries$1 = new WeakMap(), _starExportEntries = new WeakMap(), _moduleEvaluator = new WeakMap(), _getExportedNames$1 = new WeakMap(), _resolveExport$1 = new WeakMap();
Object.freeze(SourceTextModule);
Object.freeze(SourceTextModule.prototype);

exports.CyclicModule = CyclicModule;
exports.Module = Module;
exports.SourceTextModule = SourceTextModule;
//# sourceMappingURL=module-shim.cjs.map
