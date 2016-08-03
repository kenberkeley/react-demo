import xhr from './xhr/'

/**
 * 对应后端涉及到用户认证的API
 */
class UserService {

  checkLogin () {
    return xhr({ url: '/user' })
  }

  /**
   * P.S. 凡是服务都传对象，不要直接传值（规范）
   * @param  {Object} userData
   * @return {Promise}
   */
  login (userData) {
    return xhr({
      method: 'post',
      url: '/login',
      body: userData
    })
  }

  logout () {
    return xhr({ url: '/logout' })
  }

}

// 单例模式
export default new UserService()
