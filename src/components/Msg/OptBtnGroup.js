import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

/* 本组件全称Operation Button Group，操作按钮组 */
export default class OptBtnGroup extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  delMsg () {
    if (!confirm('确认删除？')) return

    let { msgId, delMsg, parentName } = this.props
    delMsg(msgId)

    if (parentName === 'MsgDetail') {
      // 若是在详情页删除，显然应该跳转回列表页
      this.context.router.replace('/msg')
    }
  }
  
  render () {
    let { isAuthor, msgId, children } = this.props
    
    return ( // 请使用括号包含 JSX
      <div
        role="group"
        className="btn-group btn-group-xs pull-right">
        {/* 这里的作用有点类似于 Vue 的 slot
          MsgList 中，<OptBtnGroup> 包的是“详情”链接
          MsgDetail 中，<OptBtnGroup> 包的是“返回”按钮 */
          children }

        {/* 鉴于使用父标签包含后无法匹配 BootStrap 样式
            因此下面只能分离判断 */}
        { isAuthor &&
          <Link
            to={`/msg/modify/${msgId}`}
            className="btn btn-warning">
            修改
          </Link>
        }
        { isAuthor &&
          <a href="javascript:;"
            className="btn btn-danger"
            onClick={() => this.delMsg()}>
            删除
          </a>
        }
      </div>
    )
  }
}
