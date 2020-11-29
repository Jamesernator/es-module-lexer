import type { NodePath } from "@babel/traverse";
import t from "@babel/types";

type LocalExport = {
    localName: string,
    exportName: string,
};

type IndirectExport = {
    importName: string,
    exportName: string,
    specifier: string,
};

type Result = {
    localExports: Array<LocalExport>,
    indirectExports: Array<IndirectExport>,
};

function* getDeclaredNamesFromLVal(node: t.LVal): Generator<string> {
    if (node.type === "Identifier") {
        yield node.name;
    } else if (node.type === "AssignmentPattern") {
        yield* getDeclaredNamesFromLVal(node.left);
    } else if (node.type === "RestElement") {
        yield* getDeclaredNamesFromLVal(node.argument);
    } else if (node.type === "ArrayPattern") {
        for (const element of node.elements) {
            if (element) {
                yield* getDeclaredNamesFromLVal(element);
            }
        }
    } else if (node.type === "ObjectPattern") {
        for (const prop of node.properties) {
            if (prop.type === "RestElement") {
                yield* getDeclaredNamesFromLVal(prop);
                continue;
            }
            if (t.isLVal(prop.value)) {
                yield* getDeclaredNamesFromLVal(prop.value);
            }
        }
    }
}

function* getDeclaredNames(
    node: t.Declaration,
): Generator<string> {
    if (node.type === "FunctionDeclaration") {
        if (node.id) {
            yield node.id.name;
        }
    } else if (node.type === "ClassDeclaration") {
        yield node.id.name;
    } else if (node.type === "VariableDeclaration") {
        for (const declaration of node.declarations) {
            yield* getDeclaredNamesFromLVal(declaration.id);
        }
    }
}

export default function transformNamedExport(
    path: NodePath<t.ExportNamedDeclaration>,
): Result {
    const localExports: Array<LocalExport> = [];
    const indirectExports: Array<IndirectExport> = [];

    if (path.node.declaration) {
        const { declaration } = path.node;
        path.replaceWith(declaration);

        const names = Array.from(getDeclaredNames(declaration));

        for (const name of names) {
            localExports.push({ exportName: name, localName: name });
        }
    }

    return { localExports, indirectExports };
}
