import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import { createStore, applyMiddleware } from 'redux'

import rootReducer from './reducers'

const createStoreWithMiddleware = applyMiddleware(
  thunk, promiseMiddleware
)(createStore)

export function createAppStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
