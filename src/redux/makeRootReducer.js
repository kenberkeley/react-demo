import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import { default as userData } from 'REDUCER/user'

const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    router,

    // Add sync reducers here
    userData,

    ...asyncReducers
  })
}

export default makeRootReducer
