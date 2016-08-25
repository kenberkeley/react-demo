import { ACTION_HANDLERS } from 'ACTION/msg/msg'
import initState from 'STORE/initState'

const msgs = initState.msg.msgs

export default function msgsReducer(state = msgs, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
