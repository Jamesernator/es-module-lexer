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
var _ReadonlyMap_map;
export default class ReadonlyMap {
    constructor(map) {
        _ReadonlyMap_map.set(this, void 0);
        __classPrivateFieldSet(this, _ReadonlyMap_map, map, "f");
    }
    get(key) {
        return __classPrivateFieldGet(this, _ReadonlyMap_map, "f").get(key);
    }
    has(key) {
        return __classPrivateFieldGet(this, _ReadonlyMap_map, "f").has(key);
    }
    *entries() {
        yield* __classPrivateFieldGet(this, _ReadonlyMap_map, "f").entries();
    }
    *values() {
        yield* __classPrivateFieldGet(this, _ReadonlyMap_map, "f").values();
    }
    *keys() {
        yield* __classPrivateFieldGet(this, _ReadonlyMap_map, "f").keys();
    }
}
_ReadonlyMap_map = new WeakMap();
Object.freeze(ReadonlyMap);
Object.freeze(ReadonlyMap.prototype);
//# sourceMappingURL=ReadonlyMap.js.map