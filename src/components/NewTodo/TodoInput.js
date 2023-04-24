import React, { Component } from 'react'
import handleChange from 'MIXIN/handleChange'

export default class TodoInput extends Component {
  constructor (props) {
    super(props)
    this.state = { inputVal: '' }
    this.handleChange = handleChange.bind(this)
  }

  handleSubmit () {
    let content = this.state.inputVal.trim()
    if (!content) return

    this.props.addTodo(content)
    this.setState({ inputVal: '' }) // 清空输入框
  }

  render () {
    return (
      <form onSubmit={
        (e) => {
          e.preventDefault() // 防页面跳转
          this.handleSubmit()
        }
      }>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="inputVal"
            placeholder="请输入待办事项，敲回车确认添加"
            required
            value={this.state.inputVal}
            onChange={this.handleChange} />
        </div>

      </form>
    )
  }
}
