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
  PUSHBULLET_TOKEN: null, // TODO: use pushbullet OAuth
  WEBTASK_URL: "https://webtask.it.auth0.com/api/run/wt-max_fellner-gmail_com-0?key=eyJhbGciOiJIUzI1NiIsImtpZCI6IjIifQ.eyJqdGkiOiJkM2ZiMWJiY2UwMDk0MGIyODM1MjYwZmQ1NjJkMTUyMCIsImlhdCI6MTQ1NDgwNjkzOCwiZHIiOjEsImNhIjpbIjg2YjY5NGRhOTJlMTQ1YzI4YzZmYzhiOGMyM2EzMjIwIl0sImRkIjowLCJ0ZW4iOiJ3dC1tYXhfZmVsbG5lci1nbWFpbF9jb20tMCIsImVjdHgiOiIvMzJ1RUx0UkpvUWdTVkxDalcyWkI5WGM2L3V5N3N6R3VYVjZJcVBZcnVPaEphRldHei9MTk8vdXlXalNUSlQxZVFqWENvdEJibDJkdXZwQVB2RSt3MHFBWG1XQnBLay9JTlJJQlpjOUZSZThldnJwTVY2YysvbkdkNTZRc2FPTEVhSURnMTZiNU9zRTJKOU5SQUVGUWpScEk0dUI1ck9KZVkrWEp5a29JNE9paFpkbktObkFtSUpTR1M2dzBMRzg5M3VjamorTy9xSWF4R2h1R2tOVlNKVFU2ZW8xUGt3ZTRtdG0ycVdYcUpIbFhRUDVKcWRPai8rdUlHcDA5cVoxcDJiR05vUmZJeFZIc2grL0JFa203UFNRaFg4SEZIVWxsSFEva284cHA1ZElCTEwreGZRY3ZMVjFXTlZoaE1xaC44R01jdjJWWW1zeHQzZEwzTzU3TWpBPT0iLCJqdG4iOiJ6YXBwciIsInBiIjoxLCJ1cmwiOiJ3ZWJ0YXNrOi8vbG9jYWxob3N0L2FwaS9kYXRhL2NvZGUvd3QtbWF4X2ZlbGxuZXItZ21haWxfY29tLTAlMkY4YzEwNDhjNGYzYmE3ZGE2NWFlZjNhNjQ5Nzk0NTcxMiJ9.ltSpbTOwzWCQ7J6K6OBX0V5IA2s5DT04tVj_8naIUiQ"
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
      test: /\.png$/, loader: 'url-loader?mimetype=image/png'
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
