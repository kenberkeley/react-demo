import userService from 'SERVICE/userService'
// ------------------------------------
// Constants
// ------------------------------------
export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'

// ------------------------------------
// Actions
// ------------------------------------
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

export default {
  login, checkLogin, logout
}

// ------------------------------------
// Action Handlers
// ------------------------------------
export const ACTION_HANDLERS = {
  [LOG_IN]  : (state, { payload }) => ({ ...state, ...payload }),
  [LOG_OUT] : (state, action) => null
}
