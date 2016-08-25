// 参考 https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md
import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

// createDevTools takes a monitor and produces a DevTools component
const DevTools = createDevTools(
  // Monitors are individually adjustable with props.
  // Consult their repositories to learn about those props.
  // Here, we put LogMonitor inside a DockMonitor.
  // Note: DockMonitor is visible by default.
  <DockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'
    /* 设置默认隐藏，不然每次刷新都自动显示，相当烦人 */
    defaultIsVisible={false}>
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
)

export default DevTools
