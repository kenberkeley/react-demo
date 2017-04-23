import React, { Component } from 'react'
import { Link } from 'react-router'
import Pagination from './Pagination'
import NoticeBar from './NoticeBar'
import DisplayControl from './DisplayControl'
import OptBtnGroup from '@/components/Msg/OptBtnGroup'
import dateTimeFormatter from '@/utils//dateTimeFormatter'

export default class MsgList extends Component {
  componentWillMount () {
    let { author } = this.props.location.query
    this.props.specifyAuthor(author)
    this.updateMsgList()
  }
  /**
   * 类似于 Vue 中的 route: { data: Function } 属性，监听路由变化加载数据
   * 【拓展阅读】无限循环坑 http://stackoverflow.com/questions/36189775
   */
  componentWillReceiveProps (nextProps) {
    // query string 变化
    if (nextProps.location.search !== this.props.location.search) {
      return this.props.specifyAuthor(nextProps.location.query.author)
    }

    const nextDisplayControl = nextProps.msg.displayControl
    if (
      JSON.stringify(nextDisplayControl) ===
      JSON.stringify(this.props.msg.displayControl)
    ) return

    this.updateMsgList(nextDisplayControl)
  }

  updateMsgList (displayControl = this.props.msg.displayControl) {
    let { pageIdx, quantity, authorSpecified: author } = displayControl
    this.props.fetchMsg({ pageIdx, quantity, author })
  }

  render () {
    let { msg: { msgs, displayControl }, userData,
      delMsg, goPrevPage, goNextPage,
      changeQuantity, resetDisplayControl } = this.props

    return (
      <div>
        <Pagination
          msgsLen={msgs.length}
          {...displayControl}
          goPrevPage={goPrevPage}
          goNextPage={goNextPage} />

        { !msgs.length && <NoticeBar /> }

        <DisplayControl
          msgsLen={msgs.length}
          {...displayControl}
          changeQuantity={changeQuantity}
          resetDisplayControl={resetDisplayControl} />

        <ul className="list-group">
          { msgs.map(msg =>
            <li className="list-group-item" key={msg.id}>
              <Link to={`/msg/detail/${msg.id}`}>
                <b>{ msg.title }</b>
              </Link>
              <span className="badge">
                { dateTimeFormatter(msg.time, 3) }
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
                  查看详情
                </Link>
              </OptBtnGroup>
            </li>
          )}
        </ul>
      </div>
    )
  }
}
