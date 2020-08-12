import fs from "fs";
import util from "util";
import parse from "./parse.js";

const ast = await parse(
    fs.readFileSync("./test/samples/d3.js", "utf8"),
);

console.log(util.inspect(ast, { depth: Infinity }));
