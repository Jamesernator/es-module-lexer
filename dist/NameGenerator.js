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
var _string, _names;
export default class NameGenerator {
    constructor(string) {
        _string.set(this, void 0);
        _names.set(this, new Map());
        __classPrivateFieldSet(this, _string, string);
    }
    createName(prefix) {
        let currentN = __classPrivateFieldGet(this, _names).get(prefix) ?? 0;
        let name = `${prefix}$$${currentN}`;
        while (__classPrivateFieldGet(this, _string).includes(name)) {
            currentN += 1;
            name = `${prefix}$${currentN}`;
        }
        __classPrivateFieldGet(this, _names).set(prefix, currentN + 1);
        return name;
    }
}
_string = new WeakMap(), _names = new WeakMap();
//# sourceMappingURL=NameGenerator.js.map