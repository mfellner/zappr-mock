import fetch from 'isomorphic-fetch'
import { createAction } from 'redux-actions'

import { dispatch } from './'
import { GITHUB_URL } from '../../config'

export const REQUEST_ACTIVE_USER = Symbol('request active user')
export const RECEIVE_ACTIVE_USER = Symbol('receive active user')

const requestActiveUser = createAction(REQUEST_ACTIVE_USER)
const receiveActiveUser = createAction(RECEIVE_ACTIVE_USER)

/**
 * https://developer.github.com/v3/users/#get-the-authenticated-user
 */
export function fetchActiveUser() {
  requestActiveUser()
  return dispatch(headers => receiveActiveUser(
    fetch(`${GITHUB_URL}/user`, {
      method: 'GET',
      headers
    })
    .then(response => response.json())
  ))
}
