'use strict'

module.exports = {
  extends: [
    '@strv/eslint-config-react',
    '@strv/eslint-config-react/style',
    '@strv/eslint-config-typescript',
    '@strv/eslint-config-typescript/style'
  ],
  rules: {
    "react-hooks/exhaustive-deps": false
  }
}
