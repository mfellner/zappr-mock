import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Thumbnail } from 'react-bootstrap'

import PushbulletClient from './PushbulletClient'
import { getActiveUser } from '../actions/users'
import { receiveWebhook } from '../actions/webhook'
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
    const username = this.props.user.login || null
    const userurl = this.props.user.html_url || null
    const userimg = this.props.user.avatar_url || 'http://placehold.it/100x100'
    const webhook = this.props.webhook
    const webhookEvent = webhook ? webhook.githubEvent : null
    const {isAuthenticated, isAuthenticating} = this.props.pushbullet

    return (
      <div className="container">
        <Row style={{paddingTop: '10px'}}>
          <Col sm={12}>
            <h3>Hello world,&nbsp;
              <small>this is zappr-mock</small>
            </h3>
          </Col>
        </Row>
        <Row>
          <Col sm={2}>
            <Thumbnail src={userimg} href={userurl} style={{width:'100px'}} rounded responsive/>
            <span>{username}</span>
          </Col>
          <Col sm={10}>
            <h4>received webhook:&nbsp;
              <small>{webhookEvent}</small>
            </h4>
            <code>{JSON.stringify(webhook)}</code>
          </Col>
        </Row>
        <Row>
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
      </div>
    )
  }
}

export default connect(mapStateToProps, {
  getActiveUser, receiveWebhook, pushbulletRequestLogin, pushbulletFetchToken
})(App)
