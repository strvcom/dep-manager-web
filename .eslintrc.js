'use strict'

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
  settings: {
    'import/resolver': { node: { extensions } },
    'import/ignore': ['node_modules', '.(json|css)$'],
  },
  rules: {
    'import/extensions': [{ json: 'always' }],
    'prefer-named-capture-group': 'off',
    'max-len': [
      'error',
      {
        code: 100,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-shadow': ['error', { allow: ['event'] }],
    'no-unused-vars': 'off',
    'no-extra-parens': [
      'warn',
      'all',
      { nestedBinaryExpressions: false, returnAssign: false, ignoreJSX: 'all' },
    ],
    'react-hooks/exhaustive-deps': false,
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '[iI]gnored' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
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
        deepDescribe: false,
      },
    },
    {
      files: ['**/*.test.*', '**/*.stories.*'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
}
