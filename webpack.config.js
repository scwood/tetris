const path = require('path')
const objectRestSpread = require('babel-plugin-transform-object-rest-spread')

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.[chunkhash].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: [objectRestSpread]
          }
        }
      }
    ]
  }
}
