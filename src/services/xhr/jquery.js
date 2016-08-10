import { rootPath, errHandler } from './config'

const xhr = ({ url, body = null, method = 'get' }) => {
  const defer = $.Deferred()

  $.ajax({
    type: method,
    url: rootPath + url,
    data: body
  })
  .done(defer.resolve)
  .fail(errHandler)

  return defer.promise()
}

export default xhr
