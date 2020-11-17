import SystemModule from "./src/SystemModule.js";

const module = new SystemModule({
    imports: [],
    resolveModule: () => {
        throw new Error("");
    },
    createGenerator: {
        async: true,
        async* create(context: { exports: any }) {
            context.exports = {
                get foo() {
                    return foo;
                },
                get bar() {
                    // eslint-disable-next-line @typescript-eslint/no-use-before-define
                    return baz;
                },
            };
            const importContext = yield;
            console.log(importContext);

            function foo() {
                return 12;
            }

            const baz = 12;
        },
    },
});

await module.link();
console.log(module.namespace.bar);
await module.evaluate();
