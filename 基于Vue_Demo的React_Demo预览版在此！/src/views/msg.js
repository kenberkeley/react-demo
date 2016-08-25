import React from 'react'
import { Link } from 'react-router'

/* 留言板 布局基页 */
const MsgView = ({ children, location }) => (
  <div>
    { !location.pathname.startsWith('/msg/add') &&
      <Link
        className="btn btn-default btn-lg btn-block"
        to="/msg/add">
        添加消息
        <span className="glyphicon glyphicon-plus"></span>
      </Link>
    }
    <br/>
    { children }
  </div>
)

export default MsgView
