// 此处配置 根访问路径 以及 全局错误处理
// 更多配置请根据逻辑自行实现
export const rootPath = 'http://localhost:9000'

export const errHandler = (e) => console.error(e) && alert(e)
