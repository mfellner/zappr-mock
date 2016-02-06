var request = require('request')

function githook(hook, pushbulletToken, done) {
  var pushbulletUrl = 'https://api.pushbullet.com/v2'

  if (!pushbulletToken) {
    return done(new Error('PUSHBULLET_TOKEN not set'))
  }

  /**
   * https://docs.pushbullet.com/#create-push
   */
  function createPush(data, callback) {
    request({
      json: true,
      method: 'POST', url: pushbulletUrl + '/pushes',
      headers: {'Access-Token': pushbulletToken},
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
      headers: {'Access-Token': pushbulletToken},
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

function oauthLogin(clientId, scope, state, redirect) {
  redirect('https://github.com/login/oauth/authorize'
    + '?client_id=' + clientId
    + '&scope=' + scope
    + '&state=' + state)
}

function oauthHandshake(oauthCode, oauthState, clientId, clientSecret, done) {
  var url = 'https://github.com/login/oauth/access_token'
  var query = {
    'client_id': clientId,
    'client_secret': clientSecret,
    'code': oauthCode,
    'state': oauthState
  }
  request({
    json: true,
    method: 'POST', url: url, qs: query
  }, function (error, res, body) {
    done(error, body)
  })
}

function error(msg, done) {
  done(new Error(msg))
}

function pipe(req, res) {
  return function (stream) {
    req.pipe(stream).pipe(res)
  }
}

function redirect(req, res) {
  return function (location) {
    res.writeHead(301, {Location: location})
    res.end()
  }
}

function done(res) {
  return function (error, data) {
    if (error) {
      res.writeHead(500, {'Content-Type': 'application/json '})
      res.end(error.message)
    } else {
      res.writeHead(200, {'Content-Type': 'application/json '})
      res.end(JSON.stringify(data))
    }
  }
}

function dispatch(context, req, res) {
  var CLIENT_ID = context.secrets.GITHUB_CLIENT_ID || null
  var CLIENT_SECRET = context.secrets.GITHUB_CLIENT_SECRET || null
  var githubEvent = req.headers['x-github-event'] || null
  var oauthCode = req.headers['x-zappr-oauth-code'] || null
  var oauthState = req.headers['x-zappr-oauth-state'] || context.query['state'] || null
  var oauthScope = req.headers['x-zappr-oauth-scope'] || context.query['scope'] || null

  // Handle Github githook
  if (githubEvent) {
    var PUSHBULLET_TOKEN = context.secrets.PUSHBULLET_TOKEN || null
    var hook = context.body || {}
    hook.githubEvent = githubEvent
    githook(hook, PUSHBULLET_TOKEN, done(res))
  }
  // Handle OAuth login
  else if (oauthScope && oauthState) {
    oauthLogin(CLIENT_ID, oauthScope, oauthState, redirect(req, res))
  }
  // Handle OAuth handshake
  else if (oauthCode && oauthState) {
    oauthHandshake(oauthCode, oauthState, CLIENT_ID, CLIENT_SECRET, done(res))
  }
  // Error, no matching method
  else {
    error('unsupported method', done(res))
  }
}

module.exports = dispatch
