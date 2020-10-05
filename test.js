import SourceTextModule from './dist/SourceTextModule.js';
import { readFile } from 'fs/promises';

function resolveModule(specifier) {
    return mods[specifier] ?? void function() { throw new Error(`Can't find module: ${ specifier }`) };
}

const fromFile = async (file) => SourceTextModule.create({
    source: await readFile(file, 'utf8'),
    resolveModule,
})

const mods = {
    mod1: await fromFile('./sample/mod1.js'),
    mod2: await fromFile('./sample/mod2.js'),
};

await mods.mod2.link();
mods.mod2.evaluate();
console.log({ ...mods.mod2.namespace });
