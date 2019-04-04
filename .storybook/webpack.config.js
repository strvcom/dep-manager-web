const babelLoader = {
  loader: require.resolve('babel-loader'),
  options: {
    // cacheDirectory: true,
    babelrc: false,
    presets: [
      [require.resolve('@babel/preset-env'), { modules: false }],
      require.resolve('@babel/preset-react'),
    ],
  },
}

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [{ loader: require.resolve('awesome-typescript-loader') }],
  })

  config.module.rules.push({ test: /\.jsx?$/, use: [babelLoader] })
  config.module.rules.push({ test: /\.(svg|png)$/, loader: 'file-loader' })
  config.resolve.extensions.push('.tsx', '.ts')

  return config
}
