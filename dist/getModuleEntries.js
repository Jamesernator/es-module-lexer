import { NAMESPACE } from "./Module.js";
import assertIsString from "./assertIsString.js";
export default function getModuleEntries(parseResult) {
    const importEntries = parseResult.imports
        .flatMap((i) => {
        return i.imports
            .map(({ importName, localName }) => ({
            specifier: i.specifier,
            importName,
            localName,
        }));
    });
    const importedBoundNames = new Set(importEntries.map((i) => i.localName));
    const indirectExportEntries = [];
    const localExportEntries = [];
    const starExportEntries = [];
    function addEntry(exportEntry, name, exportName) {
        if (exportEntry.specifier === null) {
            assertIsString(name);
            assertIsString(exportName);
            if (!importedBoundNames.has(name)) {
                localExportEntries.push({
                    localName: name,
                    exportName,
                });
                return;
            }
            const importEntry = importEntries
                .find((i) => i.localName === name);
            if (importEntry.importName === NAMESPACE) {
                localExportEntries.push({
                    localName: name,
                    exportName,
                });
            }
            else {
                indirectExportEntries.push({
                    specifier: importEntry.specifier,
                    importName: importEntry.localName,
                    exportName,
                });
            }
        }
        else if (name === NAMESPACE && exportName === NAMESPACE) {
            starExportEntries.push({
                specifier: exportEntry.specifier,
            });
        }
        else {
            assertIsString(exportName);
            indirectExportEntries.push({
                specifier: exportEntry.specifier,
                importName: name,
                exportName,
            });
        }
    }
    for (const exportEntry of parseResult.exports) {
        for (const { importName, exportName } of exportEntry.exports) {
            addEntry(exportEntry, importName, exportName);
        }
    }
    return {
        importEntries,
        localExportEntries,
        indirectExportEntries,
        starExportEntries,
    };
}
//# sourceMappingURL=getModuleEntries.js.map