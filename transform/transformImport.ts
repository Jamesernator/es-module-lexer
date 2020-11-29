import type { NodePath } from "@babel/traverse";
import t from "@babel/types";

export default function transformImport(
    importContextName: string,
    index: number,
    path: NodePath<t.ImportDeclaration>,
): string {
    const moduleName = t.memberExpression(
        t.identifier(importContextName),
        t.numericLiteral(index),
        true,
    );

    const specifier = path.node.source.value;

    for (const importSpecifier of path.get("specifiers")) {
        const local = importSpecifier.get("local");
        const binding = local.scope.getBinding(local.node.name);
        for (const path of binding?.referencePaths ?? []) {
            if (importSpecifier.isImportNamespaceSpecifier()) {
                path.replaceWith(moduleName);
            } else if (importSpecifier.isImportDefaultSpecifier()) {
                path.replaceWith(t.memberExpression(
                    moduleName,
                    t.identifier("default"),
                ));
            } else if (importSpecifier.isImportSpecifier()) {
                const imported = importSpecifier
                    .get("imported") as NodePath<t.StringLiteral | t.Identifier>;
                if (imported.isStringLiteral()) {
                    path.replaceWith(t.memberExpression(
                        moduleName,
                        imported.node,
                        true,
                    ));
                } else {
                    path.replaceWith(t.memberExpression(
                        moduleName,
                        imported.node,
                    ));
                }
            }
        }
    }

    path.remove();

    return specifier;
}
