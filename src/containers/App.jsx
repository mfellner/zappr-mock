import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import NavHeader from '../components/NavHeader.jsx'
import PushbulletClient from './PushbulletClient'
import { getActiveUser } from '../actions/users'
import { fetchRepositories } from '../actions/repositories'
import { receiveWebhook } from '../actions/webhook'
import { githubLogout } from '../actions/oauth'
import { pushbulletRequestLogin, pushbulletFetchToken } from '../actions/oauth'

function mapStateToProps(state) {
  return {
    user: state.users.user,
    repositories: state.repositories,
    pushbullet: state.oauth.pushbullet,
    webhook: state.webhook
  }
}

class App extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    repositories: PropTypes.array.isRequired,
    pushbullet: PropTypes.object.isRequired,
    getActiveUser: PropTypes.func.isRequired,
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
      this.pbClient.init(this.props.pushbullet.accessToken)
    }
  }

  componentDidMount() {
    console.log('App did mount %o', this.props)
    const {code, isAuthenticated} = this.props.pushbullet
    if (code && !isAuthenticated) {
      console.log('fetching Pushbullet access token...')
      this.props.pushbulletFetchToken(code)
      this.context.router.replace('/settings')
    }
    this.props.getActiveUser()
    this.props.fetchRepositories()
    this.initPbClient(isAuthenticated)
  }

  render() {
    const {location, user, githubLogout, ...rest} = this.props
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
  getActiveUser, fetchRepositories,
  receiveWebhook, githubLogout,
  pushbulletRequestLogin, pushbulletFetchToken
})(App)
