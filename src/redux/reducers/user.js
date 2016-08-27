import makeReducer from 'UTIL/makeReducer'
import { ACTION_HANDLERS } from 'ACTION/user'
import initState from 'STORE/initState'

export default makeReducer(initState.userData, ACTION_HANDLERS)
