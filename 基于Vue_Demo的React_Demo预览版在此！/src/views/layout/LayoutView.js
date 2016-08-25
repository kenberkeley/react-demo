/**
 * 本文件是全局布局基页
 */
import React from 'react'
import Navbar from 'COMPONENT/Navbar/'

let DevTools
if (__COMPONENT_DEVTOOLS__) {
  // 组件形式的 Redux DevTools
  DevTools = require('CONTAINER/DevTools').default
}

const LayoutView = (props) => (
  <div>
    {/* 此处使用延展属性将所有 props 传给 Navbar */}
    <Navbar {...props} />
  
    <div className="container">
      { props.children }
    </div>

    { DevTools && <DevTools /> }
  </div>
)

export default LayoutView
