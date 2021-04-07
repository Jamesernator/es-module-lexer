import type { ImportEntry, IndirectExportEntry, LocalExportEntry, StarExportEntry } from "./SourceTextModule.js";
import type { ParseResult } from "./parse.js";
declare type EntriesLists = {
    importEntries: Array<ImportEntry>;
    localExportEntries: Array<LocalExportEntry>;
    indirectExportEntries: Array<IndirectExportEntry>;
    starExportEntries: Array<StarExportEntry>;
};
export default function getModuleEntries(parseResult: ParseResult): EntriesLists;
export {};
