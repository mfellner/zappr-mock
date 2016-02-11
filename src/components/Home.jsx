import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'

import RepositoryBrowser from '../components/RepositoryBrowser.jsx'

export default class Home extends Component {
  static propTypes = {
    params: PropTypes.object,  // React Router route params
    github: PropTypes.object,
    webhook: PropTypes.object,
    fetchHooks: PropTypes.func.isRequired,
    createHook: PropTypes.func.isRequired,
    deleteHook: PropTypes.func.isRequired
  };

  componentDidMount() {
    console.log('Home did mount %o', this.props)
  }

  render() {
    const {params, github} = this.props
    return (
      <Row>
        <RepositoryBrowser selected={params.repository}
                           repositories={github.repositories}
                           webhook={this.props.webhook}
                           fetchHooks={this.props.fetchHooks}
                           createHook={this.props.createHook}
                           deleteHook={this.props.deleteHook}/>
      </Row>
    )
  }
}
