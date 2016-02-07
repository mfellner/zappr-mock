import React, { Component, PropTypes } from 'react'
import { Panel, ListGroup } from 'react-bootstrap'

import RepositoryListItem from './RepositoryListItem.jsx'

export default class RepositoryList extends Component {
  static propTypes = {
    selected: PropTypes.string.isRequired,
    repositories: PropTypes.array.isRequired
  };
  static defaultProps = {
    repositories: []
  };

  render() {
    const {selected, repositories} = this.props
    return (
      <Panel collapsible defaultExpanded header="Repositories">
        <ListGroup componentClass="ul" fill style={{maxHeight: '204px', overflowY: 'scroll'}}>
          {repositories.map((repository, i) => (
            (<RepositoryListItem key={i} repository={repository}
                                 active={repository.name === selected}/>)
          ))}
        </ListGroup>
      </Panel>
    )
  }
}
