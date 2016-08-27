import makeReducer from 'UTIL/makeReducer'
import { ACTION_HANDLERS } from 'ACTION/msg/msg'
import initState from 'STORE/initState'

export default makeReducer(initState.msg.msgs, ACTION_HANDLERS)
