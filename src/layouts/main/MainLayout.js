import React from 'react'
import Navbar from 'COMPONENT/Navbar/Navbar'

let DevTools
if (__DEV__) { DevTools = require('CONTAINER/DevTools').default }

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
