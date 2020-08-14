
export type ResolveSet = WeakMap<ModuleRecord, Set<string>>;

export default abstract class ModuleRecord {
    abstract declare namespace: undefined | object;

    abstract resolveExport(
        exportName: string,
        resolveSet: ResolveSet
    ): null | "ambiguous" | { module: ModuleRecord, bindingName: string };

    abstract getExportedNames(exportStarSet?: Set<ModuleRecord>): Array<string>;
    abstract link(): Promise<void>;
    abstract evaluate(): Promise<void>;
}
