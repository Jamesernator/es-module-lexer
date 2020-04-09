import loader from "@assemblyscript/loader";


const instance = await loader.instantiateSync(fs.readFileSync("./build/out.wasm"));
