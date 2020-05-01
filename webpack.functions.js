const Dotenv = require('dotenv-webpack')
const externals = require('webpack-node-externals')
require('dotenv/config')

module.exports = {
  externals: [externals()],
  plugins: [new Dotenv()],
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/u,
        exclude: /node_modules/u,
        loader: 'graphql-tag/loader',
      },
    ],
  },
}
