import React, { Component, PropTypes } from 'react'

export default class RepositoryDetail extends Component {
  static propTypes = {
    repository: PropTypes.object.isRequired
  };
  static defaultProps = {
    repository: {}
  };

  render() {
    return (
      <div>
        <h4>Repository detail</h4>
        <code>{JSON.stringify(this.props.repository)}</code>
      </div>
    )
  }
}
