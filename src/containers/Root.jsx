import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

function mapStateToProps(state) {
  return {}
}

class Root extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="container">
        <Row style={{paddingTop: '10px'}}>
          <Col sm={12}>
            <h1>Hello world,&nbsp;
              <small>this is zappr-mock</small>
            </h1>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, {})(Root)
