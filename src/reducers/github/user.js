import { handleActions } from 'redux-actions'

import { REQUEST_ACTIVE_USER, RECEIVE_ACTIVE_USER } from '../../actions/github/users'

/**
 * Need to use handleActions instead of handleAction:
 * https://github.com/acdlite/redux-actions/issues/23
 */
export default handleActions({
  [REQUEST_ACTIVE_USER]: (state, action) => ({
    isRequesting: true
  }),
  [RECEIVE_ACTIVE_USER]: (state, action) => ({
    ...action.payload,
    isRequesting: false
  })
}, {
  isRequesting: true
})
