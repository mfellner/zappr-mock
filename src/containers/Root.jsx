import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Thumbnail } from 'react-bootstrap'

import { getActiveUser } from '../actions/users'

function mapStateToProps(state) {
  return {
    user: state.users.user
  }
}

class Root extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    getActiveUser: PropTypes.func.isRequired
  };

  onLogin() {
    this.props.getActiveUser()
    ReactDOM.findDOMNode(this.refs.loginBtn).blur()
  }

  render() {
    const username = this.props.user.login || null
    const userurl = this.props.user.html_url || null
    const userimg = this.props.user.avatar_url || 'http://placehold.it/100x100'

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
      </div>
    )
  }
}

export default connect(mapStateToProps, {getActiveUser})(Root)
