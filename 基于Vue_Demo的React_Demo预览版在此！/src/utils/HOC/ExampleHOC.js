import React, { Component } from 'react'

/* 高阶组件 High Order Component 例子 */
const ExampleHOC = WrappedComponent => class extends Component {
  componentWillMount() {
    console.info('[HOC] componentWillMount')
  }

  componentDidMount() {
    console.info('[HOC] componentDidMount')
  }

  render () {
    return <WrappedComponent {...this.props} />
  }
}

export default ExampleHOC
