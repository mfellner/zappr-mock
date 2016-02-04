import fetch from 'isomorphic-fetch'
import { createAction } from 'redux-actions'

export const FETCH_ACTIVE_USER = Symbol('fetch active user')

const fetchActiveUser = createAction(FETCH_ACTIVE_USER)

/**
 * https://developer.github.com/v3/users/#get-the-authenticated-user
 */
export function getActiveUser() {
  return fetchActiveUser(fetch(`https://${GITHUB_URL}/user`, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${GITHUB_TOKEN}`
    }
  })
  .then(response => response.json()))
}
