/**
 * 本文件是全局布局基页
 */
import React from 'react'
import Navbar from 'COMPONENT/Navbar/'

let DevTools
if (__DEV__ && __COMPONENT_DEVTOOLS__) {
  // 组件形式的 Redux DevTools
  DevTools = require('COMPONENT/DevTools').default
}

const LayoutView = ({ children, location }) => (
  <div>
    <Navbar location={location} />
  
    <div className="container">
      { children }
    </div>

    { DevTools && <DevTools /> }
  </div>
)

export default LayoutView
