/**
 * 无论有没有用到 React 这个变量都要导入
 * 因为这只是 JSX，等转为 JS 后
 * 您会看到到处都是 React.createElement
 */
import React from 'react'

// 由于 render 中用是 call/apply，因此这里不能使用箭头函数
// （因为箭头函数没有自己的 this！无法通过 call/apply 改变）
export default function () {
  return (
    <form onSubmit={(e) => this.handleSubmit(e)}>
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
            type="submit"
            className="btn btn-success">
            提交&nbsp;
            <span className="glyphicon glyphicon-ok"></span>
          </button>
        </div>
      </div>
    </form>
  )
}
