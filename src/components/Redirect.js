import React, { Component, PropTypes } from 'react'
/**
 * 设计初衷：
 *   replaceState 的 API 被废弃
 *   且要恢复原状很麻烦的情况下
 *   宁可重新进入该组件
 *   但 this.context.router.replace(当前路径) 是无效的
 *   因为 React 能判断出当前组件可复用
 *   因此只能跳转到别的路径之后再跳回来
 * 
 * 使用方法：（当前路径为 /foo）
 * 在 JSX 中：<Link to="/redirect?dest=/foo">重载本页</Link>
 * 在 JS 中：this.context.router.replace('/redirect?dest=/foo')
 */
export default class Redirect extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.context.router.replace(
      this.props.location.query.dest
    )
  }

  render () {
    // 非实体组件需显式返回null
    return null
  }
}
