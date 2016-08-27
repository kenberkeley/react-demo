import makeReducer from 'UTIL/makeReducer'
import { ACTION_HANDLERS } from 'ACTION/msg/displayControl'
import initState from 'STORE/initState'

export default makeReducer(initState.msg.displayControl, ACTION_HANDLERS)
