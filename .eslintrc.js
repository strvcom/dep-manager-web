module.exports = {
  parser: 'typescript-eslint-parser',
  rules: {
    'import/no-unresolved': 'off',
    'import/group-exports': 'off',
    'import/named': 'off',
    'react/jsx-filename-extension': [1, { 'extensions': ['.tsx'] }],
    'typescript/interface-name-prefix': 'off',
    'typescript/explicit-function-return-type': 'off',
    'typescript/no-triple-slash-reference': 'off',
    'typescript/no-explicit-any': 'off',
    'typescript/no-non-null-assertion': 'off',
    'spaced-comment': 'off',
    'no-unused-vars': 'off',
    'no-shadow': 'off'
  },
  extends: [
    '@strv/eslint-config-javascript/environments/react/v16',
    '@strv/eslint-config-javascript/environments/react/optional',
    '@strv/eslint-config-javascript/environments/react/recommended',
    '@strv/eslint-config-javascript/coding-styles/recommended',
    '@strv/eslint-config-javascript/environments/typescript/recommended'
  ],
}
