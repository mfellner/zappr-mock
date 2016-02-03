var request = require('request')

function githook(context, callback) {
  var PUSHBULLET_TOKEN = context.data.PUSHBULLET_TOKEN
  var WEBHOOK_SECRET = context.data.WEBHOOK_SECRET
  var hook = context.data || {}

  // TODO: verify authenticity of the request
  if (!WEBHOOK_SECRET || !PUSHBULLET_TOKEN) {
    return callback(new Error(401))
  }

  // TODO: use Google Cloud Messaging instead
  request({
    json: true,
    method: 'POST', url: 'https://api.pushbullet.com/v2/pushes',
    headers: {
      'Access-Token': PUSHBULLET_TOKEN
    },
    body: {
      type: 'note',
      title: 'zappr-githook',
      body: JSON.stringify(hook)
    }
  }, function (error, res, body) {
    callback(error, body)
  })
}

module.exports = githook
