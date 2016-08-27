import { store, history } from 'STORE'

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

/* 
  还记得吗？在 Vue Demo 中
  我们依靠 userService 实现 userData 的全局访问
  每次修改顶级变量 $root.userData 都要同步 userService.data
  如今用上 Redux，就再也不需要这样操作了
 */
