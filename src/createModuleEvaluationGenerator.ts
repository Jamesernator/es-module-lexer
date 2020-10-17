import NameGenerator from "./NameGenerator.js";
import assertIsString from "./assertIsString.js";
import type { ParseResult } from "./parse.js";
import replaceRanges from "./replaceRanges.js";
import type { RangeReplacement } from "./replaceRanges.js";

type SyncModuleEvaluationGenerator = {
    isAsync: false,
    generator: Generator<any, any, any>,
    importMetaName: string,
    dynamicImportName: string,
};

type AsyncModuleEvaluationGenerator = {
    isAsync: true,
    generator: AsyncGenerator<any, any, any>,
    importMetaName: string,
    dynamicImportName: string,
};

export type ModuleEvaluationGenerator
    = SyncModuleEvaluationGenerator
    | AsyncModuleEvaluationGenerator;

interface AsyncFunctionConstructor {
    new (...args: Array<string>): (...args: any) => Promise<any>;
    (...args: Array<string>): (...args: any) => Promise<any>;
}

const AsyncFunction = (async () => null).constructor as AsyncFunctionConstructor;

function isAsyncSource(transformedSource: string) {
    try {
        // eslint-disable-next-line no-new, no-new-func, @typescript-eslint/no-implied-eval
        new Function(transformedSource);
        return false;
    } catch {
        // eslint-disable-next-line no-new
        new AsyncFunction(transformedSource);
        return true;
    }
}

export default function createModuleEvaluationGenerator(
    sourceText: string,
    parseResult: ParseResult,
    context: { scope: object, exports: any },
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

    const isAsync = isAsyncSource(transformedSource);

    const contextName = nameGenerator.createName("context");

    // eslint-disable-next-line no-new-func, @typescript-eslint/no-implied-eval
    const genFunction = new Function(`
        const ${ contextName } = arguments[0];
        with (${ contextName }.scope) {
            return ${ isAsync ? "async" : "" } function*() {
                "use strict";
                ${ contextName }.exports = {
                    __proto__: null,
                    ${ getters.join(",") }
                };
                yield;
                ${ transformedSource }
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
