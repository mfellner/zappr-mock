import React, { Component, PropTypes } from 'react'
import { Row, Col, Panel, Badge } from 'react-bootstrap'

import Toggle from './Toggle.jsx'
import { WEBTASK_URL } from '../config'

export default class RepositoryDetail extends Component {
  static propTypes = {
    repository: PropTypes.object.isRequired,
    webhook: PropTypes.object,
    fetchHooks: PropTypes.func.isRequired,
    createHook: PropTypes.func.isRequired,
    deleteHook: PropTypes.func.isRequired
  };
  static defaultProps = {
    repository: {}
  };

  componentWillReceiveProps(props) {
    const {webhooks, name, owner} = props.repository
    if (owner && !webhooks) {
      props.fetchHooks(owner.login, name)
    }
  }

  onToggle(checked) {
    const {repository} = this.props
    const {name, owner, webhooks} = repository
    if (checked && owner) {
      this.props.createHook(owner.login, name)
    }
    else if (!checked && owner && webhooks) {
      const {id} = this.getWebhook()
      this.props.deleteHook(owner.login, name, id)
    }
  }

  getWebhook() {
    const webhooks = this.props.repository.webhooks || []
    return webhooks.find(hook => (
      hook.config &&
      hook.config.url.startsWith(WEBTASK_URL))
    )
  }

  render() {
    const webhook = this.props.webhook.githubEvent
    && this.props.webhook.repository.full_name === this.props.repository.full_name
      ? (
      <span>
        <strong>{this.props.webhook.githubEvent}:&nbsp;</strong>
        <code>{JSON.stringify(this.props.webhook)}</code>
      </span>)
      : null
    const {repository} = this.props
    const enabled = !!this.getWebhook()
    const display = repository.name ? null : 'none'
    const header = (
      <h3>
        <a href={repository.html_url}>{repository.name}</a>
        &nbsp;<Badge><i className="fa fa-star">&nbsp;</i>{repository.stargazers_count}</Badge>
        &nbsp;<Badge><i className="fa fa-code-fork">&nbsp;</i>{repository.forks_count}</Badge>
        &nbsp;<Badge><i className="fa fa-exclamation-circle">&nbsp;</i>{repository.open_issues}</Badge>
      </h3>
    )
    return (
      <Panel header={header} style={{display}}>
        <Row>
          <Col md={12}>
            <Toggle checked={enabled} onToggle={this.onToggle.bind(this)}/>
            <span style={{paddingLeft:'1.2rem'}}>enable Zappr</span>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h5>webhook</h5>
            {webhook}
          </Col>
        </Row>
      </Panel>
    )
  }
}
