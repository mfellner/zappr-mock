import { handleActions } from 'redux-actions'

import {
  REQUEST_REPOSITORIES, RECEIVE_REPOSITORIES,
  REQUEST_HOOKS, RECEIVE_HOOKS, CREATE_HOOK, DELETE_HOOK
} from '../../actions/github/repositories'

const repository = handleActions({
  [REQUEST_HOOKS]: (state, action) => ({
    ...state,
    isUpdating: true
  }),
  [RECEIVE_HOOKS]: (state, action) => ({
    ...state,
    isUpdating: false,
    webhooks: action.payload.hooks
  }),
  [CREATE_HOOK]: (state, action) => ({
    ...state,
    webhooks: [].concat(state.webhooks, action.payload.hook)
  }),
  [DELETE_HOOK]: (state, action) => ({
    ...state,
    webhooks: [].concat(state.webhooks).filter(
      hook => hook.id !== action.payload.id
    )
  })
}, {
  isUpdating: false,
  webhooks: []
})

function selectRepository(state, action) {
  const {fullName} = action.payload
  const i = state.findIndex(r => r.full_name === fullName)
  if (i === -1) {
    console.error('error, no such repository "%s"', fullName)
    return state
  }
  return [
    ...state.slice(0, i),
    repository(state[i], action),
    ...state.slice(i + 1)
  ]
}

/**
 * Need to use handleActions instead of handleAction:
 * https://github.com/acdlite/redux-actions/issues/23
 */
export default handleActions({
  [REQUEST_REPOSITORIES]: (state, action) => ({
    isRequesting: true
  }),
  [RECEIVE_REPOSITORIES]: (state, action) => action.payload,
  [REQUEST_HOOKS]: selectRepository,
  [RECEIVE_HOOKS]: selectRepository,
  [CREATE_HOOK]: selectRepository,
  [DELETE_HOOK]: selectRepository
}, [])
