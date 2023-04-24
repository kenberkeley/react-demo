/**
 * 本文件的作用就是直观呈现 整个应用状态结构树 及其 初始值
 */
export default {
  /* 用户 session */
  userData: null,

  /* 留言板模块（按需加载） */
  msg: {
    msgs: [],           // 当前显示的留言列表
    displayControl: {   // 查询条件
      pageIdx: 1,         // 默认是第 1 页
      quantity: 10,       // 默认每页显示 10 条记录
      authorSpecified: '' // 是否有指定发布者
    }
  },

  /* 待办事项模块（按需加载） */
  todos: [
    // {
    //   id: 123,
    //   content: '待办事项1',
    //   completed: false,
    //   createdAt: 1473499991348
    // }
  ],
  /* 待办事项模块（按需加载） */
  newtodos: [
    // {
    //   id: 123,
    //   content: '待办事项1',
    //   completed: false,
    //   createdAt: 1473499991348
    // }
  ]
}
