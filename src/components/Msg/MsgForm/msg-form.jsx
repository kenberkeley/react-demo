// 无论有没有用到React这个变量都要导入
// 因为这只是JSX，等到转为JS后
// 你会看到到处都是React.createElement
import React from 'react'

// 由于render中用是call/apply，因此这里不能使用箭头函数
// （因为箭头函数没有自己的this！无法通过call/apply改变）
export default function () {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="title">标题</label>
        <input
          type="text"
          className="form-control"
          name="title"
          placeholder="请输入标题..."
          onChange={this.handleChange}
          value={this.state.title}/>
      </div>

      <div className="form-group">
        <label htmlFor="content">内容</label>
        <textarea
          name="content"
          className="form-control"
          rows="3"
          placeholder="请输入内容..."
          onChange={this.handleChange}
          value={this.state.content}>
        </textarea>
      </div>

      <div role="group" className="btn-group btn-group-justified">
        <div className="btn-group" role="group">
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => this.context.router.goBack()}>
            <span className="glyphicon glyphicon-arrow-left"></span>
            &nbsp;取消
          </button>
        </div>
        <div className="btn-group" role="group">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.handleSubmit()}>
            提交&nbsp;
            <span className="glyphicon glyphicon-ok"></span>
          </button>
        </div>
      </div>
    </form>
  )
}
