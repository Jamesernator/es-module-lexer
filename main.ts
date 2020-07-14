import fs from "fs";
import parse from "./parse.js";

console.time();
console.log(await parse(
    fs.readFileSync("./test/samples/rollup.js", "utf8"),
));
console.timeEnd();
