import NameGenerator from "./NameGenerator.js";
import assertIsString from "./assertIsString.js";
import replaceRanges from "./replaceRanges.js";
const AsyncFunction = (async () => null).constructor;
function isAsyncSource(transformedSource) {
    try {
        // eslint-disable-next-line no-new, no-new-func, @typescript-eslint/no-implied-eval
        new Function(`
            "use strict";
            ${transformedSource}
        `);
        return false;
    }
    catch {
        // eslint-disable-next-line no-new
        new AsyncFunction(`
            "use strict";
            ${transformedSource}
        `);
        return true;
    }
}
export default function createModuleEvaluationGenerator(sourceText, parseResult, context) {
    const nameGenerator = new NameGenerator(sourceText);
    const defaultExportName = nameGenerator.createName("default");
    const importMetaName = nameGenerator.createName("importMeta");
    const dynamicImportName = nameGenerator.createName("dynamicImport");
    const getters = parseResult.exports
        .filter((e) => e.specifier === null)
        .flatMap((e) => {
        return e.exports
            .map(({ importName, exportName }) => {
            assertIsString(importName);
            assertIsString(exportName);
            if (importName === "default") {
                importName = defaultExportName;
            }
            return `get ${JSON.stringify(exportName)}() { return ${importName}; }`;
        });
    });
    const replacements = [
        ...parseResult.imports.map((i) => {
            return {
                start: i.startPosition,
                end: i.endPosition,
                replacement: "",
            };
        }),
        ...parseResult.dynamicImports.map((i) => {
            return {
                start: i.startPosition,
                end: i.startPosition + 6,
                replacement: dynamicImportName,
            };
        }),
        ...parseResult.importMetas.map((i) => {
            return {
                start: i.startPosition,
                end: i.endPosition,
                replacement: importMetaName,
            };
        }),
        ...parseResult.exports.map((i) => {
            let replacement = "";
            if (i.exports[0]?.exportName === "default"
                && i.exports[0]?.importName === "default"
                && i.specifier === null) {
                replacement = `const ${defaultExportName} = `;
            }
            return {
                start: i.startPosition,
                end: i.endPosition,
                replacement,
            };
        }),
    ];
    const transformedSource = replaceRanges(sourceText, replacements);
    const isAsync = isAsyncSource(transformedSource);
    const contextName = nameGenerator.createName("context");
    // eslint-disable-next-line no-new-func, @typescript-eslint/no-implied-eval
    const genFunction = new Function(`
        const ${contextName} = arguments[0];
        with (${contextName}.scope) {
            return ${isAsync ? "async" : ""} function*() {
                "use strict";
                ${contextName}.exports = {
                    __proto__: null,
                    ${getters.join(",")}
                };
                yield;
                ${transformedSource}
            }();
        }
    `);
    return {
        isAsync,
        generator: genFunction(context),
        importMetaName,
        dynamicImportName,
    };
}
//# sourceMappingURL=createModuleEvaluationGenerator.js.map