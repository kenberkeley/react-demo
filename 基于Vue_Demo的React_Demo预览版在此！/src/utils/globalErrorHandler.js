export default function globalErrorHandler(errMsg) {
  if (__DEV__) {
    throw new Error(errMsg)
  }
  if (__PROD__) {
    // 自行处理生产环境下的报错
  }
}

/**
 * 例如，您可以这样：
 * 
 * import store from 'STORE'
 * import xhr from 'SERVICE/xhr/'
 * 
 * xhr({
 *   url: '/reportError',
 *   method: 'post',
 *   body: {
 *     errMsg: XXX,
 *     state: store.getState() // 上传整个应用的状态便于恢复报错场景
 *   }
 * })
 */
