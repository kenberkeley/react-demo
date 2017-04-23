import { injectReducer } from 'REDUCER'
import userAuth from '@/utils//userAuth'           // 用户访问拦截器
import createContainer from '@/utils//createContainer'

const connectComponent = createContainer(
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

      cb(null, require('@/views//msg').default)
    }, 'msgView')
  },

  indexRoute: { // 对应 /msg
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, connectComponent(require('@/components/Msg/MsgList').default))
      }, 'msgList')
    }
  },

  childRoutes: [
  { // 对应 /msg/detail/:msgId
    path: 'detail/:msgId',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, connectComponent(require('@/components/Msg/MsgDetail').default))
      }, 'msgDetail')
    }
  },
  { // 对应 /msg/add
    path: 'add',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, connectComponent(require('@/components/Msg/MsgForm').default))
      }, 'msgForm')
    },
    onEnter: userAuth
  },
  { // 对应 /msg/:msgId
    path: 'modify/:msgId',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, connectComponent(require('@/components/Msg/MsgForm').default))
      }, 'msgForm')
    },
    onEnter: userAuth
  }]
}
