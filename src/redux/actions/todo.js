// ================================
// Action Type
// ================================
const ADD_TODO = 'ADD_TODO'
const DEL_TODO = 'DEL_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'

// ================================
// Action Creator
// ================================
const addTodo = (content) => ({
  type: ADD_TODO,
  payload: {
    id: setTimeout(() => {}), // 生成唯一 ID 的一种方式
    content,
    completed: false,
    createdAt: Date.now()
  }
})

const toggleTodo = (todoId) => ({
  type: TOGGLE_TODO,
  payload: todoId
})

const delTodo = (todoId) => ({
  type: DEL_TODO,
  payload: todoId
})

/* default 导出所有 Action Creators */
export default {
  // 虽然是同步的函数，但请不要自行 bindActionCreators
  // 皆因调用 connect 后，react-redux 已经帮我们做了，见：
  // https://github.com/reactjs/react-redux/blob/master/src/utils/wrapActionCreators.js
  addTodo, toggleTodo, delTodo
}

// ================================
// Action handlers for Reducer
// 本来更新 state 是 Reducer 的责任
// 但要把 ActionType 导出又引入实在太麻烦
// 且在 Reducer 中写 switch-case 实在太不优雅
// 故在此直接给出处理逻辑
// ================================
export const ACTION_HANDLERS = {
  [ADD_TODO]: (todos, { payload }) => [ ...todos, payload ],
  [TOGGLE_TODO]: (todos, { payload: todoId }) => todos.map(
    todo => todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
  ),
  [DEL_TODO]: (todos, { payload: todoId }) => todos.filter(
    todo => todo.id !== todoId
  )
}
