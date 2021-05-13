import fs from "fs/promises";
import path from "path";
import type * as ModuleShim from "../dist/module-shim.js";

export default class PathLoader {
    readonly #moduleShim: typeof ModuleShim;
    readonly #paths = new Map<ModuleShim.Module, string>();
    readonly #resolvedModules = new Map<string, Promise<ModuleShim.Module>>();

    constructor(moduleShim: typeof ModuleShim) {
        this.#moduleShim = moduleShim;
    }

    #createModule = async (modulePath: string): Promise<ModuleShim.Module> => {
        const source = await fs.readFile(modulePath, "utf8");
        const module = await this.#moduleShim.SourceTextModule.fromSource({
            source,
            resolveModule: (specifier, parent) => {
                return this.resolve(specifier, parent);
            },
            importModuleDynamically: async (specifier, parent) => {
                const importedModule = await parent.resolveModule(specifier);
                await importedModule.link();
                await importedModule.evaluate();
            },
        });
        this.#paths.set(module, modulePath);
        return module;
    };

    #normalizePath = (
        modulePath: string,
        parentModule?: ModuleShim.Module,
    ): string => {
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
        return path.normalize(modulePath);
    };

    resolve(
        modulePath: string,
        parentModule?: ModuleShim.Module,
    ): Promise<ModuleShim.Module> {
        modulePath = this.#normalizePath(modulePath, parentModule);
        const resolvedModule = this.#resolvedModules.get(modulePath);
        if (resolvedModule) {
            return resolvedModule;
        }

        const modulePromise = this.#createModule(modulePath);
        this.#resolvedModules.set(modulePath, modulePromise);
        return modulePromise;
    }
}
