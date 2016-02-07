import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'

import RepositoryList from './RepositoryList.jsx'
import RepositoryDetail from './RepositoryDetail.jsx'

export default class RepositoryBrowser extends Component {
  static propTypes = {
    repositories: PropTypes.array.isRequired
  };
  static defaultProps = {
    repositories: []
  };

  render() {
    const {repositories} = this.props
    return (
      <div>
        <Row>
          <Col sm={3}>
            <RepositoryList repositories={repositories}/>
          </Col>
          <Col sm={9}>
            <RepositoryDetail repository={{}}/>
          </Col>
        </Row>
      </div>
    )
  }
}
