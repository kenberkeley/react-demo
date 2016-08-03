import { rootPath, errHandler } from './config'

const xhr = ({ url, body = null, method = 'get' }) => {
  // 默认引入ES6的Promise实现
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
