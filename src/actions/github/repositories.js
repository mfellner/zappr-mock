import fetch from 'isomorphic-fetch'
import { createAction } from 'redux-actions'

import { dispatch } from './'
import { GITHUB_URL } from '../../config'

export const REQUEST_REPOSITORIES = Symbol('request repositories')
export const RECEIVE_REPOSITORIES = Symbol('receive repositories')

const requestRepositories = createAction(REQUEST_REPOSITORIES)
const receiveRepositories = createAction(RECEIVE_REPOSITORIES)

/**
 * https://developer.github.com/v3/repos/#list-your-repositories
 */
export function fetchRepositories() {
  requestRepositories()
  return dispatch(headers => receiveRepositories(
    fetch(`${GITHUB_URL}/user/repos`, {
      method: 'GET',
      headers
    })
    .then(response => response.json())
  ))
}
