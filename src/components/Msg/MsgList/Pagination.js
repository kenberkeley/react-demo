import React from 'react'
/* 
  显示[上一页][下一页]的分页器
  使用方法 <Pagination ctx={this} />

  从严格意义上说，这并不是一个组件
  这仅仅是一个模板
  皆因该组件用的是父组件MsgList传入的上下文
  而非自己的上下文
  耦合度相对较高，纯粹为了代码分离
*/
const Pagination = ({ ctx }) => (
  <nav>
    <ul className="pager">
      { /* 显然页码要大于1才显示上一页 */
        ctx.state.pageIdx > 1 &&
        <li
          className="previous"
          onClick={() => ctx.updateMsgList(-1)}>
          <a href="javascript:;">
            <span aria-hidden="true">&larr;</span>
            上一页
          </a>
        </li>
      }
      { /* 当前加载的信息少于限制加载的数量时，表示没有下一页 */
        ctx.props.msgs.length == ctx.state.quantity &&
        <li
          className="next"
          onClick={() => ctx.updateMsgList(1)}>
          <a href="javascript:;">
            下一页
            <span aria-hidden="true">&rarr;</span>
          </a>
        </li>
      }
    </ul>
  </nav>
)

export default Pagination
