import React from 'react'

/* 待办事项 布局基页 */
const TodoView = ({ children }) => (
  <div className="center-block">
    <div role="alert"
      className="alert alert-warning alert-dismissible">
      <button
        type="button"
        className="close"
        data-dismiss="alert">
        <span aria-hidden="true">&times;</span>
      </button>
      <strong>该 Todo 示例无需 后端 RESTful API 支持</strong>
    </div>
    { children }
  </div>
)

export default TodoView
