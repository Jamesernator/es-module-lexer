import fs from 'fs';

const module = new WebAssembly.Module(fs.readFileSync(
    new URL('./lib/lexer.wasm', import.meta.url)
));

const PAGE_SIZE = 2**16;

export default function parse(code) {
    const imports = [];
    const importMetas = [];
    const dynamicImports = [];
    const exports = [];

    let _import = null;

    const readString = (start, length) => {
        const characters = new Uint16Array(
            instance.exports.memory.buffer,
            start, 
            length,
        );
        return String.fromCharCode(...characters);
    }

    const instance = new WebAssembly.Instance(module, {
        env: {
            syntaxError(start, length) {
                throw new SyntaxError(readString(start, length));
            },
            openImport(startPosition) {
                _import = {
                    startPosition,
                    imports: Object.create(null),
                };
            },
            emitImportName(
                importNameStart,
                importNameLength,
                asNameStart,
                asNameLength,
            ) {
                if (!_import) {
                    throw new Error("Emitted name without import")
                }
                _import.imports[readString(importNameStart, importNameLength)]
                    = readString(asNameStart, asNameLength);
            },
            finalizeImport(endPosition, specifierStart, specifierLength) {
                if (!_import) {
                    throw new Error("Emitted import without opening");
                }
                imports.push({
                    startPosition: _import.startPosition,
                    endPosition,
                    specifier: readString(specifierStart, specifierLength),
                    imports: _import.imports,
                });
                _import = null;
            },
            emitImportMeta(
                startPosition,
                endPosition,
            ) {
                importMetas.push({ startPosition, endPosition });
            },
            emitDynamicImport() {
                console.log('dynamic import');
            },
            _consoleLog(start, length) {
                console.log(readString(start, length));
            },
            _consoleLogInt(int) {
                console.log(int);
            }
        },
    });

    const initialPage = instance.exports.memory.grow(Math.ceil(code.length / PAGE_SIZE * Uint16Array.BYTES_PER_ELEMENT));
    const characterArray = new Uint16Array(code.length);
    for (let i = 0; i < code.length; i++) {
        characterArray[i] = code[i].charCodeAt(0);
    }

    
    const memory = new Uint16Array(instance.exports.memory.buffer);
    memory.set(characterArray, initialPage*PAGE_SIZE / Uint16Array.BYTES_PER_ELEMENT);

    instance.exports.parse(initialPage*PAGE_SIZE, code.length);

    return { imports, importMetas, dynamicImports, exports };
}

const code = fs.readFileSync('./test/samples/rollup.js', 'utf8');

console.log(parse(code))
