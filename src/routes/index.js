import store from 'REDUX/store'

export default {
  path: '/',
  component: require('LAYOUT/main/').default,
  indexRoute: {
    component: require('COMPONENT/Welcome').default
  },
  childRoutes: [
    require('./msg').default,
    
    // 强制“刷新”页面的hack
    { path: 'redirect', component: require('COMPONENT/Redirect').default },
    
    // 均不匹配的情况一定要放到最后，否则会拦截所有路由
    { path: '*', component: require('COMPONENT/404').default }
  ]
}

/*
  当前路由树如下
  |- /
  |- /msg
  |- /msg/add
  |- /msg/detail/:msgId
  |- /msg/modify/:msgId
  |
  |- /redirect
*/
