import { connect } from 'react-redux'
import { default as mapActionCreators } from 'ACTION/msg/'
import MsgList from 'COMPONENT/Msg/MsgList/'

const mapStateToProps = ({ userData, msg }) => ({ userData, msg })

export default connect(mapStateToProps, mapActionCreators)(MsgList)
