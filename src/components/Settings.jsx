import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'

export default class Settings extends Component {
  static propTypes = {
    pushbullet: PropTypes.object,
    pushbulletUrl: PropTypes.string,
    pushbulletRequestLogin: PropTypes.func
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
    const {isAuthenticated, isAuthenticating} = this.props.pushbullet
    return (
      <div>
        <Row style={{paddingTop: '10px'}}>
          <Col md={2}>
            <a className="btn btn-default center-block"
               href={this.props.pushbulletUrl} disabled={isAuthenticated || isAuthenticating}
               onClick={this.props.pushbulletRequestLogin}>
              {(() => (
                isAuthenticating
                  ? (<i className="fa fa-spinner fa-pulse"/>)
                  : (<i className="fa fa-cloud"/>)
              ))()}
              &nbsp;Pushbullet login
            </a>
          </Col>
          <Col md={10}>
            <p>{`isAuthenticated: ${this.props.pushbullet.isAuthenticated}`}</p>
            <p>{`isAuthenticating: ${this.props.pushbullet.isAuthenticating}`}</p>
            <p>{`token: ${this.props.pushbullet.accessToken}`}</p>
            <p>{`type: ${this.props.pushbullet.type}`}</p>
          </Col>
        </Row>
      </div>
    )
  }
}
