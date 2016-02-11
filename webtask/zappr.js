var request = require('request')

/**
 * https://developer.github.com/webhooks/#events
 */
function githook(hook, pushbulletToken, done) {
  var pushbulletUrl = 'https://api.pushbullet.com/v2'

  if (!pushbulletToken) {
    return done(new Error('pushbullet_token not set'))
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

/**
 * https://developer.github.com/v3/oauth/#web-application-flow
 */
function githubRequestLogin(clientId, scope, state, redirect) {
  redirect('https://github.com/login/oauth/authorize'
    + '?client_id=' + encodeURIComponent(clientId)
    + '&scope=' + encodeURIComponent(scope)
    + '&state=' + encodeURIComponent(state))
}

/**
 * https://developer.github.com/v3/oauth/#web-application-flow
 */
function githubFetchToken(oauthCode, oauthState, clientId, clientSecret, done) {
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

/**
 * https://docs.pushbullet.com/#oauth2
 */
function pushbulletRequestLogin(clientId, redirectUri, redirect) {
  redirect('https://www.pushbullet.com/authorize'
    + '?client_id=' + encodeURIComponent(clientId)
    + '&redirect_uri=' + encodeURIComponent(redirectUri)
    + '&response_type=code')
}

/**
 * https://docs.pushbullet.com/#oauth2
 */
function pushbulletFetchToken(oauthCode, clientId, clientSecret, done) {
  var url = 'https://api.pushbullet.com/oauth2/token'
  request({
    json: true,
    method: 'POST', url: url,
    body: {
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code: oauthCode
    }
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
  var GITHUB_CLIENT_ID = context.secrets.GITHUB_CLIENT_ID || null
  var GITHUB_CLIENT_SECRET = context.secrets.GITHUB_CLIENT_SECRET || null
  var PUSHBULLET_CLIENT_ID = context.secrets.PUSHBULLET_CLIENT_ID || null
  var PUSHBULLET_CLIENT_SECRET = context.secrets.PUSHBULLET_CLIENT_SECRET || null
  var githubEvent = req.headers['x-github-event'] || null
  var oauthType = req.headers['x-zappr-oauth-type'] || null
  var oauthCode = req.headers['x-zappr-oauth-code'] || null
  var oauthState = req.headers['x-zappr-oauth-state'] || context.query['state'] || null
  var oauthScope = req.headers['x-zappr-oauth-scope'] || context.query['scope'] || null
  var pushbulletToken = context.query['pushbullet_token'] || null
  var login = context.query['login'] || null
  var redirectUri = 'http://localhost:8080/'

  // Handle Github githook event
  if (githubEvent) {
    var hook = context.body || {}
    hook.githubEvent = githubEvent
    githook(hook, pushbulletToken, done(res))
  }
  // Handle Github OAuth login
  else if (login === 'github' && oauthScope && oauthState) {
    githubRequestLogin(GITHUB_CLIENT_ID, oauthScope, oauthState, redirect(req, res))
  }
  // Handle Github OAuth token request
  else if (oauthType === 'github' && oauthCode && oauthState) {
    githubFetchToken(oauthCode, oauthState, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, done(res))
  }
  // Handle Github OAuth login
  else if (login === 'pushbullet') {
    pushbulletRequestLogin(PUSHBULLET_CLIENT_ID, redirectUri, redirect(req, res))
  }
  // Handle Github OAuth token request
  else if (oauthType === 'pushbullet') {
    pushbulletFetchToken(oauthCode, PUSHBULLET_CLIENT_ID, PUSHBULLET_CLIENT_SECRET, done(res))
  }
  // Error, no matching method
  else {
    error('unsupported method', done(res))
  }
}

module.exports = dispatch
