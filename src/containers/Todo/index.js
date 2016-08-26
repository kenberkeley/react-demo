import { connect } from 'react-redux'
import { default as mapActionCreators } from 'ACTION/todo'
import Todo from 'COMPONENT/Todo/'

const mapStateToProps = ({ todos }) => ({ todos })

export default connect(mapStateToProps, mapActionCreators)(Todo)
