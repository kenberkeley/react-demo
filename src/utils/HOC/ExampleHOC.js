import React, { Component } from 'react'

/* 高阶组件 High Order Component 例子 */
const ExampleHoC = WrappedComponent => class extends Component {
  componentWillMount() {
    console.info('[HoC] componentWillMount')
  }

  componentDidMount() {
    console.info('[HoC] componentDidMount')
  }

  render () {
    return <WrappedComponent {...this.props} />
  }
}

export default ExampleHoC

/**
 *【拓展】
 * React Router 2.4 新增 withRouter 这个 HoC
 * 这是除 context 外另一种获取 router 的推荐方式
 * https://github.com/reactjs/react-router/blob/master/upgrade-guides/v2.4.0.md
 */
