import fs from "fs";
import loader from "@assemblyscript/loader";
console.time("Instantiate");
const instance = loader.instantiateSync(fs.readFileSync("./build/optimized.wasm"), {
    index: {
        "console.log"(strPtr) {
            console.log(instance.__getString(strPtr));
        },
        addImport: (i) => {
            console.log(instance.__getString(i));
        },
        syntaxError(strPtr) {
            // throw new SyntaxError(instance.__getString(strPtr));
        },
    },
});
console.timeEnd("Instantiate");
/*
const code = `
    function foo() {
        yield /foo/;
    }
`;
//*/
console.time("Allocate Code");
const code = fs.readFileSync("./test/samples/d3.js", "utf8");
console.timeEnd("Allocate Code");
const str = instance.__retain(instance.__allocString(code));
console.time("Tokenize");
const tokens = instance.__getUint32Array(instance.parseCode(str));
console.timeEnd("Tokenize");
const tokenList = [];
for (let i = 0; i < code.length; i += 1) {
    const [tokenType, start, end] = tokens.subarray(i * 3, i * 3 + 3);
    if (tokenType === 0) {
        break;
    }
    tokenList.push(code.slice(start, end));
}
//# sourceMappingURL=main.js.map