import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Root from './containers/Root.jsx'
import { createAppStore } from './store'
import { parseQueryString } from './query'

// Parse Github OAuth callback parameters
// https://developer.github.com/v3/oauth/#web-application-flow
const {code, state} = parseQueryString()
const store = createAppStore({oauth: {code, state}})
const root = document.getElementById('main')

ReactDOM.render(<Provider store={store}><Root/></Provider>, root)
