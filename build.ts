import sh from "shelljs";

sh.exec("make all");
sh.rm("./.tsbuildinfo");
sh.exec("npx tsc -- --project tsconfig.base.json");

function encodeBase64(arrayBuffer: ArrayBuffer): string {

}
