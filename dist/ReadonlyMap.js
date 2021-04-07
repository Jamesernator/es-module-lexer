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
var _map;
export default class ReadonlyMap {
    constructor(map) {
        _map.set(this, void 0);
        __classPrivateFieldSet(this, _map, map);
    }
    get(key) {
        return __classPrivateFieldGet(this, _map).get(key);
    }
    has(key) {
        return __classPrivateFieldGet(this, _map).has(key);
    }
    *entries() {
        yield* __classPrivateFieldGet(this, _map).entries();
    }
    *values() {
        yield* __classPrivateFieldGet(this, _map).values();
    }
    *keys() {
        yield* __classPrivateFieldGet(this, _map).keys();
    }
}
_map = new WeakMap();
Object.freeze(ReadonlyMap);
Object.freeze(ReadonlyMap.prototype);
//# sourceMappingURL=ReadonlyMap.js.map