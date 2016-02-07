import React, { Component, PropTypes } from 'react'

export default class RepositoryDetail extends Component {
  static propTypes = {
    repository: PropTypes.object.isRequired
  };
  static defaultProps = {
    repository: {}
  };

  render() {
    const {repository} = this.props
    return (
      <div>
        <h4>{repository.name}</h4>
        <a href={repository.html_url}>{repository.html_url}</a>
      </div>
    )
  }
}
