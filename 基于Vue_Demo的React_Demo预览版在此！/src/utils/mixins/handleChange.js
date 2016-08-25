/**
 * React 不像 Angular/Vue 等具备双向绑定能力
 * 因此需要手动监听输入框 change 事件同步 state
 * 您可使用成熟的 redux-form(https://github.com/erikras/redux-form) 替代
 * @param  {DOM Event} evt
 *
 * 使用例子：
 * 例子1：直接使用
 * <input
 *   type="text"
 *   name="myInput"                    // 一定要有 name 属性
 *   onClick={handleChange.bind(this)} // 绑定 this 到所属的组件
 *   value={this.state.myInput} />     // value 值同步 state
 *
 * 例子2：使用::绑定（例子1的语法糖）
 * onClick={this::handleChange}
 *
 * 例子3：在构造函数中声明（推荐，避免每次render都重复绑定）
 * constructor (props) {
 *   super(props)
 *   this.handleChange = handleChange.bind(this)
 * }
 * 之后就可以这样写了
 * onClick={this.handleChange}
 */
export default function handleChange(evt) {
  this.setState({
    [evt.target.name]: evt.target.value.trim()
  })
}
