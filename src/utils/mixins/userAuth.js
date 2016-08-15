import store from 'REDUX/store'

/**
 * 用户访问权限拦截器
 * @type    {Object}   store（全局state）
 * @return  {Function} onEnter（详见文档如下）
 * https://github.com/reactjs/react-router/blob/master/docs/API.md#onEnter
 */
export default function userAuth(nextState, replace, next) {
  console.log(nextState)
  let { userData } = store.getState()
  if (userData) return next()

  alert('请先登录后再访问')
  next(replace('/msg'))
}
