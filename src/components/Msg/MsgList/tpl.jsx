import React from 'react'
import { Link } from 'react-router'
import Pagination from './Pagination'
import NoticeBar from './NoticeBar'
import DisplayControl from './DisplayControl'
import OptBtnGroup from 'COMPONENT/Msg/OptBtnGroup'
import dateTimeFormatter from 'UTIL/dateTimeFormatter'

export default function () {
  let { msgs, userData, delMsg } = this.props
  return (
    <div>
      {/* 传入当前上下文，其通过props.ctx读取 */}
      <Pagination ctx={this} />

      { !msgs.length &&
        <NoticeBar />
      }

      <center>
        <DisplayControl ctx={this} />
      </center>

      <ul className="list-group">
        { msgs.map(msg =>
          <li
            className="list-group-item"
            key={msg.id}>
            <Link to={`/msg/detail/${msg.id}`}>
              <b>{ msg.title }</b>
            </Link>
            <span className="badge">
              { dateTimeFormatter(msg.time) }
            </span>
            <br/>
            <span className="text-muted">by&nbsp;</span>
            <Link to={`/msg?author=${msg.author}`}>
              <i>{ msg.author }</i>
            </Link>
            
            <OptBtnGroup
              msgId={msg.id}
              isAuthor={userData && userData.username === msg.author}
              delMsg={delMsg}>
              <Link
                className="btn btn-info"
                to={`/msg/detail/${msg.id}`}>
                详情
              </Link>
            </OptBtnGroup>
          </li>
        )}
      </ul>
    </div>
  )
}
