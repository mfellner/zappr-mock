import { combineReducers } from 'redux'

import github from './github'
import pushbullet from './pushbullet'

const oauthReducer = combineReducers({
  github, pushbullet
})

export default oauthReducer
