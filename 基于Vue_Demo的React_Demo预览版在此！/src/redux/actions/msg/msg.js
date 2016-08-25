import msgService from 'SERVICE/msgService'
// ================================
// Action Type
// ================================
const FETCH_MSG = 'FETCH_MSG'
const ADD_MSG = 'ADD_MSG'
const MOD_MSG = 'MOD_MSG'
const DEL_MSG = 'DEL_MSG'

// ================================
// Action Creator
// ================================
const fetchMsg = queryBody => dispatch =>
  msgService
    .fetch(queryBody)
    .then(msgs => dispatch({
      type: FETCH_MSG,
      payload: msgs
    }))

const addMsg = msgBody => dispatch =>
  msgService
    .add(msgBody)
    .then(msg => {
      dispatch({
        type: ADD_MSG,
        payload: msg
      })
      return msg
    })

const modMsg = msgBody => dispatch =>
  msgService
    .mod(msgBody)
    .then(msg => {
      dispatch({
        type: MOD_MSG,
        payload: msg
      })
      return msg // 便于链式调用
    })

const delMsg = msgId => dispatch =>
  msgService
    .del(msgId)
    .then(() => dispatch({
      type: DEL_MSG,
      payload: msgId
    }))

/* default 导出所有 Action Creators，在 Container 中就可以很方便地全部 mapActionCreators */
export default {
  fetchMsg, addMsg, modMsg, delMsg
}

// ================================
// Action handlers for Reducer
// 本来更新 state 是 Reducer 的责任
// 但要把 ActionType 导出又引入实在太麻烦
// 且在 Reducer 中写 switch-case 实在太不优雅
// 故在此直接给出处理逻辑
// ================================
export const ACTION_HANDLERS = {
  [FETCH_MSG]: (msgs, { payload }) => payload,
  [ADD_MSG]: (msgs, { payload }) => [ ...msgs, payload ],
  [MOD_MSG]: (msgs, { payload }) => msgs.map(
    msg => msg.id === payload.id ? payload : msg
  ),
  [DEL_MSG]: (msgs, { payload }) => msgs.filter(
    msg => msg.id !== payload // payload is msgId
  )
}
