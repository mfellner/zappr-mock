import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Root from './containers/Root.jsx'
import { createAppStore } from './store'

const store = createAppStore()
const root = document.getElementById('main')

ReactDOM.render(<Provider store={store}><Root/></Provider>, root)
