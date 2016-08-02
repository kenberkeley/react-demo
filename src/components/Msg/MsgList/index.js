import React, { Component } from 'react'
import tpl from './tpl.jsx'

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
   * 类似于Vue中的 route.data 属性
   * P.S: 无限循环坑 http://stackoverflow.com/questions/36189775
   */
  componentWillReceiveProps(nextProps) {
    let nextAuthor = nextProps.location.query.author
    if ( nextAuthor === this.props.location.query.author ) return

    this.props.fetchMsg({ author: nextAuthor, ...this.state })
    // 你可能会问，为什么不直接用 this.updateMsgList？
    // 那是因为 this.updateMsgList 中的 this.props.location.query.author 还没更新
    // 除非你使用 setTimeout 把 this.props.fetchMsg 的那一部分包裹起来
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
    return tpl.call(this)
  }
}
