import { combineReducers } from 'redux'

import oauth from './oauth'
import users from './users'
import webhook from './webhook'

const rootReducer = combineReducers({
  oauth, users, webhook
})

export default rootReducer
