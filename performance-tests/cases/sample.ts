import type { ModuleContext } from "../../dist/SystemModule.js";

type CommonOpts = {
    imports: Array<string>,
    delegatedExports?: DelegatedExports,
};

type SyncSystemOpts = CommonOpts & {
    async?: false,
};

type AsyncSystemOpts = CommonOpts & {
    async: true,
};

declare global {
    function register(
        opts: SyncSystemOpts,
        moduleFunc: (exports: {}) => Generator<void, void, ModuleContext>,
    ): void;
    function register(
        opts: AsyncSystemOpts,
        moduleFunc: (exports: {}) => AsyncGenerator<void, void, ModuleContext>,
    ): void;
}

export {};

register(
    { async: true, imports: ["./foo.js"] },
    async function* moduleFunc(exports: {}): AsyncGenerator<void, void, ModuleContext> {
        Object.assign(exports, {
            get foo() {
                return foo;
            },
        });

        const { imports, dynamicImport, importMeta } = yield;

        function foo() {
            return 12;
        }

        console.log(imports[0].bar);

        await dynamicImport("./bar.js");

        console.log(importMeta);
    },
);
