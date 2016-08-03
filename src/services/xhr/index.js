import xhr from './jquery'
// import xhr from './superagent'

/**
 * XHR请求接口定义
 * @param  {String} options.method 请求方法，默认为get。支持post、put、patch、delete等
 * @param  {String} options.url    请求路径，基于rootPath地址。例：欲请求http://localhost:9000/user，仅需要填写/user即可
 * @param  {Object} options.body   请求体。后端Express使用req.body获取该对象
 * @return {Promise}
 *
 * 使用例子 xhr({ method: 'post', url: 'XXX', body: {Object} })
 * 最简单的例子 xhr({ url: '/user' })
 */
export default xhr
