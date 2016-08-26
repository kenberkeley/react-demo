import React, { Component, PropTypes } from 'react'

export default class LogoutDropdown extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  logout () {
    // 退出登录后直接返回首页
    this.props.logout()
    this.context.router.replace('/')
  }

  render () {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <a href="javascript:;"
            className="dropdown-toggle"
            data-toggle="dropdown">
            欢迎您，{ this.props.userData.username }
            <strong className="caret"></strong>
          </a>
          
          <ul className="dropdown-menu">
            <li onClick={() => this.logout()}>
              <a href="javascript:;">
                注销登录
              </a>
            </li>
          </ul>
        </li>
      </ul>
    )
  }
}
