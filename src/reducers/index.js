import { combineReducers } from 'redux'

import oauth from './oauth'
import github from './github'
import webhook from './webhook'

const rootReducer = combineReducers({
  oauth, webhook, github
})

export default rootReducer
