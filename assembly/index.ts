
declare function addImport(string: string): void;
declare function syntaxError(string: string): void;

export declare namespace console {
    export function log(f: string): void;
}

class ParserState {
    public code: string;
    public tokens: Uint32Array;
    public tokenCount: i32;
    public position: i32;

    constructor(code: string, tokens: Uint32Array) {
        this.code = code;
        this.tokens = tokens;
        this.tokenCount = 0;
        this.position = 0;
    }
}

function isPunctuator(char: string): boolean {
    const codePoint = char.codePointAt(0);
    return char == "!"
        || char == "%"
        || char == "&"
        || codePoint > 39 && codePoint < 48
        || codePoint > 57 && codePoint < 64
        || char == "["
        || char == "]"
        || char == "^"
        || codePoint > 122 && codePoint < 127;
}

function isNewline(char: string): boolean {
    return char == "\r" || char == "\n";
}

function isNewlineOrWhitespace(char: string): boolean {
    const codePoint = char.codePointAt(0);
    return codePoint > 8 && codePoint < 14
        || codePoint == 32
        || codePoint == 160;
}

function isNewlineOrWhitespaceOrPunctuator(char: string): boolean {
    return isNewlineOrWhitespace(char) || isPunctuator(char);
}

function isExpressionPunctuator(char: string): boolean {
    const codePoint = char.codePointAt(0);
    return char == "!"
        || char == "%"
        || char == "&"
        || codePoint > 39 && codePoint < 47 && codePoint != 41
        || codePoint > 57 && codePoint < 64
        || char == "["
        || char == "^"
        || codePoint > 122 && codePoint < 127 && char != "}";
}

function isExpressionKeyword(token: string): boolean {
    return token == "await"
        || token == "case"
        || token == "debugger"
        || token == "delete"
        || token == "do"
        || token == "else"
        || token == "in"
        || token == "instanceof"
        || token == "new"
        || token == "return"
        || token == "throw"
        || token == "typeof"
        || token == "void"
        || token == "yield";
}

enum TokenType {
    TEMPLATE = 1,
    TEMPLATE_HEAD,
    TEMPLATE_MIDDLE,
    TEMPLATE_END,
    REGULAR_EXPRESSION,
    STRING_LITERAL,
    PUNCTUATOR,
    SEQUENCE,
}

function consumeString(state: ParserState, string: string): void {
    if (state.code.substr(state.position, string.length) != string) {
        syntaxError(`Failed to consume string ${ string }`);
    }
    state.position += string.length;
}

function consumeLineComment(state: ParserState): void {
    state.position += 1;
    while (state.position < state.code.length) {
        if (isNewline(state.code.substr(state.position, 1))) {
            break;
        }
        state.position += 1;
    }
    if (isNewline(state.code.substr(state.position, 1))) {
        state.position += 1;
    }
}

function consumeBlockComment(state: ParserState): void {
    state.position += 2;
    while (state.position < state.code.length) {
        if (state.code.substr(state.position, 2) == "*/") {
            state.position += 2;
        }
        state.position += 1;
    }
    syntaxError(`Failed to consume block comment`);
}


function consumeWhitespaceAndComments(state: ParserState): void {
    while (state.position < state.code.length) {
        if (state.code.substr(state.position, 2) == "//") {
            consumeLineComment(state);
        } else if (state.code.substr(state.position, 2) == "/*") {
            consumeBlockComment(state);
        } else if (isNewlineOrWhitespace(state.code.substr(state.position, 1))) {
            state.position += 1;
        } else {
            break;
        }
    }
}

function consumeTemplateLiteralPart(state: ParserState): TokenType {
    const first = state.code.substr(state.position, 1);
    state.position += 1;

    while (state.position < state.code.length
    && state.code.substr(state.position, 1) != "`"
    && state.code.substr(state.position, 2) != "${") {
        if (state.code.substr(state.position, 1) == "\\") {
            state.position += 1;
        }
        state.position += 1;
    }

    if (state.position == state.code.length) {
        syntaxError(`Template literal reached end of code`);
    }

    if (first == "`") {
        if (state.code.substr(state.position, 1) == "`") {
            state.position += 1;
            return TokenType.TEMPLATE;
        }
        state.position += 2;
        return TokenType.TEMPLATE_HEAD;
    }

    if (state.code.substr(state.position, 1) == "`") {
        state.position += 1;
        return TokenType.TEMPLATE_END;
    }

    state.position += 2;
    return TokenType.TEMPLATE_END;
}

enum EndWhen {
    EOF,
    CLOSING_TEMPLATE,
    CLOSING_BRACE,
    CLOSING_PARENTHESIS,
}

