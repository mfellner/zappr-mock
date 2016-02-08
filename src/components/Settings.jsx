import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'

import { WEBTASK_URL } from '../config'

export default class Settings extends Component {
  static propTypes = {
    oauth: PropTypes.object.isRequired,
    pushbulletUrl: PropTypes.string.isRequired,
    pushbulletRequestLogin: PropTypes.func.isRequired
  };
  static defaultProps = {
    pushbulletUrl: `${WEBTASK_URL}&login=pushbullet`
  };

  componentDidMount() {
    console.log('Settings did mount %o', this.props)
  }

  componentWillReceiveProps(props) {
    console.log('Settings will receive props %o', props)
  }

  render() {
    const style = {
      head: {
        paddingTop: '10px'
      }
    }
    const {pushbullet} = this.props.oauth
    const disableLogin = pushbullet.isAuthenticated || pushbullet.isAuthenticating
    return (
      <div>
        <Row style={style.head}>
          <Col md={2}>
            <a className="btn btn-default center-block"
               href={this.props.pushbulletUrl} disabled={disableLogin}
               onClick={this.props.pushbulletRequestLogin}>
              {(() => (
                pushbullet.isAuthenticating
                  ? (<i className="fa fa-spinner fa-pulse"/>)
                  : (<i className="fa fa-cloud"/>)
              ))()}
              &nbsp;Pushbullet login
            </a>
          </Col>
          <Col md={10}>
            <p>{`isAuthenticated: ${pushbullet.isAuthenticated}`}</p>
            <p>{`isAuthenticating: ${pushbullet.isAuthenticating}`}</p>
            <p>{`token: ${pushbullet.accessToken}`}</p>
            <p>{`type: ${pushbullet.type}`}</p>
          </Col>
        </Row>
      </div>
    )
  }
}
