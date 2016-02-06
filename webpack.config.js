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
  WEBTASK_URL: "https://webtask.it.auth0.com/api/run/wt-max_fellner-gmail_com-0?key=eyJhbGciOiJIUzI1NiIsImtpZCI6IjIifQ.eyJqdGkiOiI4N2ZmNGRkNTY4NmI0YzA5OThkNmQ5OTM3NmVjODQyNSIsImlhdCI6MTQ1NDc5NjgwOSwiZHIiOjEsImNhIjpbIjg2YjY5NGRhOTJlMTQ1YzI4YzZmYzhiOGMyM2EzMjIwIl0sImRkIjowLCJ0ZW4iOiJ3dC1tYXhfZmVsbG5lci1nbWFpbF9jb20tMCIsImVjdHgiOiJ5UmFtMnkxYXplbFU1WlpYK2JNcjl1U3VzUE5JdUNwVVd4c0FzQlpHZlFXeE1SL1VOYjUycjVHbklBb1FQUFNNZm5EbDIwZE5aNmYzeWhPZ0ZkOHFxUDhSd0lvcUNraEhMSml1cTNPazhCMmtBRTI2b0lJT2t3YkhMN2UweEpyNkhJR3k1d09TNE42UkZ3Q3RtTFlXMVo3WEtxZjVWeUdEN05Pc0t5NlJhUlhnVlc3NDltemxqcTBqRWtRQkFhTFVOTlkwN3E2QUxwVFdhUFltU1dXV1hka3ZaL2o2eUl1d0FGVzhRdmpyeDJjPS41LzVHT0FkOFFFMjhYZFRhN2p3TW53PT0iLCJqdG4iOiJ6YXBwciIsInBiIjoxLCJ1cmwiOiJ3ZWJ0YXNrOi8vbG9jYWxob3N0L2FwaS9kYXRhL2NvZGUvd3QtbWF4X2ZlbGxuZXItZ21haWxfY29tLTAlMkZjOTk5MDBjOGMxN2FmOTk2N2I0ZGZmZWNjZjZhNWE2ZSJ9.FMSe_6eJwV3KnZ1_kZUxa4hbpTuH5Wsn-tl4-qwHR5g"
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
