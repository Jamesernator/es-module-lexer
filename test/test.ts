import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import vm from "vm";
import chalk from "chalk";
import glob from "glob";
import type * as ModuleShim from "../dist/module-shim.js";
import PathLoader from "./PathLoader.js";
import TestContext from "./TestContext.js";
import parseTestComment from "./parseTestComment.js";

const TEST_CONFIG_FILE = new URL("./testConfig.json", import.meta.url);
const TESTS_DIR = fileURLToPath(new URL("./test262/test/", import.meta.url));

const MODULE_SHIM_URL = new URL("../dist/module-shim.script.js", import.meta.url);
const MODULE_SHIM = new vm.Script(await fs.readFile(MODULE_SHIM_URL, "utf8"), {
    filename: fileURLToPath(MODULE_SHIM_URL),
});


async function runTest(file: string): Promise<"success" | "skipped"> {
    const content = await fs.readFile(file, "utf8");
    const config = parseTestComment(content);

    if (!config.flags?.includes("module")) {
        return "skipped";
    }

    if (config.negative?.phase === "early"
    || config.negative?.phase === "parse") {
        return "skipped";
    }

    const isAsync = config.flags.includes("async");

    const testContext = new TestContext();

    for (const includedFile of config.includes ?? []) {
        await testContext.includeHarnessFile(includedFile);
    }

    testContext.runScript(MODULE_SHIM);
    // eslint-disable-next-line require-atomic-updates
    testContext.globalThis.console = console;
    const moduleShim = testContext.globalThis.ModuleShim as typeof ModuleShim;
    const loader = new PathLoader(moduleShim);
    try {
        const module = await loader.resolve(file);
        await module.link();

        try {
            let done: Promise<void> = Promise.resolve();
            if (isAsync) {
                done = new Promise((resolve, reject) => {
                    testContext.globalThis.$DONE = (error?: any) => {
                        if (error === undefined) {
                            resolve();
                        } else {
                            reject(error);
                        }
                    };
                });
            }
            module.evaluate();
            if (isAsync) {
                await done;
            }
        } catch (err) {
            if (config.negative?.phase === "runtime") {
                return "success";
            }
            throw err;
        }
    } catch (err) {
        if (config.negative?.phase === "resolution"
        && config.negative.type === err?.constructor.name) {
            return "success";
        }
        throw err;
    }
    return "success";
}

async function runTests() {
    const testConfig = JSON.parse(
        await fs.readFile(TEST_CONFIG_FILE, "utf8"),
    ) as {
        files: Array<string>,
        allowedFailures: Array<{
            files: Array<string>,
            expectedError: string,
        }>,
    };

    const testFiles = testConfig.files
        .flatMap((pattern) => glob.sync(pattern, { cwd: TESTS_DIR }))
        .map((file) => path.normalize(path.join(TESTS_DIR, file)))
        .filter((file) => !file.endsWith("_FIXTURE.js"));

    for (const testFile of testFiles) {
        const relativeTestFile = path.normalize(
            path.relative(TESTS_DIR, testFile),
        );
        try {
            const result = await runTest(testFile);
            if (result !== "skipped") {
                console.log(chalk.green(`✔ ${ relativeTestFile }`));
            }
        } catch (err) {
            const allowedFailure = testConfig.allowedFailures
                .find((allowedFailure) => {
                    return allowedFailure.files
                        .map((file) => path.normalize(file))
                        .includes(relativeTestFile);
                });
            if (!allowedFailure?.expectedError
            || allowedFailure.expectedError !== '*any*'
            && allowedFailure.expectedError !== err?.constructor?.name) {
                console.log(chalk.red(`✘ ${ relativeTestFile }`));
                throw err;
            }
        }
    }
}

await runTests();
