import fs from "fs/promises";
import vm from "vm";
import type { Realm } from "../src/Realm.js";

const HARNESS_DIR = new URL("./test262/harness/", import.meta.url);
const BOOTSTRAP_SCRIPTS = await Promise.all([
    "./assert.js",
    "./sta.js",
]
    .map((file) => new URL(file, HARNESS_DIR))
    .map((file) => fs.readFile(file, "utf8")));

type $262 = {
    createRealm: () => $262,
    detachArrayBuffer: (arrayBuffer: ArrayBuffer) => void,
    evalScript: (scriptSource: string) => any,
    gc: () => void,
    global: typeof globalThis,
    agent: {
        start: (scriptSource: string) => void,
        broadcast: (sharedBuffer: SharedArrayBuffer, i: number | bigint) => void,
        getReport: () => string | null,
        sleep: (duration: number) => void,
        monotonicNow: () => number,
    },
};

export default class TestContext {
    readonly #context: any;
    readonly #globalThis: typeof globalThis & { [key: string]: any };
    readonly #_262: $262;

    constructor() {
        this.#context = vm.createContext();
        this.#globalThis = vm.runInContext("globalThis", this.#context);
        for (const script of BOOTSTRAP_SCRIPTS) {
            vm.runInContext(script, this.#context);
        }
        let time = 0;
        const InRealmError = this.#globalThis.Error;
        this.#_262 = {
            createRealm: this.#wrap(() => {
                return new TestContext().#_262;
            }),
            detachArrayBuffer: this.#wrap(() => {
                throw new InRealmError("Can't use detachArrayBuffer");
            }),
            evalScript: this.#wrap((scriptSource) => {
                return vm.runInContext(scriptSource, this.#context);
            }),
            gc: this.#wrap(() => {
                throw new InRealmError("Can't use gc()");
            }),
            global: this.#globalThis,
            agent: {
                start: this.#wrap(() => {
                    throw new InRealmError("agent.start() not supported");
                }),
                broadcast: this.#wrap(() => {
                    throw new InRealmError("agent.broadcast() not supported");
                }),
                getReport: this.#wrap(() => {
                    throw new InRealmError("agent.getReport() not supported");
                }),
                sleep: this.#wrap((duration) => {
                    const end = Date.now() + duration;
                    while (Date.now() < end) {
                        // busy loop until Date.now() >
                    }
                }),
                monotonicNow: () => {
                    time += 1;
                    return time;
                },
            },
        };
        Object.setPrototypeOf(this.#_262.agent, this.#globalThis.Object.prototype);
        Object.setPrototypeOf(this.#_262, this.#globalThis.Object.prototype);
    }

    #wrap = <Args extends Array<any>, Return>(
        func: (...args: Args) => Return,
    ): (...args: Args) => Return => {
        return new this.#globalThis.Function("func", `
            return function(...args) {
                return func.apply(this, args);
            };
        `)(func);
    };

    get context(): any {
        return this.#context;
    }

    get globalThis(): any {
        return this.#globalThis;
    }

    runScript(scriptSource: string): any {
        return vm.runInContext(scriptSource, this.#context);
    }
}
