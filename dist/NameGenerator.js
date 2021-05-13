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
var _NameGenerator_string, _NameGenerator_names;
export default class NameGenerator {
    constructor(string) {
        _NameGenerator_string.set(this, void 0);
        _NameGenerator_names.set(this, new Map());
        __classPrivateFieldSet(this, _NameGenerator_string, string, "f");
    }
    createName(prefix) {
        let currentN = __classPrivateFieldGet(this, _NameGenerator_names, "f").get(prefix) ?? 0;
        let name = `${prefix}$$${currentN}`;
        while (__classPrivateFieldGet(this, _NameGenerator_string, "f").includes(name)) {
            currentN += 1;
            name = `${prefix}$${currentN}`;
        }
        __classPrivateFieldGet(this, _NameGenerator_names, "f").set(prefix, currentN + 1);
        return name;
    }
}
_NameGenerator_string = new WeakMap(), _NameGenerator_names = new WeakMap();
//# sourceMappingURL=NameGenerator.js.map