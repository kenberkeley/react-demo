import { connect } from 'react-redux'
import { default as actions } from 'ACTION/msg'
import MsgForm from 'COMPONENT/Msg/MsgForm/'

const mapActionCreators = actions
const mapStateToProps = ({ userData, msgs }) => ({ userData, msgs })

export default connect(mapStateToProps, mapActionCreators)(MsgForm)
