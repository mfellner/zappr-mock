import { handleActions } from 'redux-actions'

import { FETCH_ACCESS_TOKEN } from '../actions/oauth'

/**
 * Need to use handleActions instead of handleAction:
 * https://github.com/acdlite/redux-actions/issues/23
 */
export default handleActions({
  [FETCH_ACCESS_TOKEN]: (state, action) => ({
    accessToken: action.payload.access_token,
    scope: action.payload.scope,
    type: action.payload.token_type
  })
}, {
  accessToken: null,
  scope: null,
  type: null
})
