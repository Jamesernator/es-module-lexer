#include <stdbool.h>
#include <stdint.h>

typedef uint16_t char16_t;

typedef struct {
    char16_t* start;
    int32_t length;
} String;

extern void syntaxError(int32_t start, int32_t length);

void raiseSyntaxError(String string) {
    syntaxError((int32_t)string.start, string.length);
}

typedef struct {
    String code;
    String lastToken;
    int32_t position;
} ParserState;

String s(char16_t* nullTerminatedString) {
    int32_t length = 0;
    for (char16_t* current = nullTerminatedString; *current != '\0'; current += 1) {
        length += 1;
    }
    return (String){ (char16_t*)nullTerminatedString, length };
}

char16_t charAt(String string, int32_t position) {
    return *(string.start + position);
}

String slice(String string, int32_t position, int32_t count) {
    if (string.length >= position + count) {
        return (String){ string.start + position, count };
    } else {
        return (String){ string.start + position, string.length - position };
    }
}

bool stringEqual(String string1, String string2) {
    if (string1.length != string2.length) {
        return false;
    }
    if (string1.start == string2.start) {
        return true;
    }
    for (int32_t i = 0; i < string1.length; i++) {
        if (*(string2.start + i) != *(string1.start + i)) {
            return false;
        }
    }
    return true;
}

bool isQuote(char ch) {
    return ch == '\'' || ch == '"';
}

bool isParenKeyword(String string) {
    return stringEqual(string, s(u"if"))
        || stringEqual(string, s(u"for"))
        || stringEqual(string, s(u"while"));
}

bool isExpressionTerminator(String string) {
    return stringEqual(string, s(u";"))
        || stringEqual(string, s(u")"))
        || stringEqual(string, s(u"finally"));
}

bool isPunctuator(char16_t ch) {
    return ch == '!'
        || ch == '%'
        || ch == '&'
        || ch > 39 && ch < 48
        || ch > 57 && ch < 64
        || ch == '['
        || ch == ']'
        || ch == '^'
        || ch > 122 && ch < 127;
}

bool isNewline(char16_t ch) {
    return ch == '\r' || ch == '\n';
}

bool isNewlineOrWhitespace(char16_t ch) {
    return ch > 8 && ch < 14
        || ch == 32
        || ch == 160;
}

bool isNewlineOrWhitespaceOrPunctuator(char16_t ch) {
    return isNewlineOrWhitespace(ch) || isPunctuator(ch);
}

bool isExpressionPunctuator(char16_t ch) {
    return ch == '!'
        || ch == '%'
        || ch == '&'
        || ch > 39 && ch < 47 && ch != 41
        || ch > 57 && ch < 64
        || ch == '['
        || ch == '^'
        || ch > 122 && ch < 127 && ch != '}';
}

bool isExpressionKeyword(String token) {
    return stringEqual(token, s(u"await"))
        || stringEqual(token, s(u"case"))
        || stringEqual(token, s(u"debugger"))
        || stringEqual(token, s(u"delete"))
        || stringEqual(token, s(u"do"))
        || stringEqual(token, s(u"else"))
        || stringEqual(token, s(u"in"))
        || stringEqual(token, s(u"instanceof"))
        || stringEqual(token, s(u"new"))
        || stringEqual(token, s(u"return"))
        || stringEqual(token, s(u"throw"))
        || stringEqual(token, s(u"typeof"))
        || stringEqual(token, s(u"void"))
        || stringEqual(token, s(u"yield"));
}

typedef enum {
    TEMPLATE = 1,
    TEMPLATE_HEAD,
    TEMPLATE_MIDDLE,
    TEMPLATE_END,
    REGULAR_EXPRESSION,
    STRING_LITERAL,
    PUNCTUATOR,
    SEQUENCE,
} TokenType;

char16_t peekChar(ParserState* state) {
    return charAt(state->code, state->position);
}

