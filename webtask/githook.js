var request = require('request')

function githook(context, done) {
  var PUSHBULLET_TOKEN = context.secrets.PUSHBULLET_TOKEN
  var hook = context.body || null
  var pushbulletUrl = 'https://api.pushbullet.com/v2'

  if (!PUSHBULLET_TOKEN) {
    return callback(new Error('PUSHBULLET_TOKEN not set'))
  }

  /**
   * https://docs.pushbullet.com/#create-push
   */
  function createPush(data, callback) {
    request({
      json: true,
      method: 'POST', url: pushbulletUrl + '/pushes',
      headers: {'Access-Token': PUSHBULLET_TOKEN},
      body: {
        type: 'note',
        title: 'zappr-githook',
        body: JSON.stringify(data)
      }
    }, function (error, res, body) {
      callback(error, body)
    })
  }

  /**
   * https://docs.pushbullet.com/#ephemerals
   */
  function sendEphemeral(data, callback) {
    request({
      json: true,
      method: 'POST', url: pushbulletUrl + '/ephemerals',
      headers: {'Access-Token': PUSHBULLET_TOKEN},
      body: {
        type: 'push',
        push: JSON.stringify(data)
      }
    }, function (error, res, body) {
      callback(error, body)
    })
  }

  sendEphemeral(hook, done)
}

module.exports = githook
