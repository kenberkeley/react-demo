import makeReducer from 'UTIL/makeReducer'
import { ACTION_HANDLERS } from 'ACTION/todo'
import initState from 'STORE/initState'

export default makeReducer(initState.todos, ACTION_HANDLERS)
