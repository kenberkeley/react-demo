import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import OptBtnGroup from 'COMPONENT/Msg/OptBtnGroup'
import dateTimeFormatter from 'UTIL/dateTimeFormatter'
import msgService from 'SERVICE/msgService'

export default class MsgDetail extends Component {
/**
 * 有关 Context 的用法请看文档：https://facebook.github.io/react/docs/context.html
 * 实际上可不引入 this.context.router，直接使用 this.props.history 即可
 * 但控制台会报 Warning: [react-router] `props.history` and `context.history` are deprecated. Please use `context.router`. http://tiny.cc/router-contextchanges
 */
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor (props, context) {
    super(props, context)
    this.state = { msg: {} }
  }

  componentWillMount() {
    // P.S: 在 Vue Demo 中，数据都是直接从后端 API 中获取
    // 而这里可以先直接从 state 中获取，获取不到才从服务器获取
    // （强制刷新页面会导致 state 被清空）
    let { msg: { msgs }, params: { msgId } } = this.props

    let msg = msgs.filter(({ id }) => id === msgId)[0]
    msg ? this.setState({ msg }) : this.fetchMsgFromAPI(msgId)
  }

  fetchMsgFromAPI (msgId) {
    msgService.fetch({ msgId }).then(msg => {
      if (!msg) return this.context.router.replace('/msg')
      this.setState({ msg })
    })
  }

  render () {
    let { userData, delMsg } = this.props
    let msg = this.state.msg

    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          标题：
          <strong>{ msg.title }</strong>
          <span className="badge pull-right">
            { dateTimeFormatter(msg.time) }
          </span>
          <br/>
          发布者：
          <Link to={`/msg?author=${msg.author}`}>
            <i>{ msg.author }</i>
          </Link>

          <OptBtnGroup
            msgId={msg.id}
            isAuthor={userData && userData.username === msg.author}
            delMsg={delMsg}
            parentName="MsgDetail">
            <button /* 该按钮相当于 Vue 中的 slot */
              className="btn btn-primary btn-xs"
              onClick={() => this.context.router.goBack()}>
              返回
            </button>
          </OptBtnGroup>
        </div>
        <div className="panel-body">
          { msg.content }
        </div>
      </div>
    )
  }
}
