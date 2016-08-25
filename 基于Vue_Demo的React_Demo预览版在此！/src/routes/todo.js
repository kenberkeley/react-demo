import { injectReducer } from 'REDUCER'

export default {
  path: 'todo',

  /* 布局基页 */
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('VIEW/todo').default)
    }, 'todoView')
  },

  indexRoute: {
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        injectReducer('todos', require('REDUCER/todo').default)

        cb(null, require('CONTAINER/todo').default)
      }, 'todoIndex')
    }
  }
}

/**
 * 【拓展】
 * 在 msg 的路由中，Reducer 是在 布局基页 中注入
 * 而在这里就可以在 indexRoute 中注入
 * 这主要是取决于 Reducer 的作用范围
 */
