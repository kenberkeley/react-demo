import createReducer from '@/utils//createReducer'
import { ACTION_HANDLERS } from 'ACTION/msg/displayControl'
import initState from 'STORE/initState'

export default createReducer(initState.msg.displayControl, ACTION_HANDLERS)
