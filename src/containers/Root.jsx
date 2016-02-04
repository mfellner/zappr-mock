import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Thumbnail } from 'react-bootstrap'

import PushbulletClient from './PushbulletClient'
import { getActiveUser } from '../actions/users'
import { receiveWebhook } from '../actions/webhook'

function mapStateToProps(state) {
  return {
    user: state.users.user,
    webhook: state.webhook
  }
}

class Root extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    getActiveUser: PropTypes.func.isRequired,
    receiveWebhook: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
    this.pushbullet = new PushbulletClient(props.receiveWebhook)
  }

  componentDidMount() {
    this.pushbullet.init()
  }

  onLogin() {
    this.props.getActiveUser()
    ReactDOM.findDOMNode(this.refs.loginBtn).blur()
  }

  render() {
    const username = this.props.user.login || null
    const userurl = this.props.user.html_url || null
    const userimg = this.props.user.avatar_url || 'http://placehold.it/100x100'
    const webhook = this.props.webhook
    const webhookEvent = webhook ? webhook.githubEvent : null

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
            <Button ref="loginBtn" disabled={!!username} onClick={this.onLogin.bind(this)}>
              login
            </Button>
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

export default connect(mapStateToProps, {getActiveUser, receiveWebhook})(Root)
