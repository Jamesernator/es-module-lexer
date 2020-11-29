import type { NodePath } from "@babel/traverse";
import t from "@babel/types";

export default function transformDefaultExport(
    path: NodePath<t.ExportDefaultDeclaration>,
): string {
    const exported = path.get("declaration");
    if (exported.isExpression()) {
        const name = path.scope.generateUidIdentifier("default");
        path.replaceWith(t.variableDeclaration(
            "const",
            [t.variableDeclarator(name, exported.node)],
        ));
        return name.name;
    } else if (exported.isFunctionDeclaration()) {
        path.replaceWith(exported);
        if (exported.node.id === null) {
            const name = path.scope.generateUidIdentifier("default");
            exported.node.id = name;
        }
        return exported.node.id.name;
    } else if (exported.isClassDeclaration()) {
        path.replaceWith(exported);
        return exported.node.id.name;
    }
    throw new Error("Unknown default export value");
}
