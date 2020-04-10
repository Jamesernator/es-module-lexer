import fs from "fs";
import loader from "@assemblyscript/loader";

type Parser = {

};

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
                throw new SyntaxError(instance.__getString(strPtr));
            },
        },
    },
);

const code = `
    function foo() {
        yield /foo/;
    }
`;

const str = instance.__retain(instance.__allocString(code));
const tokens = instance.__getUint32Array(instance.parseCode(str));

for (let i = 0; i < code.length; i += 1) {
    const [tokenType, start, end] = tokens.subarray(i*3, i*3+3);
    if (tokenType === 0) {
        break;
    }
    console.log(tokenType, code.slice(start, end));
}

console.log();
