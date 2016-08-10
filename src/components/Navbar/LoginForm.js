import React, { Component } from 'react'
import handleChange from 'MIXIN/handleChange'

export default class LoginForm extends Component {
  /* 实际上函数签名为constructor(props, context, {React内部不明object}) */
  constructor (props) {
    super(props)

    // 设置默认值，类似于Vue的data属性
    // P.S: 仅能在构造函数中设置state
    // 在其他地方绝不能使用 this.state.XXX = XXX
    // 只能使用 this.setState({ XXX: XXX })
    this.state = { username: '' }

    this.handleChange = handleChange.bind(this) // mixin
  }

  handleSubmit () {
    let username = this.state.username
    if (!username) return alert('用户名为空')
    this.props.login({ username })
  }

  render () {
  /* 由于ES6中React不会自动绑定this，直接onSubmit={this.handleSubmit}会报错
    详情请参考https://facebook.github.io/react/docs/reusable-components.html#no-autobinding */
    return (
      <form
        role="search"
        className="navbar-form navbar-right"
        onSubmit={
          (e) => {
            e.preventDefault() // 防页面跳转
            this.handleSubmit()
          }
        }>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="请输入您的用户名"
            required
            value={this.state.username}
            onChange={this.handleChange} />
        </div>
        
        <button
          type="submit"
          className="btn btn-success">
          登录
        </button>

      </form>
    )
  }
}
