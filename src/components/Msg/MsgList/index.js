import React, { Component } from 'react'
import { Link } from 'react-router'
import Pagination from './Pagination'
import NoticeBar from './NoticeBar'
import DisplayControl from './DisplayControl'
import OptBtnGroup from 'COMPONENT/Msg/OptBtnGroup'
import dateTimeFormatter from 'UTIL/dateTimeFormatter'
import handleChange from 'MIXIN/handleChange'

export default class MsgList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pageIdx: 1, // 默认当前是第1页
      quantity: 10 // 默认每页10条
    }
  }

  componentWillMount() {
    this.updateMsgList()
  }

  /**
   * 监听 /msg <==> /msg?author=:author 的跳转
   * 类似于Vue中的 route > data 属性
   */
  componentWillReceiveProps(nextProps) {
    let nextAuthor = nextProps.location.query.author
    
    // 无限循环坑 http://stackoverflow.com/questions/36189775
    if ( nextAuthor === this.props.location.query.author ) return
    this.props.fetchMsg({ author: nextAuthor, ...this.state })
  }

  updateMsgList (optNum = 0) {
    let { pageIdx, quantity } = this.state
    let nextState = {
      pageIdx: pageIdx < 1 ? 1 : pageIdx + optNum,
      quantity:  ~~quantity || 10
    }

    // setState的“异步”坑：https://zhuanlan.zhihu.com/p/20328570
    this.setState(nextState)
    this.props.fetchMsg({
      author: this.props.location.query.author,
      ...nextState
    })
  }

  render () {
    let { msgs, userData, delMsg } = this.props
    let msgsLen = msgs.length
    /* 下面的重点是绑定的用法，此举可以让子组件修改父组件的state
       这表面上貌似是反模式，但实际上数据依旧是单向流动
       详情请看http://stackoverflow.com/questions/24147331
       当然，这里只是为了演示，最佳实践应在构造函数使用bind绑定 */
    return (
      <div>
        <Pagination
          {...this.state}
          msgsLen={msgsLen}
          updateMsgList={::this.updateMsgList} />

        { !msgsLen && <NoticeBar /> }

        <DisplayControl
          {...this.state}
          msgsLen={msgsLen}
          handleChange={this::handleChange}
          updateMsgList={::this.updateMsgList} />

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
