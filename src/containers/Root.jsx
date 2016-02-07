import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'

import App from './App.jsx'
import Login from './Login.jsx'
import requireAuth from './requireAuth.jsx'

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={browserHistory}>
          <Route path="/" component={requireAuth(App)}/>
          <Route path="/login" component={Login}/>
        </Router>
      </Provider>
    )
  }
}
