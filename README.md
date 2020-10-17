
# Module Shim

## `Module`

This class represents the [Abstract Module Record](https://tc39.es/ecma262/#sec-abstract-module-records) in ECMA262.

One can create instances of `Module` by passing appropriate implementations of `link`, `evaluate`, `getExportedNames` and `resolveExport`. These are defined mostly equivalently to [the spec](https://tc39.es/ecma262/#table-abstract-methods-of-module-records).

The following shows an example of `Module` being used to implement `SyntheticModule`:

```ts
import Module from "./dist/Module.js";
import SourceTextModule from "./dist/SourceTextModule.js";

class SyntheticModule extends Module {
    #exports = Object.create(null);

    constructor(exportNames, evaluateCallback=() => {}) {
        exportNames = [...exportNames];
        super({
            getExportedNames: () => exportNames,
            resolveExport: (exportName) => {
                return {
                    module: this,
                    bindingName: exportName,
                    getBinding: () => this.#exports[exportName],
                };
            },
            link: () => {},
            evaluate: () => evaluateCallback(),
        });
        for (const exportName of exportNames) {
            this.#exports[exportName] = undefined;
        }
        Object.seal(this.#exports);
    }

    get exports() {
        return this.#exports;
    }
}

const syntheticModule = new SyntheticModule(['default']);
syntheticModule.exports.default = "Hello world!";

const mod = await SourceTextModule.create({
    source: `
        import foo from "synthetic";
        console.log(foo);
    `,
    resolveModule: (specifier) => {
        if (specifier === 'synthetic') {
            return syntheticModule;
        }
        throw new Error("Couldn't resolve module");
    },
});

await mod.link(() => {});
await mod.evaluate(); // prints Hello world!
```

## `CyclicModule`

This class implements the [Cyclic Module Record](https://tc39.es/ecma262/#sec-cyclic-module-records) in the spec.

TODO: Create example of WASM Module Record.

## `SourceTextModule`

This class is the most concrete and implements [Source Text Module Record](https://tc39.es/ecma262/#sec-source-text-module-records).

This can be used to construct module records from arbitrary ES module sources and evaluate them even in environments that don't support ESM.

This example shows how to create two ESM modules, link them together and evaluate them:

```js
import SourceTextModule from "./dist/SourceTextModule.js";

function resolveModule(specifier) {
    if (specifier === 'mod1') {
        return mod1;
    }
    throw new Error("No known module");
}

const mod1 = await SourceTextModule.create({
    source: `
        export const COOL_CONSTANT = 3;

        export default class FooBar {

        }

        export function baz() {

        } 
    `,
    resolveModule,
});

const mod2 = await SourceTextModule.create({
    source: `
        import FooBar, { COOL_CONSTANT as COOL, baz } from 'mod1';

        console.log(FooBar);
        console.log(COOL);
        console.log(baz);
    `,
    resolveModule,
});

// This links all modules, as SourceTextModule recursively calls link
// on imported modules
await mod2.link();
// Print some stuff
await mod2.evaluate();
```

## Building

Install `clang` and `build-essential`. (Other libraries may be needed depending on distribution to build `binaryen` and `wabt`).

Use `./install-deps.sh` to install and build binaryen and wabt locally.

Run `npm run build` to generate built files from sources into `./dist/`.
