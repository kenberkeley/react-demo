import React from 'react'
import { Link } from 'react-router'

/*
  本组件为欢迎页（首页）
  由于几乎没有交互逻辑
  因此可以不使用类的写法
  直接返回一个普通函数即可

  实际上ES6的类经由Babel
  转码后其实还是返回一个类似的函数
 */
export const Welcome = (props) => (
  <div className="jumbotron">
    <h1>Welcome to React Demo</h1>
    <p>
      <Link
        to="/msg"
        role="button"
        className="btn btn-success btn-lg">
        Go to Message Board
      </Link>
    </p>
  </div>
)

export default Welcome
