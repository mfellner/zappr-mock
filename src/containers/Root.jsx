import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Thumbnail } from 'react-bootstrap'

import PushbulletClient from './PushbulletClient'
import { oauthHandshake } from '../actions/oauth'
import { getActiveUser } from '../actions/users'
import { receiveWebhook } from '../actions/webhook'

function mapStateToProps(state) {
  return {
    user: state.users.user,
    oauth: state.oauth,
    webhook: state.webhook
  }
}

class Root extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    oauth: PropTypes.object.isRequired,
    oauthHandshake: PropTypes.func.isRequired,
    getActiveUser: PropTypes.func.isRequired,
    receiveWebhook: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
    this.pushbullet = new PushbulletClient(props.receiveWebhook)
  }

  componentDidMount() {
    const {code, state, accessToken} = this.props.oauth
    if (code && state) {
      console.log('waiting for Github OAuth handshake...')
      this.props.oauthHandshake(code, state)
      return
    }
    if (accessToken) {
      this.props.getActiveUser()
    }
    this.pushbullet.init()
  }

  onOAuthLogin() {
    const scope = 'user'
    const state = 'foobar'
    this.props.oauthLogin(scope, state)
    ReactDOM.findDOMNode(this.refs.oauthLoginBtn).blur()
  }

  render() {
    console.log('oauth %o', this.props.oauth)

    // TODO: move getActiveUser somewhere else
    if (this.props.oauth.accessToken && !this.props.user.login) {
      this.props.getActiveUser()
    }

    const username = this.props.user.login || null
    const userurl = this.props.user.html_url || null
    const userimg = this.props.user.avatar_url || 'http://placehold.it/100x100'
    const webhook = this.props.webhook
    const webhookEvent = webhook ? webhook.githubEvent : null

    // TODO: move somewhere else
    const scope = 'user'
    const state = 'foobar'
    const oauthLoginUrl = `${WEBTASK_URL}?scope=${scope}&state=${state}`

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
          <Col sm={2}>
            <a className="btn btn-default" href={oauthLoginUrl}>
              OAuth login
            </a>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <h4>received webhook:&nbsp;
              <small>{webhookEvent}</small>
            </h4>
            <code>{JSON.stringify(webhook)}</code>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, {
  oauthHandshake, getActiveUser, receiveWebhook
})(Root)

