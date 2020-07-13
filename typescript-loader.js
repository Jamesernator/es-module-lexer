import fs from 'fs';
import path from 'path';
import babel from '@babel/core';
import urlUtils from 'url';
import babelPluginTransformTypescript from '@babel/plugin-transform-typescript';

function isURL(string) {
    try {
        new URL(string);
        return true;
    } catch {
        return false;
    }
}
const removePrivateTypes = (babel) => {
    return {
        visitor: {
            ClassPrivateProperty(context) {
                context.get('typeAnnotation')?.remove();
            },
        },
    };
}

const BABEL_OPTS = {
    plugins: [
        babelPluginTransformTypescript,
        removePrivateTypes,
    ],
    parserOpts: {
        plugins: [
            'asyncGenerators',
            'bigInt',
            'classProperties',
            'classPrivateProperties',
            'importMeta',
            'nullishCoalescingOperator',
            'numericSeparator',
            'objectRestSpread',
            'optionalCatchBinding',
            'optionalChaining',
            'topLevelAwait',
            'typescript',
        ],
    },
    sourceMaps: 'inline',
};

export async function getSource(urlString, context, getSourceDefault) {
    if (isURL(urlString)) {
        const url = new URL(urlString);
        if (url.pathname.endsWith('.js') && !fs.existsSync(url)) {
            url.pathname = url.pathname.replace(/\.js$/u, '.ts');
            const contents = await fs.promises.readFile(url, 'utf8');
            const { code: source } = await babel.transformAsync(contents, {
                ...BABEL_OPTS,
                sourceFileName: path.basename(urlUtils.fileURLToPath(url)),
            })
            return { source };
        }
    }
    return getSourceDefault(urlString, context, getSourceDefault);
}

export async function resolve(specifier, context, defaultResolve) {
    try {
        const defaultResolution = defaultResolve(specifier, context, defaultResolve);
    
        try {
            const url = new URL(defaultResolution.url);
            url.pathname = url.pathname.replace(/\.ts$/, '.js');
            return { url: url.href };
        } catch {
            return defaultResolution;
        }
    } catch {
        return { url: new URL(specifier, context.parentURL).href };
    }
}
