import { combineReducers } from 'redux'

import user from './user'
import repositories from './repositories'

const githubReducer = combineReducers({
  user, repositories
})

export default githubReducer
