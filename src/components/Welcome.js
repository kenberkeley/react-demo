import React from 'react'
import { Link } from 'react-router'
/**
 * 本组件为欢迎页（首页）
 * 由于几乎没有交互逻辑
 * 因此可以不使用类的写法
 * 
 * 实际上，ES6 的类经由 Babel 转码后
 * 其实还是返回一个类似的函数
 */
const Welcome = () => (
  <div className="jumbotron">
    <h1>欢迎使用 <br/> React Demo</h1>
    <p>
      <Link
        to="/msg"
        role="button"
        className="btn btn-success btn-lg">
        前往留言板 &gt;
      </Link>
      &nbsp;
      <Link
        to="/todo"
        role="button"
        className="btn btn-success btn-lg">
        前往待办事项(新功能) &gt;
      </Link>
    </p>
  </div>
)

export default Welcome