String peekString(ParserState* state, int32_t length) {
    return slice(state->code, state->position, length);
}

typedef enum {
    EOF,
    CLOSING_TEMPLATE,
    CLOSING_BRACE,
    CLOSING_PARENTHESIS,
} EndWhen;


void tokenize(ParserState* state, EndWhen endWhen);
void consumePunctuator(ParserState* state);
void consumeRegularExpression(ParserState* state);

void consumeLineComment(ParserState* state) {
    state->position += 1;
    while (state->position < state->code.length) {
        if (isNewline(peekChar(state))) {
            break;
        }
        state->position += 1;
    }
    if (state->position < state->code.length
    && isNewline(peekChar(state))) {
        state->position += 1;
    }
}

void consumeBlockComment(ParserState* state) {
    state->position += 2;
    while (state->position < state->code.length) {
        String nextTwoChars = peekString(state, 2);
        if (stringEqual(nextTwoChars, s(u"*/"))) {
            state->position += 2;
            return;
        }
        state->position += 1;
    }
    raiseSyntaxError(s(u"Failed to consume block comment"));
}

void consumeWhitespaceAndComments(ParserState* state) {
    while (state->position < state->code.length) {
        char16_t firstChar = peekChar(state);
        String firstTwoChars = peekString(state, 2);
        if (stringEqual(firstTwoChars, s(u"//"))) {
            consumeLineComment(state);
        } else if (stringEqual(firstTwoChars, s(u"/*"))) {
            consumeBlockComment(state);
        } else if (isNewlineOrWhitespace(firstChar)) {
            state->position += 1;
        } else {
            break;
        }
    }
}

TokenType consumeTemplateLiteralPart(ParserState* state) {
    char16_t firstChar = charAt(state->code, state->position);
    state->position += 1;

    while (state->position < state->code.length
    && peekChar(state) != '`'
    && !stringEqual(peekString(state, 2), s(u"${"))) {
        if (peekChar(state) == '\\') {
            state->position += 1;
        }
        state->position += 1;
    }

    if (state->position >= state->code.length) {
        raiseSyntaxError(s(u"Template literal reached end of code"));
    }

    if (firstChar == '`') {
        if (peekChar(state) == '`') {
            state->position += 1;
            return TEMPLATE;
        }
        state->position += 2;
        return TEMPLATE_HEAD;
    }

    if (peekChar(state) == '`') {
        state->position += 1;
        return TEMPLATE_END;
    }
    state->position += 2;
    return TEMPLATE_MIDDLE;
}

void addToken(ParserState* state, TokenType type, int32_t start, int32_t end) {
    state->lastToken = (String){ state->code.start + start, end - start };
}

void tokenizeTemplateLiteral(ParserState* state) {
    int32_t startPosition = state->position;

    TokenType type = consumeTemplateLiteralPart(state);
    addToken(state, type, startPosition, state->position);

    if (type == TEMPLATE) {
        return;
    }

    do {
        tokenize(state, CLOSING_TEMPLATE);
        int32_t startPosition = state->position;
        type = consumeTemplateLiteralPart(state);
        addToken(state, type, startPosition, state->position);
    } while (type != TEMPLATE_END);
}

void consumeStringLiteral(ParserState* state, char16_t quote) {
    int32_t startPosition = state->position;
    state->position += 1;
    
    while (state->position < state->code.length
    && peekChar(state) != quote) {
        if (peekChar(state) == '\\') {
            state->position += 1;
        }
        state->position += 1;
    }

    if (state->position >= state->code.length) {
        raiseSyntaxError(s(u"Unterminated string literal"));
    }
    state->position += 1;
}

void consumeParens(ParserState* state) {
    String lastToken = state->lastToken;
    consumePunctuator(state);
    tokenize(state, CLOSING_PARENTHESIS);
    consumePunctuator(state);
    consumeWhitespaceAndComments(state);
    if (peekChar(state) == '/' && isParenKeyword(lastToken)) {
        consumeRegularExpression(state);
    }
}

