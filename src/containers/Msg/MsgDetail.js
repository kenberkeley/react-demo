/*
  实际上Component和Container最大的区别就在这里

  Container直接使用react-redux提供的connect函数连接到store
  而Component则是通过 <Foo bar={this.props.bar} /> 这种形式传入数据

  一般是路由基页才需要这样子处理
  因为我们是按需加载（Webpack的code-splitting）
  而不是像很多demo这样直接传入（这样的话会全部打包）
  <Router
    path="/msg/detail"
    component={MsgDetail}
    userData={userData}
    msgs={msgs}>
  </Router>

  下面的代码基本上是约定俗成的。有关connect函数的用法，可参考：
  https://github.com/reactjs/react-redux/blob/master/docs/api.md
  #connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
 */
import { connect } from 'react-redux'
import { default as mapActionCreators } from 'ACTION/msg/'
import MsgDetail from 'COMPONENT/Msg/MsgDetail'

// 从store中传入组件所需的数据
const mapStateToProps = ({ userData, msg }) => ({ userData, msg })
// 相当于：
// var mapStateToProps = function (state) {
//   return {
//     userData: state.userData,
//     msgs: state.msgs
//   }
// }

export default connect(mapStateToProps, mapActionCreators)(MsgDetail)
