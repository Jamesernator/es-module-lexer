import NameGenerator from "./NameGenerator.js";
import assertIsString from "./assertIsString.js";
import type { ParseResult } from "./parse.js";
import replaceRanges from "./replaceRanges.js";
import type { RangeReplacement } from "./replaceRanges.js";

type SyncModuleEvaluationGenerator = {
    // isAsync: false,
    generator: Generator<any, any, any>,
    importMetaName: string,
    dynamicImportName: string,
};

export type ModuleEvaluationGenerator
    = SyncModuleEvaluationGenerator;
    // | AsyncModuleEvaulationGenerator

export default function createModuleEvaluationGenerator(
    sourceText: string,
    parseResult: ParseResult,
    scope: object,
): ModuleEvaluationGenerator {
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
                    return `get ${ JSON.stringify(exportName) }() { return ${ importName }; }`;
                });
        });

    const replacements: Array<RangeReplacement> = [
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
            let replacement: string = "";
            if (i.exports[0]?.exportName === "default"
                && i.exports[0]?.importName === "default"
                && i.specifier === null) {
                replacement = `const ${ defaultExportName } = `;
            }
            return {
                start: i.startPosition,
                end: i.endPosition,
                replacement,
            };
        }),
    ];
    const transformedSource = replaceRanges(sourceText, replacements);

    // eslint-disable-next-line no-new-func, @typescript-eslint/no-implied-eval
    const genFunction = new Function(`
        with (arguments[0]) {
            return function*() {
                "use strict";
                yield {
                    __proto__: null,
                    ${ getters.join(",") }
                };
                ${ transformedSource }
            }();
        }
    `);

    return {
        generator: genFunction(scope),
        importMetaName,
        dynamicImportName,
    };
}
