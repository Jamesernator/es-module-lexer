import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import glob from "glob";
import type * as ModuleShim from "../dist/module-shim.js";
import TestContext from "./TestContext.js";
import parseTestComment from "./parseTestComment.js";

const TEST_CONFIG_FILE = new URL("./testConfig.json", import.meta.url);
const TESTS_DIR = fileURLToPath(new URL("./test262/test/", import.meta.url));
const MODULE_SHIM = await fs.readFile(
    new URL("../dist/module-shim.script.js", import.meta.url),
    "utf8",
);

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
            modulePath = path.join(basePath, modulePath);
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
        return module;
    }
}

async function runTest(file: string): Promise<void> {
    const content = await fs.readFile(file, "utf8");
    const config = parseTestComment(content);

    if (!config.flags?.includes("module")) {
        return;
    }

    const isAsync = config.flags.includes("async");

    if (isAsync) {
        // TODO:
        return;
    }

    const testContext = new TestContext();

    for (const includedFile of config.includes ?? []) {
        await testContext.include(includedFile);
    }

    testContext.runScript(MODULE_SHIM);
    const moduleShim = testContext.globalThis.ModuleShim as typeof ModuleShim;
}

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
