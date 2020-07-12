
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

    #consumeRegularExpression = (): void => {
    };

    #consumeWhitespaceAndComments = (): void => {
    };

    #consumePunctuator = (): void => {

    };

    #consumeTemplateLiteral = (): void => {

    };

    #consumeStringLiteral = (): void => {

    };

    #consumeParens = (): void => {

    };

    #consumeBraces = (): void => {

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
            }
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
