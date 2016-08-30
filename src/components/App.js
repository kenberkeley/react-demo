import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { store, history } from 'STORE'
import routes from 'ROUTE'

const App = () => (
  <Provider store={store}>
    <Router history={history} children={routes} />
  </Provider>
)

export default App

/**
 * 【拓展】
 *  Provider 中传入的属性，可以让全体组件轻松访问，避免繁琐累赘的层层下传。例子：
 *  
 *  class XXX extends Component {
 *    static contextTypes = {
 *      // 组件中需要这样子声明
 *      store: PropTypes.object.isRequired
 *    }
 *    componentDidMount () {
 *      // 之后就可以直接这样用
 *      this.context.store.getState()
 *    }
 *  }
 *  
 *  但上面这种官方的做法实在太麻烦，于是我们有更为直接的方式：
 *  import store from 'STORE'
 *  store.getState() // 注意：此仅为只读，更改 state 只能通过 dispatch
*/
