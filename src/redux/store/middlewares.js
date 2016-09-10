// ======================================================
// 配置中间件
// ======================================================
import thunk from 'redux-thunk'
import { historyMiddleware } from './syncHistoryWithStore'

const middlewares = [thunk, historyMiddleware]

if (__DEV__) {
  /** Redux Logger (P.S: 打印日志会造成轻微的卡顿) **/
  const createLogger = require('redux-logger')
  middlewares.push(createLogger())
}

export default middlewares
