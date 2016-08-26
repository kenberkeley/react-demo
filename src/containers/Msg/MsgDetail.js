/**
 * 实际上智能组件和木偶组件最大的区别就在这里
 *
 * 智能组件直接使用 react-redux 提供的 connect 函数获取 state
 * 而木偶组件则是由父组件通过 <Foo bar={某某数据} /> 这种形式传入 state
 * （之后 Foo 这个木偶组件内就可以使用 this.props.bar 获取这个 “某某数据”）
 *
 * 在本 demo 中，一般是 “路由组件”（按需加载的组件） 才需要这样子处理
 * 因为 “路由组件” 是即时加载的，因此没有所谓的父组件给它传入数据
 * 
 * 其他 demo 一般是直接传入，但这样的话会全部打包，没有 Code Splitting
 * <Router
 *   path="/msg/detail"
 *   component={MsgDetail}
 *   userData={userData}
 *   msgs={msgs}>
 * </Router>
 *
 * 以下代码基本上是约定俗成的。有关 connect 函数的用法，可参考：
 * https://github.com/reactjs/react-redux/blob/master/docs/api.md
 * #connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
 */
import { connect } from 'react-redux'
// 利用 export default 将所有 Action Creators 导出，在这里就可以直接获取所有
import { default as mapActionCreators } from 'ACTION/msg/'
import MsgDetail from 'COMPONENT/Msg/MsgDetail'

// 从store中传入组件所需的数据
const mapStateToProps = ({ userData, msg }) => ({ userData, msg })
/* 
  // 上述代码相当于：
  var mapStateToProps = function (state) {
    return {
      userData: state.userData,
      msgs: state.msgs
    }
  }
*/

export default connect(mapStateToProps, mapActionCreators)(MsgDetail)
