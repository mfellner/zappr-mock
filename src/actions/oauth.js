import fetch from 'isomorphic-fetch'
import { createAction } from 'redux-actions'

export const GITHUB_REQUEST_LOGIN = Symbol('github request login')
export const GITHUB_FETCH_TOKEN = Symbol('github fetch token')

export const requestGithubLogin = createAction(GITHUB_REQUEST_LOGIN)

/**
 * https://developer.github.com/v3/oauth/#web-application-flow
 */
export const githubFetchToken = createAction(GITHUB_FETCH_TOKEN,
  (code, state) => fetch(WEBTASK_URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'x-zappr-oauth-code': code,
      'x-zappr-oauth-state': state
    }
  })
  .then(response => response.json())
)
