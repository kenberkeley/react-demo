import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import OptBtnGroup from 'COMPONENT/Msg/OptBtnGroup'
import dateTimeFormatter from 'UTIL/dateTimeFormatter'
import msgService from 'SERVICE/msgService'

export default class MsgDetail extends Component {
/* 有关Context的用法请看文档：https://facebook.github.io/react/docs/context.html
  实际上可不引入 this.context.router，直接使用 this.props.history 即可
  但 console 会报警告 Warning: [react-router] `props.history` and `context.history` are deprecated. Please use `context.router`. http://tiny.cc/router-contextchanges */
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor (props, context) {
    super(props, context)
    this.state = { msg: {} }
  }

  componentWillMount() {
    // P.S: 在Vue Demo中，msg是直接从服务器中获取
    // 而这里可以先直接从store中获取，获取不到才从服务器获取
    // （这种情况一般是直接刷新页面后）
    let { msgs, params: { msgId } } = this.props

    let msg = msgs.filter(({ id }) => id === msgId)[0]
    msg ? this.setState({ msg }) : this.fetchMsgNow(msgId)
  }

  fetchMsgNow (msgId) {
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
            <button /* 该按钮相当于Vue中的slot */
              className="btn btn-primary btn-xs"
              onClick={ () => this.context.router.goBack() }>
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
