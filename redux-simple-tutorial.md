### <a name="store">⊙ Store</a>
> 在开始下面的内容前，请自问：Store 是什么？

假如有一个应用，其数据结构如下：
```
{
  // 计数器模块
  counter: 1,
  
  // 待办事项模块
  todos: [{
    id: 1,
    content: '待办事项1',
    completed: false
  }]
}
```
倘若我们用 Redux 管理该状态，首先需要通过 `createStore` 建立一个全局唯一的 `store`  
这样的话，上面的数据结构就是这个应用的 `state`，可以通过 `store.getState()` 来获得

由于 计数器模块 和 待办事项模块 基本上是没有交集的，因此比较好的方式是分别单独管理，怎么办？  
有童鞋说，分别建立 `counterStore` 和 `todoStore` 来分开管理就好了  
童鞋您说得很有道理，但那是 Flux 的做法，不是 Redux 的做法。。。  

在 Redux 中，我们使用 Reducer 来分割应用的状态进行单独管理  
也就是说，分别建立 `counterReducer` 和 `todoReducer` 来分别管理对应的模块  
最后使用 `combineReducers` 来合成各个 reducer，最终使用 `createStore` 生成全局唯一的 `store`

### <a name="action">⊙ Action</a>
> 在开始下面的内容前，请自问：Action 是什么？  

说白了，**Action** 就是一个包含 `type` 的普通对象  
例如，新增一个待办事项的 Action 可以写成这样：
```
{
  type: 'ADD_TODO',
  newMsg: {
    id: 2,
    content: '待办事项2',
    completed: false
  }
}
```
除 `type` 是规定外，并没有其他约束。例如下面这些写法都是没有问题的：
```
{ // 推荐写法
  type: 'ADD_TODO',
  payload: {
    id: 2,
    content: '待办事项2',
    completed: false
  }
}

{
  type: 'ADD_TODO',
  id: 2,
  content: '待办事项2',
  completed: false
}
```
> 虽说没有约束，但最好还是遵循[规范](flux-action-pattern)

如果一个函数返回一个 Action，那么这个函数就是所谓的 Action Creator：
```
function addTodo() {
  return {
    type: 'ADD_TODO',
    payload: {
      id: 2,
      content: '待办事项2',
      completed: false
    }
  }
}
```

但这个 Action Creator 永远都只能返回一样的待办事项，显然不符合逻辑  
因此我们需要改动一下：
```
function addTodo(todo) {
  return {
    type: 'ADD_TODO',
    payload: todo
  }
}
```

这样的话，想要通过表单插入一条新的待办事项，我们点击一下如下表单就可以了：
```
<input type="text" id="id" value="2" />
<input type="text" id="content" value="待办事项2" />
<button onclick="addTodo()">新增一条待办事项</button>

function addTodo() {
  var newTodo = addTodo({
    id       : +document.getElementById('id').value, // 转为 Number 类型
    content  : document.getElementById('content').value,
    completed: false
  })
  
  /* 此时 newTodo 为
    {
      type: 'ADD_TODO',
      payload: {
        id: 2,
        content: '待办事项2',
        completed: false
      }
    }
   */
   
  store.dispatch(newTodo) // 假设 store 是全局变量
})
```

这样的话，如果原来的 `state` 是这样的：
```
{
  counter: 1,
  todos: [{
    id: 1,
    content: '待办事项1',
    completed: false
  }]
}
```

之后就会变成：
```
{
  counter: 2,
  todos: [{
    id: 1,
    content: '待办事项1',
    completed: false
  }, {
    id: 2,
    content: '待办事项2',
    completed: false
  }]
}
```

您可能会有疑问，这个 `dispatch` 究竟做了什么可以让 `newTodo` 插入到 `state.todos` 中？ 请继续往下看

### <a name="reducer">⊙ Reducer</a>
> 在开始下面的内容前，请自问：Reducer 是什么？  
> 为了容易理解，这里不采用 ES6 写法或 [Immutable](immutable)

很多教程把 Reducer 描述成一个 `switch-case` 的函数  
例如，`todoReducer` 可能长这样：
```
// 这里的 state 其实是 state.todos，因为 todoReducer 是专门独立管理 待办事项模块 的
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      var newState = _.deepClone(state) // 利用 lodash 的深克隆
      newState.push(action.payload)
      return newState
    default:
      return state
  }
}
```

Reducer **必须**返回一个**全新**的 `state`，而不能在原 `state` 上进行修改  
亦即下面这样是不允许的：
```
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      state.push(action.payload) // 不能直接在 state 上操作
      return state
    default:
      return state
  }
}
```
> 也就是说，Reducer 其实就是返回它专门管理的那个“ `state` ” 的函数

有了上面的铺垫，我们就可以解决 `dispatch` 的问题了  
`dispatch` 实际上就是把 `action` (一个带 `type` 属性的**普通对象**)   
传到对应的 `reducer`（一个负责专门管理 *某部分* 的 `state`，并根据 `action` 的内容返回一个新的 `state` 的**函数**）  
最后 `store` 会根据 `reducer` 返回的这个 *某部分* 的 `state` 更新到整个应用的 `state`