import store, { history } from 'STORE'

/**
 * 用户访问权限拦截器
 * @export {Function} onEnter，详见以下文档：
 * https://github.com/reactjs/react-router/blob/master/docs/API.md#onEnter
 */
export default function userAuth(nextState, replace, next) {
  let { userData } = store.getState()
  if (userData) return next()

  alert('请先登录后再访问')
  history.goBack()
  // next(replace('/loginPage')) # 举例：跳转到登录页的写法
}
