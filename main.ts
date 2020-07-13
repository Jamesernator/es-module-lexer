import parse from "./parse.js";


console.log(await parse(`
    import foo from "foo";
    import { foo, bar } from "foobar";

    export default class Baz {
        import = import('bar');
        export = 3;
    }

    export { Baz as Boz };
    export const foo = 3;
`));
