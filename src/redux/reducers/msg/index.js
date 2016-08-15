import { combineReducers } from 'redux'
import { default as msgs } from './msgs'
import { default as displayControl } from './displayControl'

export default combineReducers({
  msgs,
  displayControl
})
