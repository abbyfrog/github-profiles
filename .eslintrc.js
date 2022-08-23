module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    root: true,
};
