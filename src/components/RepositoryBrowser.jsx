import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'

import RepositoryList from './RepositoryList.jsx'
import RepositoryDetail from './RepositoryDetail.jsx'

export default class RepositoryBrowser extends Component {
  static propTypes = {
    selected: PropTypes.string,
    repositories: PropTypes.array.isRequired
  };
  static defaultProps = {
    selected: null,
    repositories: []
  };

  render() {
    const {selected, repositories} = this.props
    const repository = repositories.find(r => r.name === selected)
    return (
      <div>
        <Row>
          <Col sm={3}>
            <RepositoryList selected={selected} repositories={repositories}/>
          </Col>
          <Col sm={9}>
            <RepositoryDetail repository={repository}/>
          </Col>
        </Row>
      </div>
    )
  }
}
