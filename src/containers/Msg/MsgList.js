import { connect } from 'react-redux'
import { default as actionCreators } from 'ACTION/msg'
import MsgList from 'COMPONENT/Msg/MsgList/'

const mapActionCreators = actionCreators
const mapStateToProps = ({ userData, msgs }) => ({ userData, msgs })

export default connect(mapStateToProps, mapActionCreators)(MsgList)
