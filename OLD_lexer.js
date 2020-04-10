function isPunctuator(char) {
    const codePoint = char.codePointAt(0);
    return char === "!"
        || char === "%"
        || char === "&"
        || codePoint > 39 && codePoint < 48
        || codePoint > 57 && codePoint < 64
        || char === "["
        || char === "]"
        || char === "^"
        || codePoint > 122 && codePoint < 127;
}
function isNewline(char) {
    return char === "\r" || char === "\n";
}
function isNewlineOrWhitespace(char) {
    const codePoint = char.codePointAt(0);
    return codePoint > 8 && codePoint < 14
        || codePoint === 32
        || codePoint === 160;
}
function isNewlineOrWhitespaceOrPunctuator(char) {
    return isNewlineOrWhitespace(char) || isPunctuator(char);
}
export default function parseImportsAndExports(code) {
    const imports = [];
    const exports = [];
    const importMetas = [];
    const dynamicImports = [];
    const tokens = new Uint16Array();
    let position = 0;
    const lastToken = null;
    const currentToken = null;
    let openTemplateCount = 0;
    const peek = (count = 1) => {
        return code.slice(position, position + count);
    };
    function consumeChar() {
        const char = code[position];
        position += 1;
        return char;
    }
    function consumeString(string) {
        for (const char of string) {
            if (code[position] !== char) {
                throw new SyntaxError();
            }
            position += 1;
        }
        return string;
    }
    function consumeTemplateLiteralPart() {
        const first = consumeChar();
        while (position < code.length && peek(1) !== "`" && peek(2) !== "${") {
            if (peek(1) === "\\") {
                position += 1;
            }
            position += 1;
        }
        if (position === code.length) {
            throw new SyntaxError();
        }
        if (first === "`") {
            if (peek(1) === "`") {
                consumeString("`");
                return { type: "template" };
            }
            consumeString("${");
            return { type: "templateStart" };
        }
        if (peek(1) === "`") {
            consumeString("`");
            return { type: "templateEnd" };
        }
        consumeString("${");
        return { type: "templateContinue" };
    }
    function consumePunctuator() {
        const char = consumeChar();
        if (!isPunctuator(char)) {
            throw new SyntaxError();
        }
        return char;
    }
    function consumeSequence() {
        const startPosition = position;
        while (position < code.length
            && !isNewlineOrWhitespaceOrPunctuator(peek())) {
            position += 1;
        }
        return code.slice(startPosition, position);
    }
    function consumeToken() {
        if (peek() === "`") {
            const token = consumeTemplateLiteralPart();
            if (token.type === "templateStart") {
                openTemplateCount += 1;
            }
            return token;
        }
        else if (peek() === "}" && openTemplateCount > 0) {
            const token = consumeTemplateLiteralPart();
            if (token.type === "templateEnd") {
                openTemplateCount -= 1;
            }
            return token;
        }
        else if (peek() === `'` || peek() === `"`) {
            return {
                type: "stringLiteral",
                source: consumeStringLiteral(),
            };
        }
        else if (isPunctuator(peek())) {
            return { type: "punctuator", source: consumePunctuator() };
        }
        else if (peek() === "/") {
            throw new Error("TODO");
        }
        return { type: "other", source: consumeSequence() };
    }
    function peekToken() {
        const startPosition = position;
        consumeToken();
        const endPosition = position;
        position = startPosition;
        return code.slice(startPosition, endPosition);
    }
    function consumeContent(terminator = null) {
        while (position < code.length) {
            if (peekToken() === terminator) {
                return;
            }
            else if (peekToken() === "import") {
                consumeImport();
            }
            else if (peekToken() === "export") {
                consumeExport();
            }
            else if (peekToken() === "(") {
                consumeContent(")");
            }
            else {
                consumeToken();
            }
        }
    }
    function consumeStringLiteral() {
        const startPosition = position;
        const startQuote = code[position];
        if (startQuote !== `'` && startQuote !== `"`) {
            throw new SyntaxError();
        }
        consumeString(startQuote);
        while (position < code.length && peek(1) !== startQuote) {
            const char = peek(1);
            if (isNewline(char)) {
                throw new SyntaxError();
            }
            if (char === "\\") {
                position += 1;
            }
            position += 1;
        }
        consumeString(startQuote);
        return code.slice(startPosition, position);
    }
    function consumeImport() {
        const startPosition = 0;
        consumeString("import");
        consumeWhitespaceAndComments();
        function consumeNamespaceImport() {
            consumeString("*");
            consumeWhitespaceAndComments();
            consumeString("as");
            consumeWhitespaceAndComments();
            return consumeSequence();
        }
        function consumeNamedImports() {
            const importedNames = Object.create(null);
            while (peekToken() !== "}") {
                consumeWhitespaceAndComments();
                const importedName = consumeSequence();
                consumeWhitespaceAndComments();
                if (peekToken() === "as") {
                    consumeString("as");
                    consumeWhitespaceAndComments();
                    const importedAsName = consumeSequence();
                    importedNames[importedName] = importedAsName;
                }
                else {
                    importedNames[importedName] = importedName;
                }
                if (peekToken() === ",") {
                    consumeString(",");
                }
            }
            consumeString("}");
            return importedNames;
        }
        // Dynamic import
        if (peekToken() === "(") {
            consumeString("(");
            consumeWhitespaceAndComments();
            const contentStartPosition = position;
            consumeContent(")");
            const contentEndPosition = position;
            consumeWhitespaceAndComments();
            consumeString(")");
            consumeWhitespaceAndComments();
            if (peekToken() !== "{") {
                dynamicImports.push({
                    startPosition,
                    endPosition: position,
                    contentStartPosition,
                    contentEndPosition,
                });
            }
            return;
            // Import.meta
        }
        else if (peekToken() === ".") {
            consumeString(".");
            consumeWhitespaceAndComments();
            const prop = consumeToken();
            if (prop.type !== "other" || prop.source !== "meta") {
                throw new SyntaxError();
            }
            importMetas.push({
                startPosition,
                endPosition: position,
            });
        }
        const importNames = Object.create(null);
        if (peekToken() === "{") {
            Object.assign(importNames, consumeNamedImports());
        }
        else if (peekToken() === "*") {
            importNames["*"] = consumeNamespaceImport();
        }
        else if (peekToken() !== "stringLiteral") {
            const defaultName = consumeSequence();
            importNames.default = defaultName;
            if (peekToken() === ",") {
                consumeWhitespaceAndComments();
                if (peekToken() === "*") {
                    importNames["*"] = consumeNamespaceImport();
                }
                else if (peekToken() === "{") {
                    Object.assign(importNames, consumeNamedImports());
                }
                else {
                    throw new SyntaxError();
                }
            }
        }
        consumeWhitespaceAndComments();
        consumeString("from");
        consumeWhitespaceAndComments();
        const specifierString = consumeStringLiteral();
        imports.push({
            startPosition,
            endPosition: position,
            specifierString,
            imports: importNames,
        });
    }
    function consumeExport() {
    }
    function consumeLineComment() {
        position += 1;
        while (position < code.length) {
            if (isNewline(peek(1))) {
                return;
            }
        }
    }
    function consumeBlockComment() {
        position += 2;
        while (position < code.length) {
            if (peek(2) === "*/") {
                position += 2;
                return;
            }
            position += 1;
        }
        throw new SyntaxError();
    }
    function consumeWhitespaceAndComments() {
        while (position <= code.length) {
            const char = peek(1);
            if (peek(2) === "//") {
                consumeLineComment();
            }
            else if (peek(2) === "/*") {
                consumeBlockComment();
            }
            else if (!isNewlineOrWhitespace(char)) {
                return;
            }
            position += 1;
        }
    }
    return { imports, exports, dynamicImports, importMetas };
}
//# sourceMappingURL=OLD_lexer.js.map