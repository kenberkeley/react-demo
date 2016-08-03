import React from 'react'
import { Link } from 'react-router'

const DisplayControl = ({ msgsLen, pageIdx, quantity, handleChange, updateMsgList }) => (
  <center>
  <form className="form-inline">
    <div className="form-group">
      <div className="input-group">
        <div className="input-group-addon">
          当前为第
          <span className="badge">
            { pageIdx }
          </span>
          页（当页共
          <span className="label label-default">
            { msgsLen }
          </span>
          条数据），限制每页加载数量为
        </div>
        <input
          type="text"
          className="form-control"
          style={{width: '4em'}}
          name="quantity"
          value={quantity}
          onChange={handleChange}
          placeholder="默认10"/>
        <div className="input-group-addon">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-xs"
              onClick={() => updateMsgList(0)}>
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
  </center>
)

export default DisplayControl
