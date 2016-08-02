import xhr from './xhr/'
/**
 * 对应后端的/msg/*所有API
 */
class MsgService {

  constructor () {
    // 虽有./lib/prefixWithSlash.js提供补全
    // 但最好还是写成/msg的形式而不是msg
    this.baseUrl = '/msg'
  }

  /**
   * 取msg（命名为fetch而非get主要是因为是远程操作）
   * @param  {String} options.author   作者名
   * @param  {Number} options.pageIdx  目标页码（默认是第1页）
   * @param  {Number} options.quantity 单页请求msg的数量（默认10）
   * @param  {Number} options.msgId
   * @return {Promise}
   */
  fetch ({ author = '', pageIdx = 1, quantity = 10, msgId } = {}) {
    let url = this.baseUrl + '/'
    
    if (msgId) {
      url += msgId
    } else {
      url = `${url}?author=${author}&pageIdx=${pageIdx}&quantity=${quantity}`
    }

    return xhr({ url })
  }

  /**
   * 新增msg
   * @param  {Object} msgBody { title:{String}, content:{String} }
   * @return {Promise}
   */
  add (msgBody) {
    return xhr({
      method: 'post',
      url: this.baseUrl,
      body: msgBody
    })
  }

  /**
   * 修改msg
   * @param  {Object} msgBody { title:{String}, content:{String} }
   * @return {Promise}
   */
  mod (msgBody) {
    let msgId = msgBody.id
    delete msgBody.msgId

    return xhr({
      method: 'put',
      url: `${this.baseUrl}/${msgId}`,
      body: msgBody
    })
  }

  /**
   * 删除msg
   * @param  {Number} msgId
   * @return {Promise}
   */
  del (msgId) {
    return xhr({
      method: 'delete',
      url: `${this.baseUrl}/${msgId}`
    })
  }

}

// 单例模式
export default new MsgService()
