import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'

import RepositoryList from './RepositoryList.jsx'
import RepositoryDetail from './RepositoryDetail.jsx'

export default class RepositoryBrowser extends Component {
  static propTypes = {
    selected: PropTypes.string.isRequired,
    repositories: PropTypes.array.isRequired,
    webhook: PropTypes.object,
    fetchHooks: PropTypes.func.isRequired,
    createHook: PropTypes.func.isRequired,
    deleteHook: PropTypes.func.isRequired
  };
  static defaultProps = {
    selected: '',
    repositories: []
  };

  render() {
    const {selected, repositories, webhook} = this.props
    const {fetchHooks, createHook, deleteHook} = this.props
    const repository = repositories.find(r => r.name === selected)
    return (
      <div>
        <Row>
          <Col sm={3}>
            <RepositoryList selected={selected} repositories={repositories}/>
          </Col>
          <Col sm={9}>
            <RepositoryDetail repository={repository}
                              webhook={webhook}
                              fetchHooks={fetchHooks}
                              createHook={createHook}
                              deleteHook={deleteHook}/>
          </Col>
        </Row>
      </div>
    )
  }
}
