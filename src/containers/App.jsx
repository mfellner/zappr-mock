import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Thumbnail } from 'react-bootstrap'

import Optional from '../components/Optional.jsx'
import NavHeader from '../components/NavHeader.jsx'
import RepositoryBrowser from '../components/RepositoryBrowser.jsx'
import PushbulletClient from './PushbulletClient'
import { getActiveUser } from '../actions/users'
import { receiveWebhook } from '../actions/webhook'
import { githubLogout } from '../actions/oauth'
import { pushbulletRequestLogin, pushbulletFetchToken } from '../actions/oauth'

function mapStateToProps(state) {
  return {
    user: state.users.user,
    pushbullet: state.oauth.pushbullet,
    webhook: state.webhook
  }
}

class App extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
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
    this.pushbullet = {
      url: `${WEBTASK_URL}&login=pushbullet`
    }
  }

  initPbClient(isAuthenticated) {
    if (isAuthenticated) {
      this.pbClient.init(this.props.pushbullet.accessToken)
    }
  }

  componentDidMount() {
    console.log('App did mount %o', this.props.pushbullet)
    const {code} = this.props.pushbullet
    if (code) {
      console.log('fetching Pushbullet access token...')
      this.props.pushbulletFetchToken(code)
      this.context.router.replace('/')
    }
    this.props.getActiveUser()
    this.initPbClient(this.props.pushbullet.isAuthenticated)
  }

  render() {
    const {user} = this.props
    const {path} = this.props.route
    const webhook = this.props.webhook
    const webhookEvent = webhook ? webhook.githubEvent : null
    const {isAuthenticated, isAuthenticating} = this.props.pushbullet

    return (
      <div>
        <Optional if={path.search(/^\/login/) === -1}>
          <NavHeader user={user} logout={this.props.githubLogout}/>
        </Optional>
        <div className="container">
          <Row>
            <Col sm={12}>
              <h4>received webhook:&nbsp;
                <small>{webhookEvent}</small>
              </h4>
              <code>{JSON.stringify(webhook)}</code>
            </Col>
          </Row>
          <Row style={{paddingTop: '10px'}}>
            <Col sm={2}>
              <a className="btn btn-default center-block"
                 href={this.pushbullet.url} disabled={isAuthenticated || isAuthenticating}
                 onClick={this.props.pushbulletRequestLogin}>
                {(() => (
                  isAuthenticating
                    ? (<i className="fa fa-spinner fa-pulse"/>)
                    : (<i className="fa fa-cloud"/>)
                ))()}
                &nbsp;Pushbullet login
              </a>
            </Col>
          </Row>
          <Row>
            <RepositoryBrowser repositories={[{},{},{}]}/>
          </Row>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, {
  getActiveUser, receiveWebhook, githubLogout, pushbulletRequestLogin, pushbulletFetchToken
})(App)