function addToken(state: ParserState, type: TokenType, start: i32, end: i32): void {
    state.tokens[state.tokenCount * 3] = type;
    state.tokens[state.tokenCount * 3 + 1] = start;
    state.tokens[state.tokenCount * 3 + 2] = end;
    state.tokenCount += 1;
}

function tokenizeTemplateLiteral(state: ParserState): void {
    const startPosition = state.position;

    let type = consumeTemplateLiteralPart(state);
    addToken(state, type, startPosition, state.position);

    if (type == TokenType.TEMPLATE) {
        return;
    }

    do {
        tokenize(state, EndWhen.CLOSING_TEMPLATE);
        const startPosition = state.position;
        type = consumeTemplateLiteralPart(state);
        addToken(state, type, startPosition, state.position);
    } while (type != TokenType.TEMPLATE_END);
}

function isQuote(char: string): boolean {
    return char == `'` || char == `"`;
}

function consumeStringLiteral(state: ParserState): void {
    const startPosition = state.position;
    const quote = state.code.substr(state.position, 1);

    while (state.position < state.code.length
    && state.code.substr(state.position, 1) != quote) {
        if (state.code.substr(state.position, 1) == "\\") {
            state.position += 1;
        }
        state.position += 1;
    }

    consumeString(state, quote);
    addToken(state, TokenType.STRING_LITERAL, startPosition, state.position);
}

function consumeParens(state: ParserState): void {
    consumePunctuator(state);
    tokenize(state, EndWhen.CLOSING_PARENTHESIS);
    consumePunctuator(state);
}

function consumeBraces(state: ParserState): void {
    consumePunctuator(state);
    tokenize(state, EndWhen.CLOSING_BRACE);
    consumePunctuator(state);
}

function consumePunctuator(state: ParserState): void {
    addToken(state, TokenType.PUNCTUATOR, state.position, state.position + 1);
    state.position += 1;
}

function consumeSequence(state: ParserState): void {
    const startPosition = state.position;
    while (!isNewlineOrWhitespaceOrPunctuator(state.code.substr(state.position, 1))) {
        state.position += 1;
    }
    addToken(state, TokenType.SEQUENCE, startPosition, state.position);
}

function toName(endWhen: EndWhen): string {
    switch (endWhen) {
    case EndWhen.CLOSING_BRACE:
        return "CLOSING_BRACE";
    case EndWhen.CLOSING_PARENTHESIS:
        return "CLOSING_PARENTHESIS";
    case EndWhen.CLOSING_TEMPLATE:
        return "CLOSING_TEMPLATE";
    default:
        return "EOF";
    }
}

function lastToken(state: ParserState): string {
    const lastTokenOffset = 3 * (state.tokenCount - 1);
    return state.code.slice(
        state.tokens[lastTokenOffset + 1],
        state.tokens[lastTokenOffset + 2],
    );
}



function tokenize(state: ParserState, endWhen: EndWhen=EndWhen.EOF): void {
    consumeWhitespaceAndComments(state);

    while (state.position < state.code.length) {
        if (endWhen == EndWhen.CLOSING_PARENTHESIS
        && state.code.substr(state.position, 1) == ")") {
            return;
        } else if (endWhen == EndWhen.CLOSING_BRACE
        && state.code.substr(state.position, 1) == "}") {
            return;
        } else if (endWhen == EndWhen.CLOSING_TEMPLATE
        && (state.code.substr(state.position, 1) == "}"
        || state.code.substr(state.position, 1) == "`")) {
            return;
        } else if (state.code.substr(state.position, 1) == "/") {
            if (state.tokenCount == 0
            || isExpressionPunctuator(lastToken(state))
            || isExpressionKeyword(lastToken(state))) {
                syntaxError("Not ready yet");
            } else {
                consumePunctuator(state);
            }
        } else if (state.code.substr(state.position, 1) == "`") {
            tokenizeTemplateLiteral(state);
        } else if (isQuote(state.code.substr(state.position, 1))) {
            consumeStringLiteral(state);
        } else if (state.code.substr(state.position, 1) == "(") {
            consumeParens(state);
        } else if (state.code.substr(state.position, 1) == "{") {
            consumeBraces(state);
        } else if (isPunctuator(state.code.substr(state.position, 1))) {
            consumePunctuator(state);
        } else {
            consumeSequence(state);
        }

        consumeWhitespaceAndComments(state);
    }

    if (endWhen != EndWhen.EOF) {
        // eslint-disable-next-line
        syntaxError('Reached end without closure of ' + toName(endWhen));
    }
}

export function parseCode(code: string): Uint32Array {
    const state: ParserState = new ParserState(
        code,
        new Uint32Array(code.length * 3),
    );

    tokenize(state);

    return state.tokens;
}
