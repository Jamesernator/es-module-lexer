
export type GetExportedNames = (exportStarSet: Set<Module>) => Array<string>;

export const AMBIGUOUS = Symbol("ambiguous");
export const NAMESPACE = Symbol("namespace");

export type ResolvedBinding = {
    module: Module,
    bindingName: string | typeof NAMESPACE,
    getBinding: () => any,
};

export type ResolvedExport = null | typeof AMBIGUOUS | ResolvedBinding;

export type ResolveSet = Array<{ module: Module, exportName: string }>;

export type ResolveExport
    = (
        exportName: string,
        resolveSet: ResolveSet,
    ) => ResolvedExport;

export type ModuleOptions = {
    link: () => void | Promise<void>,
    evaluate: () => void,
    getExportedNames: GetExportedNames,
    resolveExport: ResolveExport,
};

function isAccessorDescriptor(descriptor: PropertyDescriptor) {
    return Boolean(descriptor.get ?? descriptor.set);
}

function createModuleNamespace(resolvedExports: Map<string, () => any>) {
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
        getOwnPropertyDescriptor(target, prop: string | symbol) {
            if (typeof prop === "symbol") {
                return Reflect.getOwnPropertyDescriptor(target, prop);
            }
            if (!Reflect.has(target, prop)) {
                return undefined;
            }
            const getBinding = resolvedExports.get(prop)!;
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
        get(target, prop: string | symbol, receiver) {
            if (typeof prop === "symbol") {
                return Reflect.get(target, prop, receiver);
            }
            return Reflect.getOwnPropertyDescriptor(target, prop)?.value;
        },
        set() {
            return false;
        },
    });
}

export default abstract class Module {
    readonly #link: () => void | Promise<void>;
    readonly #evaluate: () => void;
    readonly #getExportedNames: GetExportedNames;
    readonly #resolveExport: ResolveExport;
    #namespace?: Record<string, any> = undefined;
    #isEvaluated = false;

    constructor({
        link,
        evaluate,
        getExportedNames,
        resolveExport,
    }: ModuleOptions) {
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
        this.#link = link;
        this.#evaluate = evaluate;
        this.#getExportedNames = getExportedNames;
        this.#resolveExport = resolveExport;
        Object.freeze(this);
    }

    #getModuleNamespace = (): any => {
        if (this.#namespace) {
            return this.#namespace;
        }
        const resolvedExports = new Map<string, () => any>();
        const exportedNames = this.#getExportedNames(new Set());
        for (const exportName of exportedNames) {
            const resolvedExport = this.#resolveExport(exportName, []);
            if (resolvedExport !== AMBIGUOUS && resolvedExport !== null) {
                resolvedExports.set(exportName, resolvedExport.getBinding);
            }
        }
        this.#namespace = createModuleNamespace(resolvedExports);
        return this.#namespace;
    };

    get namespace(): any {
        return this.#getModuleNamespace();
    }

    get isEvaluated(): boolean {
        return this.#isEvaluated;
    }

    getExportedNames(exportStarSet: Set<Module>=new Set()): Array<string> {
        return this.#getExportedNames(exportStarSet);
    }

    resolveExport(
        exportName: string,
        resolveSet: ResolveSet=[],
    ): ResolvedExport {
        return this.#resolveExport(exportName, resolveSet);
    }

    async link(): Promise<void> {
        if (this.#isEvaluated) {
            return;
        }
        await this.#link();
    }

    evaluate(): void {
        this.#evaluate();
        this.#isEvaluated = true;
    }
}

Object.freeze(Module);
Object.freeze(Module.prototype);
