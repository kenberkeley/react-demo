import React from 'react'
import { Link } from 'react-router'
import handleChange from 'MIXIN/handleChange'
/*
  显示当前页码以及控制每页加载多少条数据
  使用方法：<DisplayControl ctx={this} />

  从严格意义上说，这并不是一个组件
  这仅仅是一个模板
  皆因该组件用的是父组件MsgList传入的上下文
  而非自己的上下文
  耦合度相对较高，纯粹为了代码分离
 */
const DisplayControl = ({ ctx }) => (
  <form className="form-inline">
    <div className="form-group">
      <div className="input-group">
        <div className="input-group-addon">
          当前为第
          <span className="badge">
            { ctx.state.pageIdx }
          </span>
          页（当页共
          <span className="label label-default">
            { ctx.props.msgs.length }
          </span>
          条数据），限制每页加载数量为
        </div>
        <input
          type="text"
          className="form-control"
          style={{width: '4em'}}
          name="quantity"
          value={ctx.state.quantity}
          onChange={handleChange.bind(ctx)}
          placeholder="默认10"/>
        <div className="input-group-addon">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-xs"
              onClick={() => ctx.updateMsgList(0)}>
              OK
            </button>
            <button
              className="btn btn-xs dropdown-toggle"
              data-toggle="dropdown">
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link to="/redirect?dest=/msg">
                  重置页面（强制刷新）
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </form>
)

export default DisplayControl
