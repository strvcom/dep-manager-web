'use strict'

const { rules: typescriptRules } = require('@strv/eslint-config-typescript')

const jsExtensions = ['.js', '.json', '.mjs', '.es', '.node', '.jsx']
const tsExtensions = ['.ts', '.d.ts', '.tsx']
const extensions = [...jsExtensions, ...tsExtensions]

module.exports = {
  extends: [
    '@strv/eslint-config-react',
    // '@strv/eslint-config-react/style',
    '@strv/eslint-config-typescript',
    // '@strv/eslint-config-typescript/style',
  ],
  settings: { 'import/resolver': { node: { extensions } } },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      rules: {
        'import/named': 'off',
        'import/namespace': 'off',
        'import/no-duplicates': 'off',
        'import/no-unresolved': 'off',
        'no-restricted-globals': 'off',
        'no-undef': 'off',
      },
    },
    {
      files: ['**/*.test.*'],
      globals: {
        deepDescribe: false
      },
    },
  ],
  rules: {
    'react-hooks/exhaustive-deps': false,
    'no-extra-parens': [
      'warn',
      'all',
      {
        nestedBinaryExpressions: false,
        returnAssign: false,
        ignoreJSX: 'all',
      },
    ],
  },
}
