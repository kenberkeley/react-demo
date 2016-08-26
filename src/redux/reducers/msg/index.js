import { combineReducers } from 'redux'
import msgsReducer from './msgs'
import displayControlReducer from './displayControl'

export default combineReducers({
  msgs: msgsReducer,
  displayControl: displayControlReducer
})
