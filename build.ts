import fs from "fs/promises";
import sh from "shelljs";

sh.rm("-rf", "./dist/");
sh.mkdir("./dist/");
sh.rm("./.tsbuildinfo");
sh.exec("make all");
sh.exec("./node_modules/.bin/tsc --project ./tsconfig.build.json");

function encodeString(arrayBuffer: ArrayBuffer): string {
    return String.fromCharCode(...new Uint8Array(arrayBuffer));
}

const wasmBytes = await fs.readFile("./dist/lexer.wasm");
const parseFile = await fs.readFile("./dist/parse.js", "utf8");

const parseFileWithWasm = parseFile.replace(
    `"$$ENCODED_WASM$$"`,
    JSON.stringify(encodeString(wasmBytes)),
);

await fs.writeFile("./dist/parse.js", parseFileWithWasm);

sh.exec("./node_modules/.bin/rollup dist/module-shim.js --file dist/module-shim.umd.js --format umd --name ModuleShim");
sh.exec("./node_modules/.bin/rollup dist/module-shim.js --file dist/module-shim.script.js --format iife --name ModuleShim");
sh.exec("./node_modules/.bin/rollup dist/module-shim.js --file dist/module-shim.cjs --format cjs");
