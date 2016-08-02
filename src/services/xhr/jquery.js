import { rootPath, errHandler } from './config'
import prefixWithSlash from './lib/prefixWithSlash'

/**
 * 项目有采用jQuery的就更方便了
 */
const xhr = ({ url, body = null, method = 'get' }) => {
  url = prefixWithSlash(url)
  
  return new Promise((resolve, reject) => {
    $.ajax({
      type: method,
      url: rootPath + url,
      data: body
    })
    .done(resolve)
    .fail(errHandler)
  })
}

export default xhr
