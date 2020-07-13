import parse from "./parse.js";

console.time();
console.log(await parse(`
    import foo from "foo";
    import { foo, bar } from "foobar";

    export default class Baz {
        import = import('bar');
        export = 3;
    }

    const resource = new URL('./foo.js', import.meta.url);

    export { Baz as Boz };
    export const foo = 3;
`));
console.timeEnd();
