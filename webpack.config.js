const HtmlWebpackPlugin = require('html-webpack-plugin')
const objectRestSpread = require('babel-plugin-transform-object-rest-spread')
const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.[hash].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
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
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Tetris - github.com/scwood/tetris'
  })]
}
