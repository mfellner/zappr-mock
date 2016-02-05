import fetch from 'isomorphic-fetch'
import { createAction } from 'redux-actions'

export const FETCH_ACCESS_TOKEN = Symbol('fetch access token')

const fetchAccessToken = createAction(FETCH_ACCESS_TOKEN)

/**
 * https://developer.github.com/v3/oauth/#web-application-flow
 */
export function oauthHandshake(code, state) {
  return fetchAccessToken(fetch(WEBTASK_URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'x-zappr-oauth-code': code,
      'x-zappr-oauth-state': state
    }
  })
  .then(response => response.json()))
}
