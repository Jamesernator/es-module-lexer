import fsp from "fs/promises";
import { performance } from "perf_hooks";

const CASES = new URL("./cases/", import.meta.url);

async function testPerformance(iterations=1000) {
    for (const file of await fsp.readdir(CASES)) {
        if (!file.endsWith(".case.js")) {
            continue;
        }
        const fileUrl = new URL(file, CASES);
        console.log(fileUrl);
    }
}

await testPerformance();
