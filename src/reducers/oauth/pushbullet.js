import { handleActions } from 'redux-actions'

import { PUSHBULLET_REQUEST_LOGIN, PUSHBULLET_FETCH_TOKEN } from '../../actions/oauth'

/**
 * Need to use handleActions instead of handleAction:
 * https://github.com/acdlite/redux-actions/issues/23
 */
export default handleActions({
  [PUSHBULLET_REQUEST_LOGIN]: (state, action) => ({
    isAuthenticated: false,
    isAuthenticating: true
  }),
  [PUSHBULLET_FETCH_TOKEN]: (state, action) => ({
    accessToken: action.payload.access_token,
    type: action.payload.token_type,
    isAuthenticated: !!action.payload.access_token,
    isAuthenticating: false
  })
}, {
  code: null,
  accessToken: null,
  type: null,
  isAuthenticated: false,
  isAuthenticating: false
})
