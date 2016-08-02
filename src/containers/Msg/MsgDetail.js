/*
  Component和Container最大的区别就在此

  Container直接使用react-redux提供的connect函数连接到store
  而Component则是通过 <Foo bar={this.props.bar} /> 这种形式传入数据

  一般是路由基页才需要这样子处理
  因为是按需加载（Webpack的code-splitting）
  而不是像如下这样可以直接传入
  <Router
    path="/msg/detail"
    component={MsgDetail} // 这样的话就不是按需加载了
    userData={userData}
    msgs={msgs}>
  </Router>

  下面的代码基本上是约定俗成，
  有关connect函数的用法，可参考
  https://github.com/reactjs/react-redux/blob/master/docs/api.md
  #connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
 */
import { connect } from 'react-redux'
import { default as actions } from 'ACTION/msg'
import MsgDetail from 'COMPONENT/Msg/MsgDetail'

// 传入自定义的actions
const mapActionCreators = actions

// 传入 根state(store) 中所需的数据
// （显然不建议把整个store传进去），相当于：
// var mapStateToProps = function (state) {
//   return {
//     userData: state.userData,
//     msgs: state.msgs
//   }
// }
const mapStateToProps = ({ userData, msgs }) => ({ userData, msgs })

export default connect(mapStateToProps, mapActionCreators)(MsgDetail)
