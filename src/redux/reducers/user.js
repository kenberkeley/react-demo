import { ACTION_HANDLERS } from 'ACTION/user'
import initState from 'STORE/initState'

const userData = initState.userData

export default function userReducer(state = userData, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
