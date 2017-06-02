const path = require('path')

module.exports = env => ({
  entry: './src/Main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: getFileName(env),
    library: 'Qiniu',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.ts?$/,
        exclude: '/node_modules',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: getBabelOption(env)
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'cheap-source-map',
})

function getBabelOption (env) {
  if (env === 'es5min') {
    return [
      'es2015',
      'stage-0'
    ]
  } else if (env === 'es5') {
    return [
      'es2015',
      'stage-0'
    ]
  }
  else if (env === 'es6') {
    return []
  }
}

function getFileName (env) {
  if (env === 'es5min') {
    return 'qiniu4js.min.js'
  } else if (env === 'es5') {
    return 'qiniu4js.js'
  }
  else if (env === 'es6') {
    return 'qiniu4js.es.js'
  }
}