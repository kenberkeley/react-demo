/**
 * 这些代码就跟 containers/ 一样，约定俗成，直接复制粘贴后改动几个字眼就 OK
 */
import { ACTION_HANDLERS } from 'ACTION/msg/displayControl'
import initState from 'STORE/initState'

const displayControl = initState.msg.displayControl

export default function displayControlReducer(state = displayControl, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
