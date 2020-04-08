
type Import = {
    // Note, this is a raw source string *including* the quotes
    specifierString: string,
    startPosition: number,
    endPosition: number,
    imports: { [importName: string]: string },
};

type Export = {
    fromSpecifierString: null | string,
    startPosition: number,
    endPosition: number,
    exports: { [exportedName: string]: string },
};

type DynamicImport = {
    startPosition: number,
    endPosition: number,
    startContentPosition: number,
    endContentPosition: number,
};

type ImportMeta = {
    startPosition: number,
    endPosition: number,
};

type UnclosedDynamicImport = {
    startPosition: number,
    startContentPosition: number,
};

export default function parseImportsAndExports(code: string) {
    const imports: Array<Import> = [];
    const exports: Array<Export> = [];
    const importMetas: Array<ImportMeta> = [];
    const dynamicImports: Array<DynamicImport> = [];

    let position = 0;
    const lastPsuedoToken: string | null = null;
    const templateStack: Array<number> = [];
    const unclosedDynamicImports: Array<UnclosedDynamicImport> = [];

    const peek = (count: number=1) => {
        return code.slice(position, position + count);
    };

    function consumePseudoToken(): string {
        const startPosition = position;

        const firstChar = peek();
        if (isPunctuator(firstChar)) {
            position += 1;
            return firstChar;
        }

        while (!isNewlineOrWhitespaceOrPunctuator(peek(1))) {
            position += 1;
        }

        return code.slice(startPosition, position);
    }

    function peekPseudoToken(): string {
        const startPosition = position;
        const token = consumePseudoToken();
        position = startPosition;
        return token;
    }

    function consumeString(string: string): string {
        for (const char of string) {
            if (code[position] !== char) {
                throw new SyntaxError();
            }
            position += 1;
        }
        return string;
    }

    function consumeStringLiteral() {
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
        return code.slice();
    }

    function consumeImport() {
        const startPosition = 0;

        consumeString("import");
        consumeWhitespaceAndComments();

        const nextToken = consumePseudoToken();

        consumeWhitespaceAndComments();

        // import.meta
        if (nextToken === ".") {
            const prop = consumePseudoToken();
            if (prop !== "meta") {
                throw new SyntaxError();
            }
            importMetas.push({
                startPosition,
                endPosition: position,
            });
        // Named imports
        } else if (nextToken === "{") {
            const importedNames: Record<string, string> = Object.create(null);
            while (peekPseudoToken() !== "}") {
                consumeWhitespaceAndComments();
                const importedName = consumePseudoToken();
                consumeWhitespaceAndComments();
                if (peekPseudoToken() === "as") {
                    consumeString("as");
                    consumeWhitespaceAndComments();
                    const importedAsName = consumePseudoToken();
                    importedNames[importedName] = importedAsName;
                } else {
                    importedNames[importedName] = importedName;
                }
                consumeWhitespaceAndComments();
            }
            consumeString("}");
            consumeWhitespaceAndComments();
            consumeString("from");
            consumeWhitespaceAndComments();

            const specifierString = consumeStringLiteral();

            imports.push({
                startPosition,
                endPosition: position,
                specifierString,
                imports: importedNames,
            });

        // star import
        } else if (nextToken === "*") {
            consumeWhitespaceAndComments();
            consumeString("as");
            consumeWhitespaceAndComments();
            const importedName = consumePseudoToken();
            consumeWhitespaceAndComments();
            consumeString("from");
            consumeWhitespaceAndComments();
            const specifierString = consumeStringLiteral();

            imports.push({
                startPosition,
                endPosition: position,
                specifierString,
                imports: Object.assign(
                    Object.create(null),
                    { "*": importedName },
                ),
            });
        } else if (nextToken === "(") {

        }
    }

    function isExpressionTerminator(position: number) {
        return isStringAt(position, ";")
            || isStringAt(position, ")")
            || doesKeywordEndAt(position, "finally");
    }

    function isExpressionPunctuator(char: string) {
        const codePoint = char.codePointAt(0)!;
        return char === "!"
            || char === "%"
            || char === "&"
            || codePoint > 39 && codePoint < 47 && codePoint !== 41
            || codePoint > 57 && codePoint < 64
            || char === "["
            || char === "^"
            || codePoint > 122 && codePoint < 127 && char !== "}";
    }

    function isPunctuator(char: string) {
        const codePoint = char.codePointAt(0)!;
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

    function isNewline(char: string) {
        return char === "\r" || char === "\n";
    }

    function isNewlineOrWhitespace(char: string) {
        const codePoint = char.codePointAt(0)!;
        return codePoint > 8 && codePoint < 14
            || codePoint === 32
            || codePoint === 160;
    }

    function isNewlineOrWhitespaceOrPunctuator(char: string) {
        return isNewlineOrWhitespace(char) || isPunctuator(char);
    }

    function isNewlineOrWhitespaceOrPunctuatorNotDot(char: string) {
        return (isNewlineOrWhitespace(char) || isPunctuator(char))
            && char !== ".";
    }

    function isKeywordStart(position: number) {
        return position === 0
            || isNewlineOrWhitespaceOrPunctuatorNotDot(peek(position - 1));
    }

    function consumeUntilNewlineOrPunctuator(char: string) {
        while (!isNewlineOrWhitespaceOrPunctuator(char)) {
            position += 1;
            char = code[position];
        }
    }

    function consumeRegularExpression() {
        position += 1;
        while (position < code.length) {
            const char = peek(1);
            if (char === "/") {
                return;
            } else if (char === "[") {
                consumeRegexCharacterClass();
            } else if (char === "\\") {
                position += 1;
            } else if (isNewline(char)) {
                break;
            }
        }
        throw new SyntaxError();
    }

    function consumeRegexCharacterClass() {
        position += 1;
        while (position < code.length) {
            const char = peek(1);
            if (char === "]") {
                return;
            } else if (char === "\\") {
                position += 1;
            } else if (isNewline(char)) {
                break;
            }
        }
        throw new SyntaxError();
    }

    function consumeString(endQuote: "\"" | "'"): string {
        position += 1;
        const char = peek(1);
        const content: Array<string> = [];
        while (position < code.length) {
            if (char === endQuote) {
                return content.join("");
            } else if (char === "\\") {
                position += 1;
            } else if (isNewline(char)) {
                break;
            }
        }
        throw new SyntaxError();
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

    function consumeTemplateString() {
        position += 1;
        while (position < code.length) {
            if (peek(2) === "${") {
                position += 2;
                templateStack.push(templateDepth);
                openTokenDepth += 1;
                templateDepth = openTokenDepth;
            }

            position += 1;
        }
    }

    function consumeWhitespaceAndComments() {
        while (position <= code.length) {
            const char = peek(1);

            if (peek(2) === "//") {
                consumeLineComment();
            } else if (peek(2) === "/*") {
                consumeBlockComment();
            } else if (!isNewlineOrWhitespace(char)) {
                return;
            }

            position += 1;
        }
    }

    function tryConsumeImport() {
        const startPosition = position;

        position += 6;

        consumeWhitespaceAndComments();

        const char = peek(1);

        if (char === "(") {
            openTokenPositionsStack.push(startPosition);
            if (lastToken === ".") {
                return;
            }
            unclosedDynamicImports.push({ startPosition, startContentPosition: position + 1 });
        } else if (char === ".") {
            position += 1;
            consumeWhitespaceAndComments();
            if (isStringAt(position, "meta") && !(lastToken === ".")) {
                importMetas.push({
                    startPosition,
                    endPosition: position + 4,
                });
            }
        } else if (char === "\"" || "\"" || "{" || "*") {

        }
    }
}
