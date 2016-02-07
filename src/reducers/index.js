import { combineReducers } from 'redux'

import oauth from './oauth'
import users from './users'
import repositories from './repositories'
import webhook from './webhook'

const rootReducer = combineReducers({
  oauth, users, repositories, webhook
})

export default rootReducer
