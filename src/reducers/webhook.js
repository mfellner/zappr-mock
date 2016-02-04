import { handleActions } from 'redux-actions'

import { RECEIVE_WEBHOOK } from '../actions/webhook'

/**
 * Need to use handleActions instead of handleAction:
 * https://github.com/acdlite/redux-actions/issues/23
 */
export default handleActions({
  [RECEIVE_WEBHOOK]: (state, action) => (action.payload)
}, null)
