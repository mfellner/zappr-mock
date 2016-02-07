import React, { Component, PropTypes } from 'react'

export default class RepositoryListItem extends Component {
  static propTypes = {
    repository: PropTypes.object.isRequired
  };
  static defaultProps = {
    repository: {}
  };

  render() {
    return (
      <li className="list-group-item">
        <strong>Repository list item</strong>
        <div>
          <code>{JSON.stringify(this.props.repository)}</code>
        </div>
      </li>
    )
  }
}
