import 'es6-promise'
import 'isomorphic-fetch'
import { rootPath, errHandler } from './config'
import prefixWithSlash from './lib/prefixWithSlash'

const xhr = ({ url, body = null, method = 'get' }) => {
  url = prefixWithSlash(url)
  
  return new Promise((resolve, reject) => {
    fetch(url, {
      method, 
      body: body ? JSON.stringify(body) : ''
      credentials: 'include' // 带上cookies
    }, resolve, errHandler)
  })
}

export default xhr
