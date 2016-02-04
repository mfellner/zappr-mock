import { combineReducers } from 'redux'

import users from './users'
import webhook from './webhook'

const rootReducer = combineReducers({
  users, webhook
})

export default rootReducer
