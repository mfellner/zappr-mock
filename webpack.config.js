const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.min.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel', query: {
        presets: ['es2015', 'stage-1', 'react']
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true
      }
    })
  ]
}
