const path = require('path')

module.exports = {
  entry: './src/Main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'qiniu4js.js',
    library: 'Qiniu',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   loader: 'source-map-loader'
      // },
      // {
      //   enforce: 'pre',
      //   test: /\.ts?$/,
      //   use: 'source-map-loader'
      // },
      // {
      //   test: /\.ts?$/,
      //   loader: 'ts-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.ts?$/,
        // use: [
        //   'babel-loader',
        //   'ts-loader'
        // ],
        loader: 'babel-loader!ts-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  // devtool: 'inline-source-map',
}