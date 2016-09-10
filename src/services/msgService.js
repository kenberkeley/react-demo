import xhr from './xhr/'
/**
 * 对应后端的 /msg/* 所有 API
 */
class MsgService {
  /**
   * 取 msg（命名为 fetch 而非 get 主要是因为是远程操作）
   * @param  {String} options.author   作者名
   * @param  {Number} options.pageIdx  目标页码（默认是第 1 页）
   * @param  {Number} options.quantity 单页请求 msg 的数量（默认每页显示 10 条）
   * @param  {Number} options.msgId
   * @return {Promise}
   */
  fetch ({ author = '', pageIdx = 1, quantity = 10, msgId } = {}) {
    let url = '/msg/'
    
    if (msgId) {
      url += msgId
    } else {
      url = `${url}?author=${author}&pageIdx=${pageIdx}&quantity=${quantity}`
    }

    return xhr({ url })
  }

  /**
   * 新增 msg
   * @param  {Object} msgBody { title:{String}, content:{String} }
   * @return {Promise}
   */
  add (msgBody) {
    return xhr({
      method: 'post',
      url: '/msg',
      body: msgBody
    })
  }

  /**
   * 修改 msg
   * @param  {Object} msgBody { title:{String}, content:{String} }
   * @return {Promise}
   */
  mod (msgBody) {
    let msgId = msgBody.id
    delete msgBody.msgId

    return xhr({
      method: 'put',
      url: `/msg/${msgId}`,
      body: msgBody
    })
  }

  /**
   * 删除 msg
   * @param  {Number} msgId
   * @return {Promise}
   */
  del (msgId) {
    return xhr({
      method: 'delete',
      url: `/msg/${msgId}`
    })
  }

}

// 实例化后再导出
export default new MsgService()
