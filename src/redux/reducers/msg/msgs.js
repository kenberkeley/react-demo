import createReducer from 'UTIL/createReducer'
import { ACTION_HANDLERS } from 'ACTION/msg/msg'
import initState from 'STORE/initState'

export default createReducer(initState.msg.msgs, ACTION_HANDLERS)
