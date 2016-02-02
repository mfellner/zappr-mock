import { handleActions } from 'redux-actions'

import { FETCH_ACTIVE_USER } from '../actions/users'

/**
 * Need to use handleActions instead of handleAction:
 * https://github.com/acdlite/redux-actions/issues/23
 */
export default handleActions({
  [FETCH_ACTIVE_USER]: (state, action) => ({
    user: action.payload
  })
}, {user: {}})

