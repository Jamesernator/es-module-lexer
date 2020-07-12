
type Import = {
    startPosition: number,
    endPosition: number,
    specifier: string,
    imports: { [importedName: string]: string },
};

type ImportMeta = {
    startPosition: number,
    endPosition: number,
};

type DynamicImport = {
    startPosition: number,
    endPosition: number,
    contentStartPosition: number,
    contentEndPosition: number,
};

type Export = unknown;

type ParseResult = {
    imports: Array<Import>,
    exports: Array<Export>,
    importMetas: Array<ImportMeta>,
    dynamicImports: Array<DynamicImport>,
};

function isQuote(token: string): boolean {
    return token === `'` || token === `"`;
}

function isPunctuator(char: string): boolean {
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

function isNewline(char: string): boolean {
    return char === "\r" || char === "\n";
}

function isNewlineOrWhitespace(char: string): boolean {
    const codePoint = char.codePointAt(0)!;
    return codePoint > 8 && codePoint < 14
        || codePoint === 32
        || codePoint === 160;
}

function isNewlineOrWhitespaceOrPunctuator(char: string): boolean {
    return isNewlineOrWhitespace(char) || isPunctuator(char);
}

function isParenKeyword(token: string): boolean {
    return token === "if"
        || token === "for"
        || token === "while";
}

function isExpressionTerminator(token: string): boolean {
    return token === ";"
        || token === ")"
        || token === "finally";
}

function isExpressionPunctuator(char: string): boolean {
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

function isExpressionKeyword(token: string): boolean {
    return token === "await"
        || token === "case"
        || token === "debugger"
        || token === "delete"
        || token === "do"
        || token === "else"
        || token === "in"
        || token === "instanceof"
        || token === "new"
        || token === "return"
        || token === "throw"
        || token === "typeof"
        || token === "void"
        || token === "yield";
}

enum EndWhen {
    eof = 1,
    closingTemplate,
    closingBrace,
    closingParenthesis,
}

enum TemplateTokenType {
    template,
    templateHead,
    templateMiddle,
    templateEnd,
}

export default class Parser {
    #code: string;
    #lastToken: string = "";
    #position: number = 0;
    #result: ParseResult = Object.freeze({
        imports: [],
        exports: [],
        importMetas: [],
        dynamicImports: [],
    });

    constructor(code: string) {
        this.#code = code;
    }

    #peek = (count: number=1): string => {
        return this.#code.slice(this.#position, this.#position + count);
    };

    #atEnd = (): boolean => {
        return this.#position === this.#code.length;
    };

    #shouldStopTokenizing = (endWhen: EndWhen): boolean => {
        switch (endWhen) {
            case EndWhen.closingBrace: return this.#peek() === "}";
            case EndWhen.closingParenthesis: return this.#peek() === ")";
            case EndWhen.closingTemplate: {
                return this.#peek() === "}" || this.#peek() === "`";
            }
            default: return false;
        }
    };

    #peekSequence = (): string => {
        const startPosition = this.#position;
        while (!this.#atEnd()
        && !isNewlineOrWhitespaceOrPunctuator(this.#peek())) {
            this.#position += 1;
        }
        const seq = this.#code.slice(startPosition, this.#position);
        this.#position = startPosition;
        return seq;
    };

    #consumeCharacterClass = (): void => {
        this.#position += 1;
        while (!this.#atEnd() && this.#peek() !== "[") {
            if (this.#peek() === "\\") {
                this.#position += 1;
            }
            this.#position += 1;
        }
        if (this.#atEnd()) {
            throw new SyntaxError("Unterminated character class");
        }
        this.#position += 1;
    };

    #consumeRegularExpression = (): void => {
        const startPosition = this.#position;
        this.#position += 1;
        while (!this.#atEnd() && this.#peek() !== "/") {
            if (this.#peek() === "[") {
                this.#consumeCharacterClass();
                continue;
            }
            if (this.#peek() === "\\") {
                this.#position += 1;
            }

            this.#position += 1;
        }
        if (this.#atEnd()) {
            throw new SyntaxError("Unterminated regular expression literal");
        }
        this.#position += 1;
        this.#lastToken = this.#code.slice(startPosition, this.#position);
    };

    #consumeBlockComment = (): void => {
        this.#position += 2;
        while (!this.#atEnd()) {
            if (this.#peek(2) === "*/") {
                this.#position += 2;
                return;
            }
            this.#position += 1;
        }
        throw new SyntaxError("Unterminated block comment");
    };

    #consumeLineComment = (): void => {
        this.#position += 2;
        while (!this.#atEnd()) {
            if (isNewlineOrWhitespace(this.#peek())) {
                this.#position += 1;
                return;
            }
            this.#position += 1;
        }
    };

    #consumeWhitespaceAndComments = (): void => {
        while (!this.#atEnd()) {
            if (this.#peek(2) === "//") {
                this.#consumeLineComment();
            } else if (this.#peek(2) === "/*") {
                this.#consumeBlockComment();
            } else if (isNewlineOrWhitespace(this.#peek())) {
                this.#position += 1;
            } else {
                return;
            }
        }
    };

    #consumePunctuator = (): void => {
        this.#lastToken = this.#peek();
        this.#position += 1;
    };

    #consumeTemplateLiteralPart = (): TemplateTokenType => {
        const firstChar = this.#peek();
        this.#position += 1;

        while (!this.#atEnd() && this.#peek() !== "`" && this.#peek(2) !== "${") {
            if (this.#peek() === "\\") {
                this.#position += 1;
            }
            this.#position += 1;
        }

        if (this.#atEnd()) {
            throw new SyntaxError("Unterminated template literal");
        }

        if (firstChar === "`") {
            if (this.#peek() === "`") {
                this.#position += 1;
                return TemplateTokenType.template;
            }
            this.#position += 2;
            return TemplateTokenType.templateHead;
        }

        if (this.#peek() === "`") {
            this.#position += 1;
            return TemplateTokenType.templateEnd;
        }

        this.#position += 2;
        return TemplateTokenType.templateMiddle;
    };

    #consumeTemplateLiteral = (): void => {
        const startPosition = this.#position;
        let type = this.#consumeTemplateLiteralPart();
        this.#lastToken = this.#code.slice(startPosition, this.#position);

        if (type === TemplateTokenType.template) {
            return;
        }

        do {
            const startPosition = this.#position;
            type = this.#consumeTemplateLiteralPart();
            this.#lastToken = this.#code.slice(startPosition, this.#position);
        } while (type !== TemplateTokenType.templateEnd);
    };

    #consumeStringLiteral = (): string => {
        const startPosition = this.#position;
        const quote = this.#peek();
        this.#position += 1;

        while (!this.#atEnd() && this.#peek() !== quote) {
            if (this.#peek() === "\\") {
                this.#position += 1;
            }
            this.#position += 1;
        }
        if (this.#atEnd()) {
            throw new SyntaxError("Unterminated string literal");
        }
        this.#position += 1;
        this.#lastToken = this.#code.slice(startPosition, this.#position);
        return this.#lastToken;
    };

    #consumeParens = (): void => {
        const lastToken = this.#lastToken;
        this.#consumePunctuator();
        this.#tokenize(EndWhen.closingParenthesis);
        this.#consumePunctuator();
        this.#consumeWhitespaceAndComments();
        if (this.#peek() === "/" && isExpressionTerminator(lastToken)) {
            this.#consumeRegularExpression();
        }
    };

    #consumeBraces = (): void => {
        const lastToken = this.#lastToken;
        this.#consumePunctuator();
        this.#tokenize(EndWhen.closingBrace);
        this.#consumePunctuator();
        this.#consumeWhitespaceAndComments();
        if (this.#peek() === "/" && isExpressionTerminator(lastToken)) {
            this.#consumeRegularExpression();
        }
    };

    #consumeNamespaceImport = (): void => {
        this.#position += 1;
        this.#consumePunctuator();
        this.#consumeWhitespaceAndComments();
        this.#consumeSequence();
        this.#consumeWhitespaceAndComments();
        return this.#consumeSequence();
    };

    #consumeNamedImports = function* (this: Parser): Generator<[string, string]> {
        this.#position += 1;

        while (!this.#atEnd() && this.#peek() !== "}") {
            this.#consumeWhitespaceAndComments();
            const importedName = this.#consumeSequence();
            this.#consumeWhitespaceAndComments();
            if (isPunctuator(this.#peek())) {
                yield [importedName, importedName];
            } else {
                this.#consumeSequence();
                this.#consumeWhitespaceAndComments();
                const importedAs = this.#consumeSequence();
                yield [importedName, importedAs];
            }
        }
    };

    #consumeImport = (): void => {

    };

    #consumeExport = (): void => {

    };

    #consumeSequence = (): string => {

    };

    #tokenize = (endWhen: EndWhen): void => {
        this.#consumeWhitespaceAndComments();
        while (!this.#atEnd()) {
            if (this.#shouldStopTokenizing(endWhen)) {
                return;
            } else if (this.#peek() === "/") {
                if (isExpressionPunctuator(this.#lastToken)
                || isExpressionKeyword(this.#lastToken)) {
                    this.#consumeRegularExpression();
                } else {
                    this.#consumePunctuator();
                }
            } else if (this.#peek() === "`") {
                this.#consumeTemplateLiteral();
            } else if (isQuote(this.#peek())) {
                this.#consumeStringLiteral();
            } else if (this.#peek() === "(") {
                this.#consumeParens();
            } else if (this.#peek() === "{") {
                this.#consumeBraces();
            } else if (isPunctuator(this.#peek())) {
                this.#consumePunctuator();
            } else if (this.#peekSequence() === "import"
            && this.#lastToken !== ".") {
                this.#consumeImport();
            } else if (this.#peekSequence() === "export") {
                this.#consumeExport();
            } else {
                this.#consumeSequence();
            }

            this.#consumeWhitespaceAndComments();
        }

        if (this.#atEnd() && endWhen !== EndWhen.eof) {
            throw new SyntaxError("Unterminated production");
        }
    };

    parse(): ParseResult {
        if (this.#position === this.#code.length) {
            return this.#result;
        }
        this.#tokenize(EndWhen.eof);
        return this.#result;
    }
}
