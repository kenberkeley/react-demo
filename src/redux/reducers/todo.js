import { ACTION_HANDLERS } from 'ACTION/todo'
import initState from 'STORE/initState'

const todos = initState.todos

export default function todosReducer(state = todos, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
