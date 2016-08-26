// 此处配置 根访问路径 以及 全局错误处理
// 更多配置请根据业务逻辑自行实现

// 后端 API 地址，最好以http(s)://打头
export const rootPath = 'http://localhost:9000'

export const errHandler = (e) => {
  alert('[ XHR:Failed ] 详情请看控制台')
  console.error(e)
}
