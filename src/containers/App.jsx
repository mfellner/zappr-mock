import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import NavHeader from '../components/NavHeader.jsx'
import PushbulletClient from './PushbulletClient'
import { githubLogout } from '../actions/oauth'
import { receiveWebhook } from '../actions/webhook'
import { fetchActiveUser } from '../actions/github/users'
import { fetchRepositories } from '../actions/github/repositories'
import { pushbulletRequestLogin, pushbulletFetchToken } from '../actions/oauth'

function mapStateToProps(state) {
  return {
    oauth: state.oauth,
    webhook: state.webhook,
    github: state.github
  }
}

class App extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
    oauth: PropTypes.object.isRequired,
    webhook: PropTypes.object.isRequired,
    github: PropTypes.object.isRequired,
    fetchActiveUser: PropTypes.func.isRequired,
    fetchRepositories: PropTypes.func.isRequired,
    receiveWebhook: PropTypes.func.isRequired
  };
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)
    this.pbClient = new PushbulletClient(props.receiveWebhook)
  }

  initPbClient(isAuthenticated) {
    if (isAuthenticated) {
      this.pbClient.init(this.props.oauth.pushbullet.accessToken)
    }
  }

  componentDidMount() {
    console.log('App did mount %o', this.props)
    const {code, isAuthenticated} = this.props.oauth.pushbullet
    if (code && !isAuthenticated) {
      console.log('fetching Pushbullet access token...')
      this.props.pushbulletFetchToken(code)
      this.context.router.replace('/settings')
    }
    this.props.fetchActiveUser()
    this.props.fetchRepositories()
    this.initPbClient(isAuthenticated)
  }

  render() {
    const {location, githubLogout, ...rest} = this.props
    const {user} = this.props.github
    return (
      <div>
        <NavHeader location={location} user={user} logout={githubLogout}/>
        <div className="container">
          {React.cloneElement(this.props.children, rest)}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, {
  fetchActiveUser, fetchRepositories,
  receiveWebhook, githubLogout,
  pushbulletRequestLogin, pushbulletFetchToken
})(App)
