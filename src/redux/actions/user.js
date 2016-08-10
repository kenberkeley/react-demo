import userService from 'SERVICE/userService'
/* 定义Action常量 */
export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'

/* 定义Actions Creator */
const loginDone = (userData) => ({
  type: LOG_IN,
  payload: userData
})

const login = (formData) => {
  return dispatch => {
    userService
      .login(formData)
      .then(
        re => dispatch(loginDone(re))
      )
  }
}

const checkLogin = () => {
  return dispatch => {
    userService
      .checkLogin()
      .then((re) => {
        if (!re) return
        dispatch(loginDone(re))
      })
  }
}

const logout = () => {
  return dispatch => {
    userService
      .logout()
      .then(() => 
        dispatch({
          type: LOG_OUT
        })
      )
  }
}
/* default导出所有Actions Creator，Container就可以很方便地全部mapActionCreators */
export default {
  login, checkLogin, logout
}

/* 这其实属于Reducer范畴（还记得switch-case吗）
   但把常量export来import去很烦人，于是在这直接处理好了 */
export const ACTION_HANDLERS = {
  [LOG_IN]  : (state, { payload }) => ({ ...state, ...payload }),
  [LOG_OUT] : (state, action) => null
}
