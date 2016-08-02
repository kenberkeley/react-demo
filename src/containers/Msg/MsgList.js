import { connect } from 'react-redux'
import { default as actions } from 'ACTION/msg'
import MsgList from 'COMPONENT/Msg/MsgList/'

const mapActionCreators = actions
const mapStateToProps = ({ userData, msgs }) => ({ userData, msgs })

export default connect(mapStateToProps, mapActionCreators)(MsgList)
