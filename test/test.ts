import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import vm from "vm";
import glob from "glob";
import type * as ModuleShim from "../dist/module-shim.js";
import TestContext from "./TestContext.js";
import parseTestComment from "./parseTestComment.js";

const TEST_CONFIG_FILE = new URL("./testConfig.json", import.meta.url);
const TESTS_DIR = fileURLToPath(new URL("./test262/test/", import.meta.url));

const MODULE_SHIM_URL = new URL("../dist/module-shim.script.js", import.meta.url);
const MODULE_SHIM = new vm.Script(await fs.readFile(MODULE_SHIM_URL, "utf8"), {
    filename: fileURLToPath(MODULE_SHIM_URL),
});


class PathLoader {
    #moduleShim: typeof ModuleShim;
    #paths = new Map<ModuleShim.Module, string>();
    #resolvedPaths = new Map<string, ModuleShim.Module>();

    constructor(moduleShim: typeof ModuleShim) {
        this.#moduleShim = moduleShim;
    }

    async resolve(
        modulePath: string,
        parentModule?: ModuleShim.Module,
    ): Promise<ModuleShim.Module> {
        if (parentModule === undefined) {
            if (!path.isAbsolute(modulePath)) {
                throw new Error(`modulePath must be absolute if no parent module is specified`);
            }
        } else {
            const basePath = this.#paths.get(parentModule);
            if (basePath === undefined) {
                throw new Error("parentModule must be resolved to a path");
            }
            modulePath = path.join(path.dirname(basePath), modulePath);
        }
        modulePath = path.normalize(modulePath);
        const resolvedModule = this.#resolvedPaths.get(modulePath);
        if (resolvedModule) {
            return resolvedModule;
        }
        const source = await fs.readFile(modulePath, "utf8");
        const module = await this.#moduleShim.SourceTextModule.create({
            source,
            resolveModule: (specifier, parent) => {
                return this.resolve(specifier, parent);
            },
            importModuleDynamically: async (specifier, parent) => {
                const importedModule = await this.resolve(specifier, parent);
                await importedModule.link();
                importedModule.evaluate();
                return importedModule;
            },
        });
        this.#resolvedPaths.set(modulePath, module);
        this.#paths.set(module, modulePath);
        return module;
    }
}

async function runTest(file: string): Promise<void> {
    const content = await fs.readFile(file, "utf8");
    const config = parseTestComment(content);

    if (!config.flags?.includes("module")) {
        return;
    }

    if (config.negative?.phase === "early"
    || config.negative?.phase === "parse") {
        return;
    }

    const isAsync = config.flags.includes("async");

    if (isAsync) {
        // TODO:
        return;
    }

    const testContext = new TestContext();

    for (const includedFile of config.includes ?? []) {
        await testContext.includeHarnessFile(includedFile);
    }

    testContext.runScript(MODULE_SHIM);
    testContext.globalThis.console = console;
    const moduleShim = testContext.globalThis.ModuleShim as typeof ModuleShim;
    const loader = new PathLoader(moduleShim);
    try {
        const module = await loader.resolve(file);
        await module.link();

        try {
            module.evaluate();
        } catch (err) {
            if (config.negative?.phase === "runtime") {
                return;
            }
            throw err;
        }
    } catch (err) {
        if (config.negative?.phase === "resolution"
        && config.negative.type === err?.constructor.name) {
            return;
        }
        throw err;
    }
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
        try {
            await runTest(testFile);
        } catch (err) {
            const relativeTestFile = path.normalize(
                path.relative(TESTS_DIR, testFile),
            );
            const allowedFailure = testConfig.allowedFailures
                .find((allowedFailure) => {
                    return allowedFailure.files
                        .map((file) => path.normalize(file))
                        .includes(relativeTestFile);
                });
            if (!allowedFailure?.expectedError
            || allowedFailure.expectedError !== err?.constructor.name) {
                console.log(relativeTestFile);
                throw err;
            }
        }
    }
}

await runTests();
