import fs from "fs/promises";
import path from "path";
import type * as ModuleShim from "../dist/module-shim.js";

export default class PathLoader {
    #moduleShim: typeof ModuleShim;
    #paths = new Map<ModuleShim.Module, string>();
    #resolvedModules = new Map<string, Promise<ModuleShim.Module>>();

    constructor(moduleShim: typeof ModuleShim) {
        this.#moduleShim = moduleShim;
    }

    #createModule = async (modulePath: string): Promise<ModuleShim.Module> => {
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
        this.#paths.set(module, modulePath);
        return module;
    };

    resolve(
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
        const resolvedModule = this.#resolvedModules.get(modulePath);
        if (resolvedModule) {
            return resolvedModule;
        }

        const modulePromise = this.#createModule(modulePath);
        this.#resolvedModules.set(modulePath, modulePromise);
        return modulePromise;
    }
}
