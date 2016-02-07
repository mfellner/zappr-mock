import React, { Component, PropTypes } from 'react'
import { ListGroup } from 'react-bootstrap'

import RepositoryListItem from './RepositoryListItem.jsx'

export default class RepositoryList extends Component {
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
        <h4>Repositories</h4>
        <ListGroup componentClass="ul">
          {repositories.map((repository, i) => (
            (<RepositoryListItem key={i} repository={repository}/>)
          ))}
        </ListGroup>
      </div>
    )
  }
}
