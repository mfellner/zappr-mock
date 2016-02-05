const path = require('path')
const nconf = require('nconf')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

nconf.argv()
.env()
.file({file: path.join(__dirname, 'config.json')})
.defaults({
  GITHUB_URL: 'api.github.com',
  PUSHBULLET_URL: 'stream.pushbullet.com/websocket',
  WEBTASK_URL: 'https://webtask.it.auth0.com/api/run/wt-max_fellner-gmail_com-0/zappr-githook',
  PUSHBULLET_TOKEN: null
})

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
    }),
    new webpack.DefinePlugin({
      GITHUB_URL: JSON.stringify(nconf.get('GITHUB_URL')),
      PUSHBULLET_URL: JSON.stringify(nconf.get('PUSHBULLET_URL')),
      PUSHBULLET_TOKEN: JSON.stringify(nconf.get('PUSHBULLET_TOKEN')),
      WEBTASK_URL: JSON.stringify(nconf.get('WEBTASK_URL'))
    })
  ]
}
