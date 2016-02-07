import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import storageEngine from 'redux-storage/engines/localStorage'
import { createStore, applyMiddleware } from 'redux'
import * as storage from 'redux-storage'

import rootReducer from './reducers'

const storageKey = 'zappr-mock'
const engine = storage.decorators.filter(storageEngine(storageKey), [
  'oauth'
])

const createStoreWithMiddleware = applyMiddleware(
  thunk, promiseMiddleware, storage.createMiddleware(engine)
)(createStore)

export function createAppStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}

export function getStoredState() {
  return JSON.parse(localStorage.getItem(storageKey))
}
