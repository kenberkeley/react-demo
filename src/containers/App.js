import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { store, history } from 'REDUX/store'
import routes from 'ROUTE/'

const App = () => (
  <Provider store={store}>
    <Router history={history} children={routes} />
  </Provider>
)

export default App

/* 
  【拓展】
  Provider 中传入的属性
  可以让全体组件轻松访问
  避免繁琐累赘的层层下传
  
  class XXX extends Component {
    static contextTypes = {
      // 组件中需要这样子声明
      store: PropTypes.object.isRequired
    }
    componentDidMount () {
      // 之后就可以这样子获取
      this.context.store.getState() // 输出当前根state(store)树
    }
  }
*/