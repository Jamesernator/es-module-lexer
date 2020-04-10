"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function consumeLineComment(code, position) {
    position += 1;
    while (position < code.length) {
        if (isNewline(code.substr(position, 1))) {
            break;
        }
    }
    return position;
}
function consumeBlockComment(code, position) {
    position += 2;
    while (position < code.length) {
        if (code.substr(position, 2) === "*/") {
            position += 2;
            return position;
        }
        position += 1;
    }
    throw new SyntaxError();
}
function consumeWhitespaceAndComments(code, position) {
    while (position <= code.length) {
        if (code.substr(position, 2) === "//") {
            position = consumeLineComment(code, position);
        }
        else if (code.substr(position, 2) === "/*") {
            position = consumeBlockComment(code, position);
        }
        else if (isNewlineOrWhitespace(code.substr(position, 1))) {
            position += 1;
        }
        else {
            break;
        }
    }
    return position;
}
function consumeToken(code, position) {
    while (!isNewlineOrWhitespace(code.substr(position, 1))) {
        position += 1;
    }
    return position;
}
function tokenize(code, tokens) {
    const tokenCount = 0;
    let position = 0;
    position = consumeWhitespaceAndComments(code, position);
    while (position < code.length) {
        const startPosition = position;
        position = consumeToken(code, position);
        tokens[position * 2] = startPosition;
        tokens[position * 2 + 1] = position;
        position = consumeWhitespaceAndComments(code, position);
    }
    return tokenCount;
}
function parseCode(code) {
    const tokens = new Uint32Array(code.length * 2);
    tokenize(code, tokens);
    return tokens;
}
exports.parseCode = parseCode;
