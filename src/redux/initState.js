/** 这就是state的模样，一目了然！ **/
export default {
  /* 用户session */
  userData: null,

  /* 留言板模块 */
  msg: {
    msgs: [], // 当前显示的留言列表
    displayControl: {
      pageIdx: 1, // 默认是第10页
      quantity: 10, // 默认每页展示10条记录
      authorSpecified: '' // 是否有指定发布者
    }
  }
}
