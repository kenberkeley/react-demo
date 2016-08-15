import store from './store'
import makeRootReducer from './makeRootReducer'
import throwError from 'UTIL/throwError'

/* 按需加载的时候，需要下面这货来挂载store */
const injectReducer = ({ key, reducer }) => {
  if (!key) {
    throwError('[injectReducer] `key` must be provided')
  }
  if (!reducer) {
    throwError('[injectReducer] `reducer` must be provided')
  }
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default injectReducer
