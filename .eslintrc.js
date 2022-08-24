module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    // Turns on the recommended base set of TypeScript rules
    'plugin:@typescript-eslint/recommended',
    // Turns on Typescript-ESLint rules that only work with type checking active in parserOptions
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // Turns on rules for eslint-* comments
    'plugin:eslint-comments/recommended',
    // Turns on rules for Jest
    'plugin:jest/recommended',
    'plugin:jest/style',
    // Recommended ESLint rules for Javascript+React
    'airbnb',
    // Turns on rules for React Hooks
    'airbnb/hooks',
    // Recommended ESLint rules, altered for use with @typescript-eslint
    'airbnb-typescript',
    // Turns off ESLint rules, including from plugins, that could conflict with Prettier
    'prettier',
  ],
  overrides: [
    {
      files: ['**/__test__/**', '*.spec.{ts,tsx}'],
      rules: {
        // Jest tests frequently refer to unbound methods that are mocks.
        '@typescript-eslint/unbound-method': 'off',
        // It's valid for tests to do non-type-safe operations for expediency.
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        // Downgrade some errors to warnings when they're in test files.
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/no-misused-promises': 'warn',
      },
    },
    {
      files: '*.tsx',
      rules: {
        // React hooks can return methods, but their class context isn't being used anyway.
        '@typescript-eslint/unbound-method': 'off',
        'react/jsx-no-duplicate-props': 'warn',
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ['./tsconfig.lint.json', './tsconfig.json'],
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  root: true,
  rules: {
    // Added rules
    '@typescript-eslint/array-type': 'warn',
    '@typescript-eslint/class-literal-property-style': 'warn',
    '@typescript-eslint/consistent-indexed-object-style': 'warn',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
    '@typescript-eslint/no-unnecessary-qualifier': 'warn',
    '@typescript-eslint/prefer-function-type': 'warn',
    '@typescript-eslint/prefer-includes': 'warn',
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    '@typescript-eslint/prefer-readonly': 'warn',
    '@typescript-eslint/prefer-reduce-type-parameter': 'warn',
    '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
    '@typescript-eslint/unified-signatures': 'warn',
    'import/no-deprecated': 'warn',
    'import/no-unresolved': 'error',

    // Rule option modifications
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
    'array-callback-return': ['error', { checkForEach: true }],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['src/setupTests.js', '**/__test__/**', '*.spec.{ts,tsx}'] },
    ],
    'no-underscore-dangle': ['warn', { allowAfterThis: true }],
    'react/require-default-props': ['warn', { ignoreFunctionalComponents: true }],

    // Rule level downgrades
    '@typescript-eslint/naming-convention': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-unsafe-return': 'warn',
    '@typescript-eslint/no-unused-expressions': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/restrict-template-expressions': 'warn',
    'class-methods-use-this': 'warn',
    'eslint-comments/require-description': 'warn',
    'import/first': 'warn',
    'import/order': 'warn',
    'no-restricted-syntax': 'warn',
    'react/destructuring-assignment': 'warn',
    'react/jsx-props-no-spreading': 'warn',
    'react/prop-types': 'warn',

    // Removed rules
    '@typescript-eslint/comma-dangle': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'react/function-component-definition': 'off',
    'spaced-comment': 'off',
  },
};
