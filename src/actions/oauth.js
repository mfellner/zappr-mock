import fetch from 'isomorphic-fetch'
import { createAction } from 'redux-actions'

import { WEBTASK_URL } from '../config'

export const GITHUB_REQUEST_LOGIN = Symbol('github request login')
export const GITHUB_FETCH_TOKEN = Symbol('github fetch token')
export const PUSHBULLET_REQUEST_LOGIN = Symbol('pushbullet request login')
export const PUSHBULLET_FETCH_TOKEN = Symbol('pushbullet fetch token')
export const GITHUB_LOGOUT = Symbol('github logout')

export const githubRequestLogin = createAction(GITHUB_REQUEST_LOGIN)

/**
 * https://developer.github.com/v3/oauth/#web-application-flow
 */
export const githubFetchToken = createAction(GITHUB_FETCH_TOKEN,
  (code, state) => fetch(WEBTASK_URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'x-zappr-oauth-type': 'github',
      'x-zappr-oauth-code': code,
      'x-zappr-oauth-state': state
    }
  })
  .then(response => response.json())
)

export const pushbulletRequestLogin = createAction(PUSHBULLET_REQUEST_LOGIN)

/**
 * https://docs.pushbullet.com/#oauth2
 */
export const pushbulletFetchToken = createAction(PUSHBULLET_FETCH_TOKEN,
  (code) => fetch(WEBTASK_URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'x-zappr-oauth-type': 'pushbullet',
      'x-zappr-oauth-code': code
    }
  })
  .then(response => response.json())
)

export const githubLogout = createAction(GITHUB_LOGOUT)
