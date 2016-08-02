import request from 'superagent'
import { rootPath, errHandler } from './config'
import prefixWithSlash from './lib/prefixWithSlash'

/**
 * gzip前大约为11KB
 */
const xhr = ({ url, body = null, method = 'get' }) => {
  url = prefixWithSlash(url)
  
  return new Promise((resolve, reject) => {
    request[method.toLowerCase()](rootPath + url)
      .send(body)
      .withCredentials()
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
