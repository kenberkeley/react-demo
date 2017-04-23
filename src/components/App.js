import React from 'react'
import Navbar from '@/components/Navbar/'

let DevTools
if (__DEV__ && __COMPONENT_DEVTOOLS__) {
  // 组件形式的 Redux DevTools
  DevTools = require('@/components/DevTools').default
}

const App = ({ children, location }) => (
  <div>
    <Navbar location={location} />
  
    <div className="container">
      {/* 相当于 Vue Demo 中的根 router-view */}
      { children }
    </div>

    { DevTools && <DevTools /> }
  </div>
)

export default App
