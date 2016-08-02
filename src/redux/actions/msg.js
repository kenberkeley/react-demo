import msgService from 'SERVICE/msgService'

const FETCH_MSG = 'FETCH_MSG'
const ADD_MSG = 'ADD_MSG'
const MOD_MSG = 'MOD_MSG'
const DEL_MSG = 'DEL_MSG'

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
    .then(re => dispatch({
      type: DEL_MSG,
      payload: msgId
    }))

export default {
  fetchMsg, addMsg, modMsg, delMsg
}

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
