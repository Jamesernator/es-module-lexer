import fs from 'fs';

const module = new WebAssembly.Module(fs.readFileSync(
    new URL('./lib/lexer.wasm', import.meta.url)
));

const PAGE_SIZE = 2**16;

export default function parse(code) {
    const instance = new WebAssembly.Instance(module, {
        env: {
            syntaxError(start, length) {
                const characters = new Uint16Array(instance.exports.memory.buffer, start, length);
                throw new SyntaxError(String.fromCharCode(...characters));
            },
            _log(start, length) {
                const characters = new Uint16Array(instance.exports.memory.buffer, start, length);
                console.log(String.fromCharCode(...characters));
            },
            consoleLogInt(int) {
                console.log(int);
            },
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
}

const code = fs.readFileSync('./test/samples/d3.js', 'utf8');

console.log(parse(code))
