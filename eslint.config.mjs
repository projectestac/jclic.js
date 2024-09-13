import babelParser from '@babel/eslint-parser';

export default [{
  languageOptions: {
    globals: {},
    parser: babelParser,
    ecmaVersion: 6,
    sourceType: 'module',
    parserOptions: {
      requireConfigFile: false,
    },
  },

  rules: {
    'no-const-assign': 'warn',
    'no-this-before-super': 'warn',
    'no-undef': 'warn',
    'no-unreachable': 'warn',
    'no-unused-vars': ['warn',
      {
        vars: 'all',
        args: 'after-used',
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }
    ],
    'constructor-super': 'warn',
    'valid-typeof': 'warn',
    semi: 'warn',
  },
}];
