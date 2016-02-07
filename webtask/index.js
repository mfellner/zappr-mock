const fs = require('fs')
const path = require('path')
const nconf = require('nconf')
const webtask = require('wt-cli')
const zappr = path.join(__dirname, './zappr.js')
const config = path.join(__dirname, '../config.json')

nconf.argv()
.env()
.file({file: config})
.defaults({
  GITHUB_CLIENT_ID: null,
  GITHUB_CLIENT_SECRET: null,
  PUSHBULLET_CLIENT_ID: null,
  PUSHBULLET_CLIENT_SECRET: null
})

webtask.configFile().getProfile().then(profile => {
  webtask.createToken({
    name: 'zappr',
    code: fs.readFileSync(zappr).toString(),
    parse: true,
    secret: {
      GITHUB_CLIENT_ID: nconf.get('GITHUB_CLIENT_ID'),
      GITHUB_CLIENT_SECRET: nconf.get('GITHUB_CLIENT_SECRET'),
      PUSHBULLET_CLIENT_ID: nconf.get('PUSHBULLET_CLIENT_ID'),
      PUSHBULLET_CLIENT_SECRET: nconf.get('PUSHBULLET_CLIENT_SECRET')
    }
  }, (err, token) => {
    if (err) {
      console.error(err)
      process.exit(1)
    } else {
      process.stdout.write(`${profile.url}/api/run/${profile.container}?key=${token}`)
    }
  })
})
