import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import { makeRootReducer } from './rootReducer'

export default (initialState = {}, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middlewares = [thunk, routerMiddleware(history)]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (__DEV__) {
    /** Redux DevTools 形式二选一 **/

    /* 1. Chrome插件Redux DevTools
       P.S: 独立窗口可调用 window.devToolsExtension.open() */
    // const devToolsExtension = window.devToolsExtension
    // if (typeof devToolsExtension === 'function') {
    //   enhancers.push(devToolsExtension())
    // }
    
    /* 2. 内嵌在页面中的Redux DevTools */
    const DevTools = require('CONTAINER/DevTools').default
    enhancers.push(DevTools.instrument())

    /** Redux Logger (P.S: 打印日志会造成轻微的卡顿) **/
    const createLogger = require('redux-logger')
    middlewares.push(createLogger())
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const reducers = require('./rootReducer').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
