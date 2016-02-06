import React from 'react'
import ReactDOM from 'react-dom'

import Root from './containers/Root.jsx'
import { createAppStore } from './store'
import { parseQueryString } from './query'

// Parse Github OAuth callback parameters
// https://developer.github.com/v3/oauth/#web-application-flow
const {code, state} = parseQueryString()
const oauth = {
  code, state,
  isAuthenticated: false,
  isAuthenticating: !!code
}
const store = createAppStore({oauth})
const root = document.getElementById('main')

ReactDOM.render(<Root store={store}/>, root)
