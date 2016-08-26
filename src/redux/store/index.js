import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { applyMiddleware, compose, createStore } from 'redux'
import { useRouterHistory } from 'react-router'
import thunk from 'redux-thunk'
import { makeRootReducer } from 'REDUCER'

// ========================================================
// 浏览器 history 配置
// ========================================================
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: '' // 相当于 rootPath
})

// ======================================================
// 配置中间件
// ======================================================
const middlewares = [thunk, routerMiddleware(browserHistory)]
if (__DEV__) {
  /** Redux Logger (P.S: 打印日志会造成轻微的卡顿) **/
  const createLogger = require('redux-logger')
  middlewares.push(createLogger())
}

// ======================================================
// 配置 Store 增强器
// ======================================================
const enhancers = []
if (__DEV__) {
  /** Redux DevTools **/

  /* 1. Chrome 插件 Redux DevTools（默认）
     P.S: 独立窗口可调用 window.devToolsExtension.open() */
  if (!__COMPONENT_DEVTOOLS__) {    
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }
  
  /* 2. 内嵌在页面中的 Redux DevTools 组件 */
  if (__COMPONENT_DEVTOOLS__) {
    const DevTools = require('CONTAINER/DevTools').default
    enhancers.push(DevTools.instrument())
  }
}

// ======================================================
// 实例化 Store
// ======================================================
export const store = createStore(
  makeRootReducer(),
  window.__INITIAL_STATE__ || {}, // 前后端同构（服务端渲染）数据同步
  compose(
    applyMiddleware(...middlewares),
    ...enhancers
  )
)

// ======================================================
// 配置 history 同步
// ======================================================
export const history = syncHistoryWithStore(
  browserHistory,
  store,
  { selectLocationState: (state) => state.router }
)

export default store
