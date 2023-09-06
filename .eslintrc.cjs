module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb', 'prettier', 'plugin:node/recommended', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'spaced-comment': 'off',
    'no-unused-vars': 'warn',
    'import/named': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'no-console': 'off',
    'func-names': 'off',
    'no-plusplus': 'off',
    'no-process-exit': 'off',
    'object-shorthand': 'off',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        version: '>=13.0.0',
        ignores: ['modules'],
      },
    ],
    'import/extensions': ['error', { js: 'ignorePackages' }],
  },
};
