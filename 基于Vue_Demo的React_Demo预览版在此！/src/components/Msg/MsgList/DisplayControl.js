import React, { Component } from 'react'
import { Link } from 'react-router'
import handleChange from 'MIXIN/handleChange'

export default class DisplayControl extends Component {
  constructor (props) {
    super(props)
    this.state = { _quantity: props.quantity }
    this.handleChange = handleChange.bind(this) // mixin
  }

  /* 【拓展阅读】setState 的“异步”坑：https://zhuanlan.zhihu.com/p/20328570 */
  componentWillReceiveProps(nextProps) {
    if (this.state._quantity !== nextProps.quantity) {
      this.setState({ _quantity: nextProps.quantity })
    }
  }

  _changeQuantity () {
    this.props.changeQuantity(this.state._quantity)
  }

  render () {
    let { msgsLen, pageIdx, resetDisplayControl } = this.props
    return (
      <center>
        <form className="form-inline">
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-addon">
                当前为第
                <span className="badge">
                  { pageIdx }
                </span>
                页（当页共
                <span className="label label-default">
                  { msgsLen }
                </span>
                条数据），限制每页加载数量为
              </div>
              <input
                type="text"
                className="form-control"
                style={{width: '4em'}}
                name="_quantity"
                value={this.state._quantity}
                onChange={this.handleChange}
                placeholder="默认10"/>
              <div className="input-group-addon">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-xs"
                    onClick={() => this._changeQuantity()}>
                    OK
                  </button>
                  <button
                    className="btn btn-xs dropdown-toggle"
                    data-toggle="dropdown">
                    <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu">
                    <li onClick={resetDisplayControl}>
                      <Link to="/redirect?dest=/msg">
                        重置页面（强制刷新）
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </form>
      </center>
    )
  }
}
