import React, { Component, PropTypes } from 'react'
import msgService from 'SERVICE/msgService'
import handleChange from 'MIXIN/handleChange'
import tpl from './msg-form.jsx' // 分拆写JSX模板以减少单文件代码量

/* 为什么不直接 const initState = { ... } 而是用函数返回呢？
   皆因直接传initState仅是传引用，initState本身可被修改 */
const getInitState = () => ({ id: '', title: '', content: '' })

/* 由于本组件由 /msg/add 与 /msg/:msgId 所公用
   因此需要判断当前是“新增模式”还是“修改模式” */
const isAddMode = pathname => pathname.startsWith('/msg/add')

export default class MsgForm extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor (props, context) {
    // 既然用到了context，显然需要super一下咯
    // 实际上最完善的形式的确就是这样子写
    super(props, context)

    // 初始state必须定义，否则会报错
    // 就像在Vue中需要在data定义默认值
    this.state = getInitState()

    this.handleChange = handleChange.bind(this) // mixin
  }

  componentDidMount() {
    this.updateState()
  }

  /* 由于本组件为共用组件，但React本身不提供类似Vue的canReuse属性
     在 /msg/add <==> /msg/modify/:msgId 之间的跳转，组件保持挂载状态
     故需要利用本函数更新state。不在乎性能者可利用我们的hack：Redirect组件 */
  componentWillReceiveProps(nextProps) {
    this.updateState(nextProps) // 传入nextProps
  }

  /* 不传入props则默认使用当前props */
  updateState ({ location, params:{msgId}, userData:{username}, msg:{msgs} } = this.props) {
    // 情况1：处于 /msg/add
    if (isAddMode(location.pathname)) {
      return this.setState(getInitState())
    }

    // 情况2：处于/msg/modify/:msgId，且state中msgs不为空
    if (msgs.length) {
      let nextState = msgs.filter(({ id }) => id === msgId)[0]
      if (!nextState || nextState.author !== username) {
        return this.handleIllegal()
      }
      return this.setState(nextState)
    }

    // 情况3：刷新 /msg/detail/:msgId 后跳转到 /msg/modify/:msgId
    // 此时state中msgs为空，需要临时获取
    msgService.fetch({ msgId }).then(msg => {
      let { id, title, content, author } = msg
      if (!msg || author !== username) {
        return this.handleIllegal()
      }
      this.setState({ id, title, content })
    })
  }

  handleIllegal () {
    // 使用setTimeout防止阻塞跳转
    setTimeout(() => alert('非法访问'))
    location.replace('/msg')
    
    // 为什么不使用如下代码跳转？
    // this.context.router.replace('/msg')
    // 因为会触发componentWillReceiveProps无限循环
  }

  /* 同样地，提交表单前需要根据当前mode进行对应的操作 */
  handleSubmit () {
    let { pathname } = this.props.location
    let opt = isAddMode(pathname) ? 'addMsg' : 'modMsg'

    // 提交后，由于会触发componentWillReceiveProps
    // 因此这里需要把该函数“清空”避免浪费性能
    this.updateState = () => {}

    this.props[opt](this.state).then(({ id }) => {
      this.context.router.replace(`/msg/detail/${id}`)
    })
  }

  render () {
    // 使用call/apply，让tpl中的上下文与当前一致
    // 这里只是为了演示的方便，最佳实践应该在构造函数中使用bind绑定
    return tpl.call(this)
  }
}
