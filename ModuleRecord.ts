
export type ResolveSet = WeakMap<ModuleRecord, Set<string>>;

export default abstract class ModuleRecord {
    readonly #requestedModules: ReadonlyArray<string>;

    constructor(requestedModules: Array<string> | ReadonlyArray<string>) {
        this.#requestedModules = Object.freeze([...requestedModules]);
    }

    get requestedModules(): ReadonlyArray<string> {
        return this.#requestedModules;
    }

    abstract declare namespace: undefined | object;
    abstract link(): Promise<void>;
    abstract evaluate(): Promise<void>;
}
