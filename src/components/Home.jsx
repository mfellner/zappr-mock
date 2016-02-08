import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'

import RepositoryBrowser from '../components/RepositoryBrowser.jsx'

export default class Home extends Component {
  static propTypes = {
    params: PropTypes.object,  // React Router route params
    webhook: PropTypes.object,
    github: PropTypes.object
  };

  componentDidMount() {
    console.log('Home did mount %o', this.props)
  }

  componentWillReceiveProps(props) {
    console.log('Home will receive props %o', props)
  }

  render() {
    const {params, webhook, github} = this.props
    const webhookEvent = webhook ? webhook.githubEvent : null
    return (
      <div>
        <Row>
          <Col sm={12}>
            <h4>received webhook:&nbsp;
              <small>{webhookEvent}</small>
            </h4>
            <code>{JSON.stringify(webhook)}</code>
          </Col>
        </Row>
        <Row>
          <RepositoryBrowser selected={params.repository}
                             repositories={github.repositories}/>
        </Row>
      </div>
    )
  }
}
