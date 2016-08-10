import { connect } from 'react-redux'
import { default as actionCreators } from 'ACTION/msg'
import MsgForm from 'COMPONENT/Msg/MsgForm/'

const mapActionCreators = actionCreators
const mapStateToProps = ({ userData, msgs }) => ({ userData, msgs })

export default connect(mapStateToProps, mapActionCreators)(MsgForm)
