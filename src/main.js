/* 入口启动文件 */
import React from 'react'
import ReactDOM from 'react-dom'
import App from 'CONTAINER/App'

const MOUNT_NODE = document.getElementById('app')

// ========================================================
// Render Setup
// ========================================================
let render = () => ReactDOM.render(<App />, MOUNT_NODE)

// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
if (__DEV__ && module.hot) {
  const renderApp = render
  const renderError = error => {
    const RedBox = require('redbox-react').default
    ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
  }
  render = () => {
    try {
      renderApp()
    } catch (error) {
      renderError(error)
    }
  }
  module.hot.accept(['ROUTE/'], () => render())
}

// ========================================================
// Go!
// ========================================================
render()
