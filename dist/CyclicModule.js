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
var _PromiseCapability_resolve, _PromiseCapability_reject, _PromiseCapability_promise, _CyclicModule_instances, _a, _CyclicModule_innerModuleLinking, _CyclicModule_innerModuleEvaluation, _CyclicModule_executeAsyncModule, _CyclicModule_gatherAsyncParentCompletions, _CyclicModule_asyncModuleExecutionFulfilled, _CyclicModule_asyncModuleExecutionRejected, _CyclicModule_requestedModules, _CyclicModule_initializeEnvironment, _CyclicModule_executeModule, _CyclicModule_resolveModule, _CyclicModule_async, _CyclicModule_linkedModules, _CyclicModule_linkedModulesView, _CyclicModule_evaluationError, _CyclicModule_topLevelCapability, _CyclicModule_status, _CyclicModule_link, _CyclicModule_evaluate;
import Module from "./Module.js";
import ReadonlyMap from "./ReadonlyMap.js";
import assert from "./assert.js";
async function promiseTry(func) {
    return await func();
}
class PromiseCapability {
    constructor() {
        _PromiseCapability_resolve.set(this, void 0);
        _PromiseCapability_reject.set(this, void 0);
        _PromiseCapability_promise.set(this, new Promise((resolve, reject) => {
            __classPrivateFieldSet(this, _PromiseCapability_resolve, resolve, "f");
            __classPrivateFieldSet(this, _PromiseCapability_reject, reject, "f");
        }));
    }
    get resolve() {
        return __classPrivateFieldGet(this, _PromiseCapability_resolve, "f");
    }
    get reject() {
        return __classPrivateFieldGet(this, _PromiseCapability_reject, "f");
    }
    get promise() {
        return __classPrivateFieldGet(this, _PromiseCapability_promise, "f");
    }
}
_PromiseCapability_resolve = new WeakMap(), _PromiseCapability_reject = new WeakMap(), _PromiseCapability_promise = new WeakMap();
let asyncEvaluatingId = 0;
export default class CyclicModule extends Module {
    constructor({ async, requestedModules, initializeEnvironment, executeModule, resolveModule, resolveExport, getExportedNames, }) {
        super({
            link: () => __classPrivateFieldGet(this, _CyclicModule_instances, "m", _CyclicModule_link).call(this),
            evaluate: () => __classPrivateFieldGet(this, _CyclicModule_instances, "m", _CyclicModule_evaluate).call(this),
            getExportedNames: (exportStarSet) => {
                if (__classPrivateFieldGet(this, _CyclicModule_status, "f").name === "unlinked") {
                    throw new Error("can't get exported names before linking");
                }
                return getExportedNames(exportStarSet);
            },
            resolveExport: (exportName, resolveSet) => {
                if (__classPrivateFieldGet(this, _CyclicModule_status, "f").name === "unlinked") {
                    throw new Error("can't resolve export before linking");
                }
                return resolveExport(exportName, resolveSet);
            },
        });
        _CyclicModule_instances.add(this);
        _CyclicModule_requestedModules.set(this, void 0);
        _CyclicModule_initializeEnvironment.set(this, void 0);
        _CyclicModule_executeModule.set(this, void 0);
        _CyclicModule_resolveModule.set(this, void 0);
        _CyclicModule_async.set(this, void 0);
        _CyclicModule_linkedModules.set(this, new Map());
        _CyclicModule_linkedModulesView.set(this, new ReadonlyMap(__classPrivateFieldGet(this, _CyclicModule_linkedModules, "f")));
        _CyclicModule_evaluationError.set(this, void 0);
        _CyclicModule_topLevelCapability.set(this, void 0);
        _CyclicModule_status.set(this, { name: "unlinked" });
        __classPrivateFieldSet(this, _CyclicModule_async, async, "f");
        if (!Array.isArray(requestedModules)) {
            throw new TypeError("requestedModules must be a list of strings");
        }
        __classPrivateFieldSet(this, _CyclicModule_requestedModules, Object.freeze([...new Set(requestedModules)]), "f");
        if (__classPrivateFieldGet(this, _CyclicModule_requestedModules, "f").some((i) => typeof i !== "string")) {
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
        __classPrivateFieldSet(this, _CyclicModule_initializeEnvironment, initializeEnvironment, "f");
        __classPrivateFieldSet(this, _CyclicModule_executeModule, executeModule, "f");
        __classPrivateFieldSet(this, _CyclicModule_resolveModule, resolveModule, "f");
        Object.freeze(this);
    }
    static isCyclicModule(value) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            __classPrivateFieldGet(value, _CyclicModule_requestedModules, "f");
            return true;
        }
        catch {
            return false;
        }
    }
    static linkedModules(cyclicModule) {
        return __classPrivateFieldGet(cyclicModule, _CyclicModule_linkedModulesView, "f");
    }
    static async resolveModule(cyclicModule, specifier) {
        const alreadyLinkedModule = __classPrivateFieldGet(cyclicModule, _CyclicModule_linkedModules, "f")
            .get(specifier);
        if (alreadyLinkedModule) {
            return alreadyLinkedModule;
        }
        const linkedModule = await __classPrivateFieldGet(cyclicModule, _CyclicModule_resolveModule, "f").call(cyclicModule, specifier, cyclicModule);
        if (__classPrivateFieldGet(cyclicModule, _CyclicModule_linkedModules, "f").has(specifier)
            && __classPrivateFieldGet(cyclicModule, _CyclicModule_linkedModules, "f").get(specifier) !== linkedModule) {
            throw new Error("cyclic module has already resolved successfully");
        }
        __classPrivateFieldGet(cyclicModule, _CyclicModule_linkedModules, "f").set(specifier, linkedModule);
        return linkedModule;
    }
    get async() {
        return __classPrivateFieldGet(this, _CyclicModule_async, "f");
    }
    get linkedModules() {
        return __classPrivateFieldGet(this, _CyclicModule_linkedModulesView, "f");
    }
    get requestedModules() {
        return __classPrivateFieldGet(this, _CyclicModule_requestedModules, "f");
    }
    get status() {
        return __classPrivateFieldGet(this, _CyclicModule_status, "f").name;
    }
    async resolveModule(specifier) {
        return await CyclicModule.resolveModule(this, specifier);
    }
}
_a = CyclicModule, _CyclicModule_requestedModules = new WeakMap(), _CyclicModule_initializeEnvironment = new WeakMap(), _CyclicModule_executeModule = new WeakMap(), _CyclicModule_resolveModule = new WeakMap(), _CyclicModule_async = new WeakMap(), _CyclicModule_linkedModules = new WeakMap(), _CyclicModule_linkedModulesView = new WeakMap(), _CyclicModule_evaluationError = new WeakMap(), _CyclicModule_topLevelCapability = new WeakMap(), _CyclicModule_status = new WeakMap(), _CyclicModule_instances = new WeakSet(), _CyclicModule_innerModuleLinking = async function _CyclicModule_innerModuleLinking(module, stack, index) {
    if (!CyclicModule.isCyclicModule(module)) {
        await Module.link(module);
        return index;
    }
    if (__classPrivateFieldGet(module, _CyclicModule_status, "f").name === "linking"
        || __classPrivateFieldGet(module, _CyclicModule_status, "f").name === "linked"
        || __classPrivateFieldGet(module, _CyclicModule_status, "f").name === "evaluated") {
        return index;
    }
    assert(__classPrivateFieldGet(module, _CyclicModule_status, "f").name === "unlinked");
    __classPrivateFieldSet(module, _CyclicModule_status, {
        name: "linking",
        dfsAncestorIndex: index,
        dfsIndex: index,
    }, "f");
    index += 1;
    stack.push(module);
    for (const requiredModuleSpecifier of __classPrivateFieldGet(module, _CyclicModule_requestedModules, "f")) {
        const requiredModule = await CyclicModule.resolveModule(module, requiredModuleSpecifier);
        index = await __classPrivateFieldGet(CyclicModule, _a, "m", _CyclicModule_innerModuleLinking).call(CyclicModule, requiredModule, stack, index);
        if (CyclicModule.isCyclicModule(requiredModule)) {
            assert(__classPrivateFieldGet(requiredModule, _CyclicModule_status, "f").name === "linking"
                || __classPrivateFieldGet(requiredModule, _CyclicModule_status, "f").name === "linked"
                || __classPrivateFieldGet(requiredModule, _CyclicModule_status, "f").name === "evaluated");
            if (__classPrivateFieldGet(requiredModule, _CyclicModule_status, "f").name === "linking") {
                assert(stack.includes(requiredModule));
                // eslint-disable-next-line require-atomic-updates
                __classPrivateFieldGet(module, _CyclicModule_status, "f").dfsAncestorIndex = Math.min(__classPrivateFieldGet(module, _CyclicModule_status, "f").dfsAncestorIndex, __classPrivateFieldGet(requiredModule, _CyclicModule_status, "f").dfsAncestorIndex);
            }
            else {
                assert(!stack.includes(requiredModule));
            }
        }
    }
    __classPrivateFieldGet(module, _CyclicModule_initializeEnvironment, "f").call(module);
    assert(stack.filter((m) => m === module).length === 1);
    assert(__classPrivateFieldGet(module, _CyclicModule_status, "f").dfsAncestorIndex <= __classPrivateFieldGet(module, _CyclicModule_status, "f").dfsIndex);
    if (__classPrivateFieldGet(module, _CyclicModule_status, "f").dfsAncestorIndex === __classPrivateFieldGet(module, _CyclicModule_status, "f").dfsIndex) {
        let done = false;
        while (!done) {
            const requiredModule = stack.pop();
            assert(requiredModule !== undefined);
            __classPrivateFieldSet(requiredModule, _CyclicModule_status, { name: "linked" }, "f");
            if (module === requiredModule) {
                done = true;
            }
        }
    }
    return index;
}, _CyclicModule_innerModuleEvaluation = function _CyclicModule_innerModuleEvaluation(module, stack, index) {
    if (!CyclicModule.isCyclicModule(module)) {
        // TODO: Change this to work differently
        void module.evaluate();
        return index;
    }
    if (__classPrivateFieldGet(module, _CyclicModule_status, "f").name === "evaluated") {
        if (__classPrivateFieldGet(module, _CyclicModule_evaluationError, "f")) {
            throw __classPrivateFieldGet(module, _CyclicModule_evaluationError, "f").error;
        }
        return index;
    }
    if (__classPrivateFieldGet(module, _CyclicModule_status, "f").name === "evaluating") {
        return index;
    }
    assert(__classPrivateFieldGet(module, _CyclicModule_status, "f").name === "linked");
    __classPrivateFieldSet(module, _CyclicModule_status, {
        name: "evaluating",
        dfsAncestorIndex: index,
        dfsIndex: index,
        pendingAsyncDependencies: 0,
        asyncEvaluating: false,
        asyncEvaluatingId: -1,
        asyncParentModules: [],
    }, "f");
    index += 1;
    stack.push(module);
    for (const requestedModuleSpecifer of __classPrivateFieldGet(module, _CyclicModule_requestedModules, "f")) {
        let requiredModule = __classPrivateFieldGet(module, _CyclicModule_linkedModules, "f")
            .get(requestedModuleSpecifer);
        assert(requiredModule !== undefined);
        index = __classPrivateFieldGet(CyclicModule, _a, "m", _CyclicModule_innerModuleEvaluation).call(CyclicModule, requiredModule, stack, index);
        if (CyclicModule.isCyclicModule(requiredModule)) {
            assert(__classPrivateFieldGet(requiredModule, _CyclicModule_status, "f").name === "evaluating"
                || __classPrivateFieldGet(requiredModule, _CyclicModule_status, "f").name === "evaluated");
            if (__classPrivateFieldGet(requiredModule, _CyclicModule_status, "f").name === "evaluating") {
                assert(stack.includes(requiredModule));
            }
            else {
                assert(!stack.includes(requiredModule));
            }
            if (__classPrivateFieldGet(requiredModule, _CyclicModule_status, "f").name === "evaluating") {
                __classPrivateFieldGet(module, _CyclicModule_status, "f").dfsAncestorIndex = Math.min(__classPrivateFieldGet(module, _CyclicModule_status, "f").dfsAncestorIndex, __classPrivateFieldGet(requiredModule, _CyclicModule_status, "f").dfsAncestorIndex);
            }
            else {
                assert(__classPrivateFieldGet(requiredModule, _CyclicModule_status, "f").name === "evaluated");
                requiredModule = __classPrivateFieldGet(requiredModule, _CyclicModule_status, "f").cycleRoot;
                assert(CyclicModule.isCyclicModule(requiredModule));
                assert(__classPrivateFieldGet(requiredModule, _CyclicModule_status, "f").name === "evaluated");
            }
            if (__classPrivateFieldGet(requiredModule, _CyclicModule_status, "f").asyncEvaluating) {
                __classPrivateFieldGet(module, _CyclicModule_status, "f").pendingAsyncDependencies += 1;
                __classPrivateFieldGet(requiredModule, _CyclicModule_status, "f").asyncParentModules.push(module);
            }
        }
    }
    if (__classPrivateFieldGet(module, _CyclicModule_status, "f").pendingAsyncDependencies > 0 || __classPrivateFieldGet(module, _CyclicModule_async, "f")) {
        assert(!__classPrivateFieldGet(module, _CyclicModule_status, "f").asyncEvaluating);
        __classPrivateFieldGet(module, _CyclicModule_status, "f").asyncEvaluating = true;
        __classPrivateFieldGet(module, _CyclicModule_status, "f").asyncEvaluatingId = asyncEvaluatingId;
        asyncEvaluatingId += 1;
        if (__classPrivateFieldGet(module, _CyclicModule_status, "f").pendingAsyncDependencies === 0) {
            __classPrivateFieldGet(CyclicModule, _a, "m", _CyclicModule_executeAsyncModule).call(CyclicModule, module);
        }
    }
    else {
        void __classPrivateFieldGet(module, _CyclicModule_executeModule, "f").call(module);
    }
    assert(stack.filter((m) => m === module).length === 1);
    assert(__classPrivateFieldGet(module, _CyclicModule_status, "f").dfsAncestorIndex <= __classPrivateFieldGet(module, _CyclicModule_status, "f").dfsIndex);
    if (__classPrivateFieldGet(module, _CyclicModule_status, "f").dfsAncestorIndex === __classPrivateFieldGet(module, _CyclicModule_status, "f").dfsIndex) {
        const cycleRoot = module;
        let done = false;
        while (!done) {
            const requiredModule = stack.pop();
            assert(requiredModule !== undefined);
            assert(__classPrivateFieldGet(requiredModule, _CyclicModule_status, "f").name === "evaluating");
            __classPrivateFieldSet(requiredModule, _CyclicModule_status, {
                name: "evaluated",
                dfsIndex: __classPrivateFieldGet(requiredModule, _CyclicModule_status, "f").dfsIndex,
                dfsAncestorIndex: __classPrivateFieldGet(requiredModule, _CyclicModule_status, "f").dfsAncestorIndex,
                asyncEvaluating: __classPrivateFieldGet(requiredModule, _CyclicModule_status, "f").asyncEvaluating,
                asyncEvaluatingId: __classPrivateFieldGet(requiredModule, _CyclicModule_status, "f").asyncEvaluatingId,
                asyncParentModules: __classPrivateFieldGet(requiredModule, _CyclicModule_status, "f")
                    .asyncParentModules,
                pendingAsyncDependencies: __classPrivateFieldGet(requiredModule, _CyclicModule_status, "f")
                    .pendingAsyncDependencies,
                cycleRoot,
            }, "f");
            if (requiredModule === module) {
                done = true;
            }
        }
    }
    return index;
}, _CyclicModule_executeAsyncModule = function _CyclicModule_executeAsyncModule(module) {
    assert(__classPrivateFieldGet(module, _CyclicModule_status, "f").name === "evaluating"
        || __classPrivateFieldGet(module, _CyclicModule_status, "f").name === "evaluated");
    promiseTry(() => __classPrivateFieldGet(module, _CyclicModule_executeModule, "f").call(module)).then(() => __classPrivateFieldGet(CyclicModule, _a, "m", _CyclicModule_asyncModuleExecutionFulfilled).call(CyclicModule, module), (err) => {
        __classPrivateFieldGet(CyclicModule, _a, "m", _CyclicModule_asyncModuleExecutionRejected).call(CyclicModule, module, err);
    });
}, _CyclicModule_gatherAsyncParentCompletions = function _CyclicModule_gatherAsyncParentCompletions(module) {
    assert(__classPrivateFieldGet(module, _CyclicModule_status, "f").name === "evaluated");
    const execList = [];
    for (const m of __classPrivateFieldGet(module, _CyclicModule_status, "f").asyncParentModules) {
        assert(__classPrivateFieldGet(m, _CyclicModule_status, "f").name === "evaluated");
        if (!execList.includes(m)
            && __classPrivateFieldGet(__classPrivateFieldGet(m, _CyclicModule_status, "f").cycleRoot, _CyclicModule_evaluationError, "f") === undefined) {
            assert(__classPrivateFieldGet(m, _CyclicModule_evaluationError, "f") === undefined);
            assert(__classPrivateFieldGet(m, _CyclicModule_status, "f").asyncEvaluating);
            assert(__classPrivateFieldGet(m, _CyclicModule_status, "f").pendingAsyncDependencies > 0);
            __classPrivateFieldGet(m, _CyclicModule_status, "f").pendingAsyncDependencies -= 1;
            if (__classPrivateFieldGet(m, _CyclicModule_status, "f").pendingAsyncDependencies === 0) {
                execList.push(m);
                if (!__classPrivateFieldGet(m, _CyclicModule_async, "f")) {
                    execList.push(...__classPrivateFieldGet(CyclicModule, _a, "m", _CyclicModule_gatherAsyncParentCompletions).call(CyclicModule, m));
                }
            }
        }
    }
    return execList;
}, _CyclicModule_asyncModuleExecutionFulfilled = function _CyclicModule_asyncModuleExecutionFulfilled(module) {
    assert(__classPrivateFieldGet(module, _CyclicModule_status, "f").name === "evaluated");
    assert(__classPrivateFieldGet(module, _CyclicModule_evaluationError, "f") === undefined);
    if (__classPrivateFieldGet(module, _CyclicModule_topLevelCapability, "f")) {
        assert(module === __classPrivateFieldGet(module, _CyclicModule_status, "f").cycleRoot);
        __classPrivateFieldGet(module, _CyclicModule_topLevelCapability, "f").resolve();
    }
    const execList = __classPrivateFieldGet(CyclicModule, _a, "m", _CyclicModule_gatherAsyncParentCompletions).call(CyclicModule, module);
    execList.sort((a, b) => {
        assert(__classPrivateFieldGet(a, _CyclicModule_status, "f").name === "evaluated");
        assert(__classPrivateFieldGet(b, _CyclicModule_status, "f").name === "evaluated");
        return __classPrivateFieldGet(a, _CyclicModule_status, "f").asyncEvaluatingId - __classPrivateFieldGet(b, _CyclicModule_status, "f").asyncEvaluatingId;
    });
    assert(execList.every((m) => {
        return __classPrivateFieldGet(m, _CyclicModule_status, "f").name === "evaluated"
            && __classPrivateFieldGet(m, _CyclicModule_status, "f").asyncEvaluating
            && __classPrivateFieldGet(m, _CyclicModule_status, "f").pendingAsyncDependencies === 0
            && __classPrivateFieldGet(m, _CyclicModule_evaluationError, "f") === undefined;
    }));
    for (const m of execList) {
        assert(__classPrivateFieldGet(m, _CyclicModule_status, "f").name === "evaluated");
        if (__classPrivateFieldGet(m, _CyclicModule_async, "f")) {
            __classPrivateFieldGet(CyclicModule, _a, "m", _CyclicModule_executeAsyncModule).call(CyclicModule, m);
        }
        else {
            try {
                void __classPrivateFieldGet(m, _CyclicModule_executeModule, "f").call(m);
                __classPrivateFieldGet(m, _CyclicModule_status, "f").asyncEvaluating = false;
                if (__classPrivateFieldGet(m, _CyclicModule_topLevelCapability, "f")) {
                    assert(m === __classPrivateFieldGet(m, _CyclicModule_status, "f").cycleRoot);
                    __classPrivateFieldGet(m, _CyclicModule_topLevelCapability, "f").resolve();
                }
            }
            catch (error) {
                __classPrivateFieldGet(CyclicModule, _a, "m", _CyclicModule_asyncModuleExecutionRejected).call(CyclicModule, m, error);
            }
        }
    }
}, _CyclicModule_asyncModuleExecutionRejected = function _CyclicModule_asyncModuleExecutionRejected(module, error) {
    assert(__classPrivateFieldGet(module, _CyclicModule_status, "f").name === "evaluated");
    if (!__classPrivateFieldGet(module, _CyclicModule_status, "f").asyncEvaluating) {
        assert(__classPrivateFieldGet(module, _CyclicModule_evaluationError, "f") !== undefined);
        return;
    }
    assert(__classPrivateFieldGet(module, _CyclicModule_evaluationError, "f") === undefined);
    __classPrivateFieldSet(module, _CyclicModule_evaluationError, error, "f");
    __classPrivateFieldGet(module, _CyclicModule_status, "f").asyncEvaluating = false;
    for (const m of __classPrivateFieldGet(module, _CyclicModule_status, "f").asyncParentModules) {
        __classPrivateFieldGet(CyclicModule, _a, "m", _CyclicModule_asyncModuleExecutionRejected).call(CyclicModule, m, error);
    }
    if (__classPrivateFieldGet(module, _CyclicModule_topLevelCapability, "f")) {
        assert(module === __classPrivateFieldGet(module, _CyclicModule_status, "f").cycleRoot);
        __classPrivateFieldGet(module, _CyclicModule_topLevelCapability, "f").reject(error);
    }
}, _CyclicModule_link = async function _CyclicModule_link() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const module = this;
    assert(__classPrivateFieldGet(module, _CyclicModule_status, "f").name !== "linking"
        && __classPrivateFieldGet(module, _CyclicModule_status, "f").name !== "evaluating");
    const stack = [];
    try {
        await __classPrivateFieldGet(CyclicModule, _a, "m", _CyclicModule_innerModuleLinking).call(CyclicModule, module, stack, 0);
    }
    catch (err) {
        for (const m of stack) {
            assert(__classPrivateFieldGet(m, _CyclicModule_status, "f").name === "linking");
            __classPrivateFieldSet(m, _CyclicModule_status, { name: "unlinked" }, "f");
        }
        assert(__classPrivateFieldGet(module, _CyclicModule_status, "f").name === "unlinked");
        throw err;
    }
    assert(__classPrivateFieldGet(module, _CyclicModule_status, "f").name === "linked"
        || __classPrivateFieldGet(module, _CyclicModule_status, "f").name === "evaluated");
    assert(stack.length === 0);
}, _CyclicModule_evaluate = function _CyclicModule_evaluate() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let module = this;
    assert(__classPrivateFieldGet(module, _CyclicModule_status, "f").name === "linked"
        || __classPrivateFieldGet(this, _CyclicModule_status, "f").name === "evaluated");
    if (__classPrivateFieldGet(module, _CyclicModule_status, "f").name === "evaluated") {
        module = __classPrivateFieldGet(module, _CyclicModule_status, "f").cycleRoot;
    }
    if (__classPrivateFieldGet(module, _CyclicModule_topLevelCapability, "f")) {
        return __classPrivateFieldGet(module, _CyclicModule_topLevelCapability, "f").promise;
    }
    const stack = [];
    const capability = new PromiseCapability();
    __classPrivateFieldSet(module, _CyclicModule_topLevelCapability, capability, "f");
    try {
        __classPrivateFieldGet(CyclicModule, _a, "m", _CyclicModule_innerModuleEvaluation).call(CyclicModule, module, stack, 0);
        assert(__classPrivateFieldGet(module, _CyclicModule_status, "f").name === "evaluated");
        assert(__classPrivateFieldGet(module, _CyclicModule_evaluationError, "f") === undefined);
        if (!__classPrivateFieldGet(module, _CyclicModule_status, "f").asyncEvaluating) {
            capability.resolve();
        }
        assert(stack.length === 0);
    }
    catch (error) {
        for (const m of stack) {
            assert(__classPrivateFieldGet(m, _CyclicModule_status, "f").name === "evaluating");
            __classPrivateFieldSet(m, _CyclicModule_status, {
                name: "evaluated",
                dfsIndex: __classPrivateFieldGet(m, _CyclicModule_status, "f").dfsIndex,
                dfsAncestorIndex: __classPrivateFieldGet(m, _CyclicModule_status, "f").dfsAncestorIndex,
                asyncEvaluating: __classPrivateFieldGet(m, _CyclicModule_status, "f").asyncEvaluating,
                asyncParentModules: __classPrivateFieldGet(m, _CyclicModule_status, "f").asyncParentModules,
                asyncEvaluatingId,
                pendingAsyncDependencies: __classPrivateFieldGet(m, _CyclicModule_status, "f")
                    .pendingAsyncDependencies,
                cycleRoot: m,
            }, "f");
            asyncEvaluatingId += 1;
            __classPrivateFieldSet(m, _CyclicModule_evaluationError, { error }, "f");
            capability.reject(error);
        }
    }
    return capability.promise;
};
Object.freeze(CyclicModule);
Object.freeze(CyclicModule.prototype);
//# sourceMappingURL=CyclicModule.js.map