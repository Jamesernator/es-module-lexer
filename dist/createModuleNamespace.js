function isAccessorDescriptor(descriptor) {
    return Boolean(descriptor.get ?? descriptor.set);
}
export default function createModuleNamespace(resolvedExports) {
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
//# sourceMappingURL=createModuleNamespace.js.map