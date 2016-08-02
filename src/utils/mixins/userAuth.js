import store from 'REDUX/store'

/**
 * 用户访问权限拦截器
 * @type    {Object}   store（全局state）
 * @return  {Function} onEnter（详见文档如下）
 * https://github.com/reactjs/react-router/blob/master/docs/API.md#onEnter
 */
const userAuth = (nextState, replace, next)  => {
  let { userData } = store.getState()
  if (userData) return next()

  alert('请先登录后再访问')
  next(replace('/msg'))
}

export default userAuth

/*
  官方的函数参数表是
  onEnter (nextState, replace, cb)
  
  但拦截器实则就是一种中间件
  跟Express中的中间件是一个道理
  在Express中我们惯用的是next
  这里为了更容易理解也用了next
 */
