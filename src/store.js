import promiseMiddleware from 'redux-promise'
import { createStore, applyMiddleware } from 'redux'

import rootReducer from './reducers'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)

export function createAppStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
