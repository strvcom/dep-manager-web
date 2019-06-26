const Dotenv = require('dotenv-webpack')
const externals = require('webpack-node-externals')
require('dotenv/config')

module.exports = {
  externals: [externals()],
  plugins: [new Dotenv()]
}
