import xhr from './jquery'

/**
 * XHR 请求接口定义
 * @param  {String} options.method 请求方法，默认为 get。支持 post、put、patch、delete 等
 * @param  {String} options.url    请求路径，基于 rootPath 地址。例：欲请求 http://localhost:9000/user，仅需要填写 /user 即可
 * @param  {Object} options.body   请求体。后端 Express 使用 req.body 获取该对象
 * @return {Promise}
 *
 * 使用例子 xhr({ method: 'post', url: 'XXX', body: {Object} })
 * 最简单的例子 xhr({ url: '/user' })
 */
export default xhr
