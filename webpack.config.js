const path = require('path')
const nconf = require('nconf')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

nconf.argv()
.env()
.file({file: path.join(__dirname, 'config.json')})
.defaults({
  GITHUB_HOST: 'api.github.com',
  GITHUB_SCOPES: ['user:email', 'repo:status', 'admin:repo_hook'],
  PUSHBULLET_HOST: 'stream.pushbullet.com',
  WEBTASK_HOST: 'webtask.it.auth0.com',
  WEBTASK_PROFILE: 'wt-max_fellner-gmail_com-0',
  WEBTASK_TOKEN: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IjIifQ.eyJqdGkiOiI5ODE4ODBjZmVkMzE0MzdhYTQ4MDYzNzYwOTQyMDQxZiIsImlhdCI6MTQ1NTE0ODIxMywiZHIiOjEsImNhIjpbIjg2YjY5NGRhOTJlMTQ1YzI4YzZmYzhiOGMyM2EzMjIwIl0sImRkIjowLCJ0ZW4iOiJ3dC1tYXhfZmVsbG5lci1nbWFpbF9jb20tMCIsImVjdHgiOiI4R1NEdzdKT2NWcEYwZ0N2d0JGaGtQbmlxU24wdVd2Nng2ejBZWHYxeTJHbnhTMjhienRWY2cxVCttYmRwLzc1QncwWTlDT0tULzVaRnU1ZmJGSy82Skx5Tlc3TDk0cEl6cldnZnk0RnkyZXpmS0FUUThkajczR1BlMURvdllPVWVpTGpRMXd1dzFKZ1g1Y0RlKzhiNDhLeG5kcERkdDBrcUpxZFRPM3F5bDAwY3R6UVNQUTQycVJoTFRSK3RobGtjajRpY2pqZzRvSUFZN0J0VFpGOURNcndaeDZOVk5NWGtjbUg3eFNaeFZUZXVaVnZYNkFmQXNEYlEzUHFzalU2UlBCZHQ5cFVvaEN4KzFJWWFreEpCQktKa0dWMHI2ZlVWYlNHTTVPUG1TK2NwRVdzb2J2NGM5TC91bTZHNkFvaS5HQjZGbWRiMmVjVkhpTEZzV2hoUDVBPT0iLCJqdG4iOiJ6YXBwciIsInBiIjoxLCJ1cmwiOiJ3ZWJ0YXNrOi8vbG9jYWxob3N0L2FwaS9kYXRhL2NvZGUvd3QtbWF4X2ZlbGxuZXItZ21haWxfY29tLTAlMkYzZDU2YjQ3NjhmNTFhMjgyY2I3MGViYjBjZTgyYWVjMCJ9.t5JAa9vdigmwtc2OdNla8iKzr7eHX_R8V9xg1Elyqqg'
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
    }, {
      test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?minimize')
    }, {
      test: /\.png$/, loader: 'url-loader?mimetype=image/png'
    }]
  },
  plugins: [
    new ExtractTextPlugin('styles.min.css'),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      favicon: './src/img/favicon.ico',
      inject: false,
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true
      }
    }),
    new webpack.DefinePlugin({
      GITHUB_HOST: JSON.stringify(nconf.get('GITHUB_HOST')),
      GITHUB_SCOPES: JSON.stringify(nconf.get('GITHUB_SCOPES')),
      PUSHBULLET_HOST: JSON.stringify(nconf.get('PUSHBULLET_HOST')),
      WEBTASK_HOST: JSON.stringify(nconf.get('WEBTASK_HOST')),
      WEBTASK_PROFILE: JSON.stringify(nconf.get('WEBTASK_PROFILE')),
      WEBTASK_TOKEN: JSON.stringify(nconf.get('WEBTASK_TOKEN'))
    })
  ]
}
