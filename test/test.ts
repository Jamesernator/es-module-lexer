import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import glob from "glob";
import yaml from "js-yaml";
import type Module from "../dist/Module.js";
import type SourceTextModule from "../dist/SourceTextModule.js";
import TestContext from "./TestContext.js";

function linesBetween(
    string: string,
    startLine: string,
    endLine: string,
): string {
    const lines = string.split(/\n/gu);
    return lines.slice(
        lines.findIndex((line) => line.trim() === startLine) + 1,
        lines.findIndex((line) => line.trim() === endLine),
    ).join("\n");
}

type TestConfig = {
    flags?: Array<string>,
    negative?: {
        phase: "parse" | "early" | "resolution" | "runtime",
        type: string,
    },
    includes?: Array<string>,
};

function parseTestComment(sourceCode: string): TestConfig {
    return yaml.load(linesBetween(
        sourceCode,
        "/*---",
        "---*/",
    ));
}

async function resolveModule(
    specifier: string,
    parentModule?: Module,
): SourceTextModule {

}

async function runTest(file: string): Promise<void> {
    const content = await fs.readFile(file, "utf8");
    const config = parseTestComment(content);

    if (!config.flags?.includes("module")) {
        return;
    }
    if (config.flags.includes("async")) console.log(content);

    const testContext = new TestContext();
}

const TEST_CONFIG_FILE = new URL("./testConfig.json", import.meta.url);
const TESTS_DIR = fileURLToPath(new URL("./test262/test/", import.meta.url));

async function runTests() {
    const testConfig = JSON.parse(
        await fs.readFile(TEST_CONFIG_FILE, "utf8"),
    ) as { files: Array<string> };

    const testFiles = testConfig.files
        .flatMap((pattern) => glob.sync(pattern, { cwd: TESTS_DIR }))
        .map((file) => path.join(TESTS_DIR, file))
        .filter((file) => !file.endsWith("_FIXTURE.js"));

    for (const testFile of testFiles) {
        await runTest(testFile);
    }
}

await runTests();
