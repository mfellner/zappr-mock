import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './App.jsx'
import Login from './Login.jsx'
import Home from '../components/Home.jsx'
import Settings from '../components/Settings.jsx'
import requireAuth from './requireAuth.jsx'

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={browserHistory}>
          <Route path="/" component={requireAuth(App)}>
            <IndexRoute component={Home}/>
            <Route path="repository/:repository" component={Home}/>
            <Route path="settings" component={Settings}/>
          </Route>
          <Route path="/login" component={Login}/>
        </Router>
      </Provider>
    )
  }
}
