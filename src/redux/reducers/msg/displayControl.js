import { ACTION_HANDLERS } from 'ACTION/msg/displayControl'
import initState from 'REDUX/initState'

const displayControl = initState.msg.displayControl

export default function displayControlReducer(state = displayControl, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
