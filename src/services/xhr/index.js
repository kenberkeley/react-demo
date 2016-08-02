// 根据项目的不同自行修改所采用的Ajax类库
// 实际上配置可以在这里写而省去新建./config.js
// 但是这就涉及到循环引用，静态分析会重复打包
import xhr from './jquery'

/*
  e.g. xhr({ method: 'post', url: 'XXX', body: {Object} })
 */
export default xhr
