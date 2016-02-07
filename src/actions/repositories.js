import fetch from 'isomorphic-fetch'
import { createAction } from 'redux-actions'

export const FETCH_REPOSITORIES = Symbol('fetch repositories')

const fetchRepositoriesAction = createAction(FETCH_REPOSITORIES)

/**
 * https://developer.github.com/v3/repos/#list-your-repositories
 */
export function fetchRepositories() {
  return (dispatch, getState) => (
    dispatch(fetchRepositoriesAction(fetch(`https://${GITHUB_URL}/user/repos`, {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${getState().oauth.github.accessToken}`
        }
      })
    .then(response => response.json())
    ))
  )
}
