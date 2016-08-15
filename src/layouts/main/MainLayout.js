import React from 'react'
import Navbar from 'COMPONENT/Navbar/'

let DevTools
if (__EMBEDDED_DEVTOOLS__) {
  DevTools = require('CONTAINER/DevTools').default
}

const MainLayout = (props) => (
  <div>
    {/* 此处使用延展属性将所有props传给Navbar */}
    <Navbar {...props} />
  
    <div className="container">
      { props.children }
    </div>

    { DevTools && <DevTools /> }
  </div>
)

export default MainLayout
