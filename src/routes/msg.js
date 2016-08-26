import { injectReducer } from 'REDUCER'
import userAuth from 'UTIL/userAuth'           // 用户访问拦截器
import makeContainer from 'UTIL/makeContainer'

const connectComponent = makeContainer(
  ({ userData, msg }) => ({ userData, msg }), // mapStateToProps
  require('ACTION/msg').default               // mapActionCreators
)

export default {
  path: 'msg',

  /* 布局基页 */
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      // 立即注入 Reducer
      injectReducer('msg', require('REDUCER/msg/').default)

      cb(null, require('VIEW/msg').default)
    }, 'msgView')
  },

  indexRoute: { // 对应 /msg
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, connectComponent(require('COMPONENT/Msg/MsgList').default))
      }, 'msgList')
    }
  },

  childRoutes: [
  { // 对应 /msg/detail/:msgId
    path: 'detail/:msgId',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, connectComponent(require('COMPONENT/Msg/MsgDetail').default))
      }, 'msgDetail')
    }
  },
  { // 对应 /msg/add
    path: 'add',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, connectComponent(require('COMPONENT/Msg/MsgForm').default))
      }, 'msgForm')
    },
    onEnter: userAuth
  },
  { // 对应 /msg/:msgId
    path: 'modify/:msgId',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, connectComponent(require('COMPONENT/Msg/MsgForm').default))
      }, 'msgForm')
    },
    onEnter: userAuth
  }]
}
