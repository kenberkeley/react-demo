import store from 'REDUX/store' 
import { injectReducer } from 'REDUX/rootReducer'
import userAuth from 'MIXIN/userAuth' // 用户访问拦截器

export default {
  path: 'msg',

  /* 布局基页 */
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const container = require('LAYOUT/msg').default
      const reducer = require('REDUCER/msg').default
      injectReducer(store, { key: 'msgs', reducer })
      cb(null, container)
    }, 'msg')
  },

  // 对应 /msg
  indexRoute: {
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('CONTAINER/Msg/MsgList').default)
      }, 'msgList')
    }
  },

  childRoutes: [{
    // 对应 /msg/detail/:msgId
    path: 'detail/:msgId',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('CONTAINER/Msg/MsgDetail').default)
      }, 'msgDetail')
    }
  }, {
    // 对应 /msg/add
    path: 'add',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('CONTAINER/Msg/MsgForm').default)
      }, 'msgForm')
    },
    onEnter: userAuth
  }, {
    // 对应 /msg/:msgId
    path: 'modify/:msgId',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('CONTAINER/Msg/MsgForm').default)
      }, 'msgForm')
    },
    onEnter: userAuth
  }]
}
