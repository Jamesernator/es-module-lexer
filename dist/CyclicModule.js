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
var _resolve, _reject, _promise, _requestedModules, _initializeEnvironment, _executeModule, _resolveModule, _async, _linkedModules, _linkedModulesView, _evaluationError, _topLevelCapability, _status, _linkRequiredModule, _finalizeLinking, _innerModuleLinking, _link, _getAsyncCycleRoot, _onDependencyFinishedSuccessfully, _asyncModuleExecutionFulfilled, _asyncModuleExectionRejected, _executeAsyncModule, _executeOtherModule, _executeRequiredModule, _finalizeEvaluation, _innerModuleEvaluation, _evaluate;
import Module from "./Module.js";
import ReadonlyMap from "./ReadonlyMap.js";
import assert from "./assert.js";
class PromiseCapability {
    constructor() {
        _resolve.set(this, void 0);
        _reject.set(this, void 0);
        _promise.set(this, new Promise((resolve, reject) => {
            __classPrivateFieldSet(this, _resolve, resolve);
            __classPrivateFieldSet(this, _reject, reject);
        }));
    }
    get resolve() {
        return __classPrivateFieldGet(this, _resolve);
    }
    get reject() {
        return __classPrivateFieldGet(this, _reject);
    }
    get promise() {
        return __classPrivateFieldGet(this, _promise);
    }
}
_resolve = new WeakMap(), _reject = new WeakMap(), _promise = new WeakMap();
export default class CyclicModule extends Module {
    constructor({ async, requestedModules, initializeEnvironment, executeModule, resolveModule, resolveExport, getExportedNames, }) {
        super({
            link: () => __classPrivateFieldGet(this, _link).call(this),
            evaluate: () => __classPrivateFieldGet(this, _evaluate).call(this),
            getExportedNames: (exportStarSet) => {
                if (__classPrivateFieldGet(this, _status).name === "unlinked") {
                    throw new Error("can't get exported names before linking");
                }
                return getExportedNames(exportStarSet);
            },
            resolveExport: (exportName, resolveSet) => {
                if (__classPrivateFieldGet(this, _status).name === "unlinked") {
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
        _linkedModulesView.set(this, new ReadonlyMap(__classPrivateFieldGet(this, _linkedModules)));
        _evaluationError.set(this, void 0);
        _topLevelCapability.set(this, void 0);
        _status.set(this, { name: "unlinked" });
        _linkRequiredModule.set(this, async (requiredSpecifier, stack, index) => {
            assert(__classPrivateFieldGet(this, _status).name === "linking");
            const requiredModule = await CyclicModule.resolveModule(this, requiredSpecifier);
            if (CyclicModule.isCyclicModule(requiredModule)) {
                index = await __classPrivateFieldGet(requiredModule, _innerModuleLinking).call(requiredModule, stack, index);
                assert(__classPrivateFieldGet(requiredModule, _status).name === "linking"
                    || __classPrivateFieldGet(requiredModule, _status).name === "linked"
                    || __classPrivateFieldGet(requiredModule, _status).name === "evaluated");
                if (__classPrivateFieldGet(requiredModule, _status).name === "linking") {
                    assert(stack.includes(requiredModule));
                    __classPrivateFieldGet(this, _status).dfsAncestorIndex = Math.min(__classPrivateFieldGet(this, _status).dfsAncestorIndex, __classPrivateFieldGet(requiredModule, _status).dfsAncestorIndex);
                }
            }
            else {
                await requiredModule.link();
            }
            return index;
        });
        _finalizeLinking.set(this, (stack) => {
            assert(__classPrivateFieldGet(this, _status).name === "linking");
            if (__classPrivateFieldGet(this, _status).dfsAncestorIndex === __classPrivateFieldGet(this, _status).dfsIndex) {
                let done = false;
                while (!done) {
                    const requiredModule = stack.pop();
                    __classPrivateFieldSet(requiredModule, _status, { name: "linked" });
                    if (requiredModule === this) {
                        done = true;
                    }
                }
            }
        });
        _innerModuleLinking.set(this, async (stack, index) => {
            if (__classPrivateFieldGet(this, _status).name === "linking"
                || __classPrivateFieldGet(this, _status).name === "linked"
                || __classPrivateFieldGet(this, _status).name === "evaluated") {
                return index;
            }
            assert(__classPrivateFieldGet(this, _status).name === "unlinked");
            __classPrivateFieldSet(this, _status, {
                name: "linking",
                dfsIndex: index,
                dfsAncestorIndex: index,
            });
            index += 1;
            stack.push(this);
            for (const required of __classPrivateFieldGet(this, _requestedModules)) {
                await __classPrivateFieldGet(this, _linkRequiredModule).call(this, required, stack, index);
            }
            __classPrivateFieldGet(this, _initializeEnvironment).call(this);
            __classPrivateFieldGet(this, _finalizeLinking).call(this, stack);
            return index;
        });
        _link.set(this, async () => {
            if (__classPrivateFieldGet(this, _status).name === "linking") {
                throw new TypeError("module can't be linked again during linking");
            }
            if (__classPrivateFieldGet(this, _status).name === "evaluating") {
                throw new TypeError("module can't be linked during evaluation");
            }
            if (__classPrivateFieldGet(this, _status).name !== "unlinked") {
                return;
            }
            const stack = [];
            try {
                await __classPrivateFieldGet(this, _innerModuleLinking).call(this, stack, 0);
            }
            catch (error) {
                for (const module of stack) {
                    assert(__classPrivateFieldGet(module, _status).name === "linking");
                    __classPrivateFieldSet(module, _status, { name: "unlinked" });
                    __classPrivateFieldGet(module, _linkedModules).clear();
                }
                assert(__classPrivateFieldGet(this, _status).name === "unlinked");
                throw error;
            }
            assert(stack.length === 0);
        });
        _getAsyncCycleRoot.set(this, (module) => {
            if (__classPrivateFieldGet(module, _status).name !== "evaluated") {
                throw new Error("Should only get async cycle root after evaluation");
            }
            if (__classPrivateFieldGet(module, _status).asyncParentModules.length === 0) {
                return module;
            }
            while (__classPrivateFieldGet(module, _status).dfsIndex > __classPrivateFieldGet(module, _status).dfsAncestorIndex) {
                assert(__classPrivateFieldGet(module, _status).asyncParentModules.length > 0);
                const nextCycleModule = __classPrivateFieldGet(module, _status).asyncParentModules[0];
                assert(__classPrivateFieldGet(nextCycleModule, _status).name === "evaluating"
                    || __classPrivateFieldGet(nextCycleModule, _status).name === "evaluated");
                assert(__classPrivateFieldGet(nextCycleModule, _status).dfsAncestorIndex
                    <= __classPrivateFieldGet(module, _status).dfsAncestorIndex);
                module = nextCycleModule;
                assert(__classPrivateFieldGet(module, _status).name === "evaluating"
                    || __classPrivateFieldGet(module, _status).name === "evaluated");
            }
            assert(__classPrivateFieldGet(module, _status).dfsIndex === __classPrivateFieldGet(module, _status).dfsAncestorIndex);
            return module;
        });
        _onDependencyFinishedSuccessfully.set(this, () => {
            assert(__classPrivateFieldGet(this, _status).name === "evaluating"
                || __classPrivateFieldGet(this, _status).name === "evaluated");
            __classPrivateFieldGet(this, _status).pendingAsyncDependencies -= 1;
            if (__classPrivateFieldGet(this, _status).pendingAsyncDependencies === 0
                && __classPrivateFieldGet(this, _evaluationError) === undefined) {
                assert(__classPrivateFieldGet(this, _status).asyncEvaluating);
                const cycleRoot = __classPrivateFieldGet(this, _getAsyncCycleRoot).call(this, this);
                if (__classPrivateFieldGet(cycleRoot, _evaluationError)) {
                    return;
                }
                if (__classPrivateFieldGet(this, _async)) {
                    void __classPrivateFieldGet(this, _executeAsyncModule).call(this);
                }
                else {
                    try {
                        const value = __classPrivateFieldGet(this, _executeModule).call(this);
                        assert(value === undefined, "synchronous executeModule must not return a value");
                        __classPrivateFieldGet(this, _asyncModuleExecutionFulfilled).call(this);
                    }
                    catch (error) {
                        __classPrivateFieldGet(this, _asyncModuleExectionRejected).call(this, error);
                    }
                }
            }
        });
        _asyncModuleExecutionFulfilled.set(this, () => {
            assert(__classPrivateFieldGet(this, _status).name === "evaluated");
            if (!__classPrivateFieldGet(this, _status).asyncEvaluating) {
                assert(__classPrivateFieldGet(this, _evaluationError) !== undefined);
                return;
            }
            assert(__classPrivateFieldGet(this, _evaluationError) === undefined);
            __classPrivateFieldGet(this, _status).asyncEvaluating = false;
            for (const parent of __classPrivateFieldGet(this, _status).asyncParentModules) {
                __classPrivateFieldGet(parent, _onDependencyFinishedSuccessfully).call(parent);
            }
            if (__classPrivateFieldGet(this, _topLevelCapability)) {
                assert(__classPrivateFieldGet(this, _status).dfsIndex === __classPrivateFieldGet(this, _status).dfsAncestorIndex);
                __classPrivateFieldGet(this, _topLevelCapability).resolve();
            }
        });
        _asyncModuleExectionRejected.set(this, (error) => {
            assert(__classPrivateFieldGet(this, _status).name === "evaluated");
            if (!__classPrivateFieldGet(this, _status).asyncEvaluating) {
                assert(__classPrivateFieldGet(this, _evaluationError) !== undefined);
                return;
            }
            assert(__classPrivateFieldGet(this, _evaluationError) === undefined);
            __classPrivateFieldSet(this, _evaluationError, { error });
            __classPrivateFieldGet(this, _status).asyncEvaluating = false;
            for (const parent of __classPrivateFieldGet(this, _status).asyncParentModules) {
                __classPrivateFieldGet(parent, _asyncModuleExectionRejected).call(parent, error);
            }
            if (__classPrivateFieldGet(this, _topLevelCapability)) {
                assert(__classPrivateFieldGet(this, _status).dfsIndex === __classPrivateFieldGet(this, _status).dfsAncestorIndex);
                __classPrivateFieldGet(this, _topLevelCapability).reject(error);
            }
        });
        _executeAsyncModule.set(this, async () => {
            assert(__classPrivateFieldGet(this, _status).name === "evaluating"
                || __classPrivateFieldGet(this, _status).name === "evaluated");
            assert(__classPrivateFieldGet(this, _async));
            __classPrivateFieldGet(this, _status).asyncEvaluating = true;
            try {
                await __classPrivateFieldGet(this, _executeModule).call(this);
                __classPrivateFieldGet(this, _asyncModuleExecutionFulfilled).call(this);
            }
            catch (error) {
                __classPrivateFieldGet(this, _asyncModuleExectionRejected).call(this, error);
            }
        });
        _executeOtherModule.set(this, async (module) => {
            try {
                await module.evaluate();
                __classPrivateFieldGet(this, _onDependencyFinishedSuccessfully).call(this);
            }
            catch (error) {
                __classPrivateFieldGet(this, _asyncModuleExectionRejected).call(this, error);
            }
        });
        _executeRequiredModule.set(this, (requiredModule, stack, index) => {
            assert(__classPrivateFieldGet(this, _status).name === "evaluating");
            if (CyclicModule.isCyclicModule(requiredModule)) {
                index = __classPrivateFieldGet(requiredModule, _innerModuleEvaluation).call(requiredModule, stack, index);
                assert(__classPrivateFieldGet(requiredModule, _status).name === "evaluating"
                    || __classPrivateFieldGet(requiredModule, _status).name === "evaluated");
                if (__classPrivateFieldGet(requiredModule, _status).name === "evaluating") {
                    assert(stack.includes(requiredModule));
                }
                if (__classPrivateFieldGet(requiredModule, _status).name === "evaluating") {
                    __classPrivateFieldGet(this, _status).dfsAncestorIndex = Math.min(__classPrivateFieldGet(requiredModule, _status).dfsAncestorIndex, __classPrivateFieldGet(requiredModule, _status).dfsAncestorIndex);
                }
                else if (__classPrivateFieldGet(requiredModule, _evaluationError)) {
                    const rootModule = __classPrivateFieldGet(this, _getAsyncCycleRoot).call(this, requiredModule);
                    assert(__classPrivateFieldGet(rootModule, _status).name === "evaluated");
                    if (__classPrivateFieldGet(rootModule, _evaluationError)) {
                        throw __classPrivateFieldGet(rootModule, _evaluationError).error;
                    }
                }
                if (__classPrivateFieldGet(requiredModule, _status).asyncEvaluating) {
                    __classPrivateFieldGet(this, _status).pendingAsyncDependencies += 1;
                    __classPrivateFieldGet(requiredModule, _status).asyncParentModules.push(this);
                }
            }
            else {
                __classPrivateFieldGet(this, _status).pendingAsyncDependencies += 1;
                void __classPrivateFieldGet(this, _executeOtherModule).call(this, requiredModule);
            }
            return index;
        });
        _finalizeEvaluation.set(this, (stack) => {
            assert(__classPrivateFieldGet(this, _status).name === "evaluating");
            if (__classPrivateFieldGet(this, _status).dfsAncestorIndex === __classPrivateFieldGet(this, _status).dfsIndex) {
                let done = false;
                while (!done) {
                    const requiredModule = stack.pop();
                    assert(__classPrivateFieldGet(requiredModule, _status).name === "evaluating");
                    __classPrivateFieldSet(requiredModule, _status, {
                        name: "evaluated",
                        dfsIndex: __classPrivateFieldGet(requiredModule, _status).dfsIndex,
                        dfsAncestorIndex: __classPrivateFieldGet(requiredModule, _status).dfsAncestorIndex,
                        asyncParentModules: __classPrivateFieldGet(requiredModule, _status).asyncParentModules,
                        asyncEvaluating: __classPrivateFieldGet(requiredModule, _status).asyncEvaluating,
                        pendingAsyncDependencies: __classPrivateFieldGet(requiredModule, _status).pendingAsyncDependencies,
                    });
                    done = requiredModule === this;
                }
            }
        });
        _innerModuleEvaluation.set(this, (stack, index) => {
            if (__classPrivateFieldGet(this, _status).name === "evaluated") {
                if (__classPrivateFieldGet(this, _evaluationError)) {
                    throw __classPrivateFieldGet(this, _evaluationError).error;
                }
                return index;
            }
            if (__classPrivateFieldGet(this, _status).name === "evaluating") {
                return index;
            }
            assert(__classPrivateFieldGet(this, _status).name === "linked");
            __classPrivateFieldSet(this, _status, {
                name: "evaluating",
                dfsIndex: index,
                dfsAncestorIndex: index,
                pendingAsyncDependencies: 0,
                asyncParentModules: [],
                asyncEvaluating: false,
            });
            index += 1;
            stack.push(this);
            for (const required of __classPrivateFieldGet(this, _requestedModules)) {
                const requiredModule = __classPrivateFieldGet(this, _linkedModules).get(required);
                assert(requiredModule !== undefined);
                index = __classPrivateFieldGet(this, _executeRequiredModule).call(this, requiredModule, stack, index);
            }
            if (__classPrivateFieldGet(this, _status).pendingAsyncDependencies > 0) {
                __classPrivateFieldGet(this, _status).asyncEvaluating = true;
            }
            else if (__classPrivateFieldGet(this, _async)) {
                void __classPrivateFieldGet(this, _executeAsyncModule).call(this);
            }
            else {
                const value = __classPrivateFieldGet(this, _executeModule).call(this);
                assert(value === undefined, "executeModule for a synchronous module must not return a value");
            }
            __classPrivateFieldGet(this, _finalizeEvaluation).call(this, stack);
            return index;
        });
        _evaluate.set(this, () => {
            assert(__classPrivateFieldGet(this, _status).name === "linked"
                || __classPrivateFieldGet(this, _status).name === "evaluated");
            const module = __classPrivateFieldGet(this, _status).name === "evaluated"
                ? __classPrivateFieldGet(this, _getAsyncCycleRoot).call(this, this)
                : this;
            if (__classPrivateFieldGet(module, _topLevelCapability)) {
                return __classPrivateFieldGet(module, _topLevelCapability).promise;
            }
            const stack = [];
            const capability = new PromiseCapability();
            __classPrivateFieldSet(module, _topLevelCapability, capability);
            try {
                __classPrivateFieldGet(this, _innerModuleEvaluation).call(this, stack, 0);
                assert(__classPrivateFieldGet(module, _status).name === "evaluated");
                assert(__classPrivateFieldGet(module, _evaluationError) === undefined);
                if (!__classPrivateFieldGet(module, _status).asyncEvaluating) {
                    capability.resolve(undefined);
                }
            }
            catch (error) {
                for (const module of stack) {
                    assert(__classPrivateFieldGet(module, _status).name === "evaluating");
                    __classPrivateFieldSet(module, _status, {
                        name: "evaluated",
                        dfsIndex: __classPrivateFieldGet(module, _status).dfsIndex,
                        dfsAncestorIndex: __classPrivateFieldGet(module, _status).dfsAncestorIndex,
                        asyncEvaluating: __classPrivateFieldGet(module, _status).asyncEvaluating,
                        asyncParentModules: __classPrivateFieldGet(module, _status).asyncParentModules,
                        pendingAsyncDependencies: __classPrivateFieldGet(module, _status).pendingAsyncDependencies,
                    });
                }
                capability.reject(error);
            }
            return capability.promise;
        });
        __classPrivateFieldSet(this, _async, async);
        if (!Array.isArray(requestedModules)) {
            throw new TypeError("requestedModules must be a list of strings");
        }
        __classPrivateFieldSet(this, _requestedModules, Object.freeze([...new Set(requestedModules)]));
        if (__classPrivateFieldGet(this, _requestedModules).some((i) => typeof i !== "string")) {
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
        __classPrivateFieldSet(this, _initializeEnvironment, initializeEnvironment);
        __classPrivateFieldSet(this, _executeModule, executeModule);
        __classPrivateFieldSet(this, _resolveModule, resolveModule);
        Object.freeze(this);
    }
    static isCyclicModule(value) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            __classPrivateFieldGet(value, _requestedModules);
            return true;
        }
        catch {
            return false;
        }
    }
    static linkedModules(cyclicModule) {
        return __classPrivateFieldGet(cyclicModule, _linkedModulesView);
    }
    static async resolveModule(cyclicModule, specifier) {
        const alreadyLinkedModule = __classPrivateFieldGet(cyclicModule, _linkedModules).get(specifier);
        if (alreadyLinkedModule) {
            return alreadyLinkedModule;
        }
        const linkedModule = await __classPrivateFieldGet(cyclicModule, _resolveModule).call(cyclicModule, specifier, cyclicModule);
        if (__classPrivateFieldGet(cyclicModule, _linkedModules).has(specifier)
            && __classPrivateFieldGet(cyclicModule, _linkedModules).get(specifier) !== linkedModule) {
            throw new Error("cyclic module has already resolved successfully");
        }
        __classPrivateFieldGet(cyclicModule, _linkedModules).set(specifier, linkedModule);
        return linkedModule;
    }
    get async() {
        return __classPrivateFieldGet(this, _async);
    }
    get linkedModules() {
        return __classPrivateFieldGet(this, _linkedModulesView);
    }
    get requestedModules() {
        return __classPrivateFieldGet(this, _requestedModules);
    }
    get status() {
        return __classPrivateFieldGet(this, _status).name;
    }
    async resolveModule(specifier) {
        return await CyclicModule.resolveModule(this, specifier);
    }
}
_requestedModules = new WeakMap(), _initializeEnvironment = new WeakMap(), _executeModule = new WeakMap(), _resolveModule = new WeakMap(), _async = new WeakMap(), _linkedModules = new WeakMap(), _linkedModulesView = new WeakMap(), _evaluationError = new WeakMap(), _topLevelCapability = new WeakMap(), _status = new WeakMap(), _linkRequiredModule = new WeakMap(), _finalizeLinking = new WeakMap(), _innerModuleLinking = new WeakMap(), _link = new WeakMap(), _getAsyncCycleRoot = new WeakMap(), _onDependencyFinishedSuccessfully = new WeakMap(), _asyncModuleExecutionFulfilled = new WeakMap(), _asyncModuleExectionRejected = new WeakMap(), _executeAsyncModule = new WeakMap(), _executeOtherModule = new WeakMap(), _executeRequiredModule = new WeakMap(), _finalizeEvaluation = new WeakMap(), _innerModuleEvaluation = new WeakMap(), _evaluate = new WeakMap();
Object.freeze(CyclicModule);
Object.freeze(CyclicModule.prototype);
//# sourceMappingURL=CyclicModule.js.map