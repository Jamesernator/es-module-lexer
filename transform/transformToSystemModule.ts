/* eslint-disable @typescript-eslint/naming-convention */
import { createRequire } from "module";
import type Generate from "@babel/generator";
import type { ParserOptions } from "@babel/parser";
import { parse } from "@babel/parser";
import type Traverse from "@babel/traverse";
import t from "@babel/types";
import transformDefaultExport from "./transformDefaultExport.js";
import transformImport from "./transformImport.js";
import transformNamedExport from "./transformNamedExport.js";

const requireModule = createRequire(new URL(import.meta.url));

const traverse = requireModule("@babel/traverse").default as typeof Traverse;
const generate = requireModule("@babel/generator").default as typeof Generate;

const parseOptions: ParserOptions = {
    sourceType: "module",
    plugins: [
        "asyncGenerators",
        "bigInt",
        "classPrivateMethods",
        "classPrivateProperties",
        "classProperties",
        "dynamicImport",
        "exportNamespaceFrom",
        "importMeta",
        "logicalAssignment",
        "nullishCoalescingOperator",
        "numericSeparator",
        "objectRestSpread",
        "optionalCatchBinding",
        "optionalChaining",
        "topLevelAwait",
    ],
};

export const NAMESPACE = Symbol("NAMESPACE");

export default function transformToSystemModule(
    sourceText: string,
): string {
    const ast = parse(sourceText, parseOptions);

    const imports: Array<string> = [];
    const localExports: Array<{ localName: string, exportName: string }> = [];
    const indirectExports: Array<{
        specifier: string,
        importName: string | typeof NAMESPACE,
        exportName: string,
    }> = [];
    const starExports: Array<{ specifier: string }> = [];

    traverse(ast, {
        Program(path) {
            const importContextName = path.scope.generateUid("importContext");

            path.traverse({
                Import(path) {
                    path.replaceWith(t.memberExpression(
                        t.identifier(importContextName),
                        t.identifier("dynamicImport"),
                    ));
                },

                MetaProperty(path) {
                    if (path.node.meta.name === "import"
                    && path.node.property.name === "meta") {
                        path.replaceWith(t.memberExpression(
                            t.identifier(importContextName),
                            t.identifier("importMeta"),
                        ));
                    }
                },

                ImportDeclaration(path) {
                    imports.push(transformImport(
                        importContextName,
                        imports.length,
                        path,
                    ));
                },

                ExportDefaultDeclaration(path) {
                    localExports.push({
                        exportName: "default",
                        localName: transformDefaultExport(path),
                    });
                },

                ExportAllDeclaration(path) {
                    starExports.push({
                        specifier: path.node.source.value,
                    });
                    path.remove();
                },

                ExportNamedDeclaration(path) {
                    const exports = transformNamedExport(path);
                    localExports.push(...exports.localExports);
                    indirectExports.push(...exports.indirectExports);
                },
            });
        },
    });

    return generate(ast).code;
}

console.log(transformToSystemModule(`
    import bar from "boz";
    import lemons, { oranges, cabbages as coins } from "self";
    import * as biz from "hats";

    let x = 12;
    const y = 30;

    export default function() {
        return 12;
    }

    export class Bar {
        bazUrl = new URL('./baz', import.meta.url);

        constructor() {
            x += 1;
        }

        async buzz() {
            await import("polyfilla");
        }

        arr() {
            console.log(bar);
            console.log(lemons);
            console.log(oranges);
            console.log(coins);
            console.log(biz);
        }
    }

    export const fuzz = "baz";
    export let yarg = 233;

    export { y, x as bar };
    export * as boz from "banana";
    export { blah, apple as horse } from "cheese";
    export * from "beee";
`));
