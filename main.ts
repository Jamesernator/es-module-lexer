import fs from "fs";
import loader from "@assemblyscript/loader";

const instance = loader.instantiateSync(
    fs.readFileSync("./build/optimized.wasm"),
    {
        index: {
            "console.log"(strPtr: number) {
                console.log(instance.__getString(strPtr));
            },
            addImport: (i: number) => {
                console.log(instance.__getString(i));
            },
            syntaxError(strPtr: number) {
                // throw new SyntaxError(instance.__getString(strPtr));
            },
        },
    },
);

/*
const code = `
    function foo() {
        yield /foo/;
    }
`;
//*/

const code = fs.readFileSync("./test/samples/d3.js", "utf8");

const str = instance.__retain(instance.__allocString(code));
console.time("Tokenize");
const tokens = instance.__getUint32Array(instance.parseCode(str));
console.timeEnd("Tokenize");

const tokenList: Array<string> = [];
for (let i = 0; i < code.length; i += 1) {
    const [tokenType, start, end] = tokens.subarray(i*3, i*3+3);
    if (tokenType === 0) {
        break;
    }
    tokenList.push(code.slice(start, end));
}

console.log(JSON.stringify(tokenList, null, 4));
