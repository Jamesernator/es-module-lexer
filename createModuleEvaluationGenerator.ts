import NameGenerator from "./NameGenerator.js";
import type { ParseResult } from "./parse.js";
import replaceRanges from "./replaceRanges.js";
import type { RangeReplacement } from "./replaceRanges.js";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const GeneratorFunction = function* () { }.constructor as GeneratorFunctionConstructor;

type ModuleEvaluationGenerator = {
    generator: Generator<any, any, any>,
    importMetaName: string,
    dynamicImportName: string,
};

export default function createModuleEvaluationGenerator(
    sourceText: string,
    parseResult: ParseResult,
    scope: object,
): ModuleEvaluationGenerator {
    const nameGenerator = new NameGenerator(sourceText);
    const defaultExportName = nameGenerator.createName("default");
    const importMetaName = nameGenerator.createName("importMeta");
    const dynamicImportName = nameGenerator.createName("dynamicImport");
    const getters = parseResult.exports.flatMap((e) => {
        return Object.entries(e.exports)
            .map(([localName, asName]) => {
                if (localName === "default") {
                    localName = defaultExportName;
                }
                return `get ${ asName }() { return ${ localName } }`;
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
            return {
                start: i.startPosition,
                end: i.endPosition,
                replacement: "",
            };
        }),
    ];
    const transformedSource = replaceRanges(sourceText, replacements);
    return {
        generator: new GeneratorFunction(`
            with (arguments[0]) {
                yield {
                    __proto__: null,
                    ${ getters.join(",") }
                };
                ${ transformedSource }
            }
        `)(scope),
        importMetaName,
        dynamicImportName,
    };
}
