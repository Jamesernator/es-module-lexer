const path = require('path');

module.exports = {
    rules: {
        "typescript-eslint/no-unsafe-return": "off",
        "eqeqeq": "off",
    },
    parserOptions: {
        project: path.join(__dirname, './tsconfig.json'),
    },
};
