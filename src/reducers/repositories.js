import { handleActions } from 'redux-actions'

import { FETCH_REPOSITORIES } from '../actions/repositories'

/**
 * Need to use handleActions instead of handleAction:
 * https://github.com/acdlite/redux-actions/issues/23
 */
export default handleActions({
  [FETCH_REPOSITORIES]: (state, action) => action.payload
}, [])
