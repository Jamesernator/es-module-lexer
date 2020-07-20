import fs from "fs";
import util from "util";
import parse from "./parse.js";

console.time();
console.log(util.inspect(await parse(
    fs.readFileSync("./sample.js", "utf8"),
), { depth: Infinity }));
console.timeEnd();
