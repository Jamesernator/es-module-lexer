import fs from 'fs';

const module = new WebAssembly.Module(fs.readFileSync(
    new URL('./lib/lexer.wasm', import.meta.url)
));


