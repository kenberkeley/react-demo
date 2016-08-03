import { ACTION_HANDLERS } from 'ACTION/user'
import initState from 'REDUX/initState'

// 通过initState可以更加清晰看到store是怎么样的
const userData = initState.userData

/* 活儿都在ACTION_HANDLER中干了，因此Reducer的代码基本上就是约定俗成 */
export default function reducer (state = userData, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
