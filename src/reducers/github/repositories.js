import { handleActions } from 'redux-actions'

import { REQUEST_REPOSITORIES, RECEIVE_REPOSITORIES } from '../../actions/github/repositories'

/**
 * Need to use handleActions instead of handleAction:
 * https://github.com/acdlite/redux-actions/issues/23
 */
export default handleActions({
  [REQUEST_REPOSITORIES]: (state, action) => ({
    isRequesting: true
  }),
  [RECEIVE_REPOSITORIES]: (state, action) => action.payload
}, [])
