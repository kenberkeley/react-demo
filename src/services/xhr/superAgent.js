import request from 'superagent'
import { rootPath, errHandler } from './config'

const xhr = ({ url, body = null, method = 'get' }) => {
  // 默认引入ES6的Promise实现
  return new Promise((resolve, reject) => {
    request[method.toLowerCase()](rootPath + url)
      .send(body)
      // .withCredentials()
      .end((err, re) => {
        if (err)
          return errHandler(err)

        if (!re.body)
          return resolve(null)

        if (re.body._code)
          return errHandler(re.body._msg)

        resolve(re.body)
      })
  })
}

export default xhr
