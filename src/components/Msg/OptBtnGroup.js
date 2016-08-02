import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
/* 本组件全名为Operation Button Group，操作按钮组 */
export default class OptBtnGroup extends Component {
  static contextTypes = {
  /* 有关Context的用法请看文档：
     https://facebook.github.io/react/docs/context.html
     实际上可不引入 this.context.router
     直接使用 this.props.history 即可
     但 console 会报如下警告
     Warning: [react-router] `props.history` and `context.history` are deprecated.
     Please use `context.router`. http://tiny.cc/router-contextchanges */
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
    
    return ( // 请使用括号包含JSX
      <div
        role="group"
        className="btn-group btn-group-xs pull-right">
        {/* 这里的作用有点类似于Vue的slot
          MsgList中，<OptBtnGroup>包的是“详情”链接
          MsgDetail中，<OptBtnGroup>包的是“返回”按钮 */
          children }

        {/* 若是直接一同判断则需要使用父标签包住，否则报错如下
            Adjacent JSX elements must be wrapped in an enclosing tag
            鉴于使用父标签包含后无法匹配BootStrap样式
            因此最佳的方案的确就是如下的分离判断 */}
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
