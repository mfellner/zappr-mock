import React from 'react'
import ReactDOM from 'react-dom'

import Root from './containers/Root.jsx'
import { parseQueryString } from './query'
import { createAppStore, getStoredState } from './store'

/**
 * Parse Github or Pushbullet OAuth callback parameters
 * https://developer.github.com/v3/oauth/#web-application-flow
 * https://docs.pushbullet.com/#oauth2
 */
function getOAuthState() {
  const {code, state} = parseQueryString()
  if (code && state) {
    return {
      github: {
        code, state,
        isAuthenticated: false,
        isAuthenticating: !!code
      }
    }
  }
  if (code) {
    return {
      pushbullet: {
        code,
        isAuthenticated: false,
        isAuthenticating: !!code
      }
    }
  }
  return null
}

let initialState
const oauthState = getOAuthState()
const storedState = getStoredState()

if (oauthState) {
  const storedOAuth = storedState ? storedState.oauth || {} : {}
  const oauth = Object.assign(storedOAuth, oauthState)
  initialState = Object.assign({}, storedState, {oauth})
} else {
  initialState = storedState || undefined
}

const store = createAppStore(initialState)
const root = document.getElementById('main')

ReactDOM.render(<Root store={store}/>, root)