void consumeBraces(ParserState* state) {
    String lastToken = state->lastToken;
    consumePunctuator(state);
    tokenize(state, CLOSING_BRACE);
    consumePunctuator(state);
    consumeWhitespaceAndComments(state);
    if (peekChar(state) == '/' && isExpressionTerminator(lastToken)) {
        consumeRegularExpression(state);
    }
}

void consumePunctuator(ParserState* state) {
    addToken(state, PUNCTUATOR, state->position, state->position + 1);
    state->position += 1;
}

void consumeRestOfImport(ParserState* state) {

}

void consumeSequence(ParserState* state) {
    String priorToken = state->lastToken;
    int32_t startPosition = state->position;
    while (state->position < state->code.length
    && !isNewlineOrWhitespaceOrPunctuator(peekChar(state))) {
        state->position += 1;
    }
    addToken(state, SEQUENCE, startPosition, state->position);
    if (stringEqual(state->lastToken, s(u"import"))) {
        if (stringEqual(priorToken, s(u"."))) return;
        consumeRestOfImport(state);
    }
}

void consumeCharacterClass(ParserState* state) {
    state->position += 1;
    while (state->position < state->code.length
    && peekChar(state) != ']') {
        if (peekChar(state) == '\\') {
            state->position += 1;
        }
        state->position += 1;
    }

    if (state->position >= state->code.length) {
        raiseSyntaxError(s(u"Unterminated Character Class"));
    }
    state->position += 1;
}

void consumeRegularExpression(ParserState* state) {
    int32_t startPosition = state->position;
    state->position += 1;
    while (state->position < state->code.length
    && peekChar(state) != '/') {
        if (peekChar(state) == '[') {
            consumeCharacterClass(state);
            continue;
        }
        if (peekChar(state) == '\\') {
            state->position += 1;
        }
        state->position += 1;
    }
    if (state->position >= state->code.length) {
        raiseSyntaxError(s(u"Unterminated Regular Expression"));
    }
    state->position += 1;
    addToken(state, REGULAR_EXPRESSION, startPosition, state->position);
}

void tokenize(ParserState* state, EndWhen endWhen) {
    int i = 0;
    consumeWhitespaceAndComments(state);
    while (state->position < state->code.length) {
        if (endWhen == CLOSING_PARENTHESIS
        && peekChar(state) == ')') {
            return;
        } else if (endWhen == CLOSING_BRACE
        && peekChar(state) == '}') {
            return;
        } else if (endWhen == CLOSING_TEMPLATE
        && (peekChar(state) == '}' || peekChar(state) == '`')) {
            return;
        } else if (peekChar(state) == '/') {
            if (state->lastToken.length == 0
            || isExpressionPunctuator(charAt(state->lastToken, 0))
            || isExpressionKeyword(state->lastToken)) {
                consumeRegularExpression(state);
            } else {
                consumePunctuator(state);
            }
        } else if (peekChar(state) == '`') {
            tokenizeTemplateLiteral(state);
        } else if (isQuote(peekChar(state))) {
            consumeStringLiteral(state, peekChar(state));
        } else if (peekChar(state) == '(') {
            consumeParens(state);
        } else if (peekChar(state) == '{') {
            consumeBraces(state);
        } else if (isPunctuator(peekChar(state))) {
            consumePunctuator(state);
        } else {
            consumeSequence(state);
        }
        
        consumeWhitespaceAndComments(state);
    }

    if (endWhen != EOF) {
        raiseSyntaxError(s(u"Reached end without closure"));
    }
}

void parse(char16_t* start, int32_t length) {
    String code = (String){ start, length };
    String nullToken = s(u"");
    ParserState state = (ParserState){ code, nullToken, 0 };

    tokenize(&state, EOF);
}
