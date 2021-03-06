import { handleActions } from 'redux-actions'

import {
  GITHUB_REQUEST_LOGIN, GITHUB_FETCH_TOKEN, GITHUB_LOGOUT
} from '../../actions/oauth'

/**
 * Need to use handleActions instead of handleAction:
 * https://github.com/acdlite/redux-actions/issues/23
 */
export default handleActions({
  [GITHUB_REQUEST_LOGIN]: (state, action) => ({
    isAuthenticated: false,
    isAuthenticating: true
  }),
  [GITHUB_FETCH_TOKEN]: (state, action) => ({
    code: null,
    state: null,
    accessToken: action.payload.access_token,
    scope: action.payload.scope,
    type: action.payload.token_type,
    isAuthenticated: !!action.payload.access_token,
    isAuthenticating: false
  }),
  [GITHUB_LOGOUT]: (state, action) => ({
    accessToken: null,
    scope: null,
    type: null,
    isAuthenticated: false,
    isAuthenticating: false
  })
}, {
  code: null,
  state: null,
  accessToken: null,
  scope: null,
  type: null,
  isAuthenticated: false,
  isAuthenticating: false
})
