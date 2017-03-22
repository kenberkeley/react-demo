// ========================================================
// 同步 history 配置
// ========================================================
import { useRouterHistory } from 'react-router'
import createHashHistory from 'history/lib/createHashHistory'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'

const browserHistory = useRouterHistory(createHashHistory)({
  basename: '', // 相当于 rootPath
  queryKey: false // 去除随机标识符
})

export const historyMiddleware = routerMiddleware(browserHistory)

/**
 * @param  {Store}
 * @return {History} 增强版 history
 */
export default function (store) {
  return syncHistoryWithStore(
    browserHistory,
    store,
    { selectLocationState: (state) => state.router }
  )
}
