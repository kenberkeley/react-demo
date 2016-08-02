import { ACTION_HANDLERS } from 'ACTION/msg'
import initState from 'REDUX/initState'

// ------------------------------------
// Reducer
// ------------------------------------
const msgs = initState.msgs
export default function reducer (state = msgs, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
