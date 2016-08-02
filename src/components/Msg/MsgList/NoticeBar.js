import React from 'react'

const NoticeBar = () => (
  <div role="alert"
    className="alert alert-warning alert-dismissible">
    <button
      type="button"
      className="close"
      data-dismiss="alert">
      <span aria-hidden="true">&times;</span>
    </button>
    <strong>暂无更多信息</strong>
  </div>
)

export default NoticeBar
