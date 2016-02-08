import fetch from 'isomorphic-fetch'
import { createAction } from 'redux-actions'

import { dispatch } from './'
import { GITHUB_URL } from '../../config'

export const CREATE_STATUS = Symbol('create status')

const createStatusAction = createAction(CREATE_STATUS)

/**
 * https://developer.github.com/v3/repos/statuses/#create-a-status
 */
export function postStatus(owner, repo, sha, body = null) {
  return dispatch(headers => createStatusAction(
    fetch(`${GITHUB_URL}/repos/${owner}/${repo}/statuses/${sha}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers
    })
    .then(response => response.json()))
  )
}
