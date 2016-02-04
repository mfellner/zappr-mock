import fetch from 'isomorphic-fetch'
import { createAction } from 'redux-actions'

export const CREATE_STATUS = Symbol('create status')

const createStatus = createAction(CREATE_STATUS)

/**
 * https://developer.github.com/v3/repos/statuses/#create-a-status
 */
export function postStatus(owner, repo, sha, body = null) {
  createStatus(fetch(`https://${GITHUB_URL}/repos/${owner}/${repo}/statuses/${sha}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${GITHUB_TOKEN}`
    }
  })
  .then(response => response.json()))
}
