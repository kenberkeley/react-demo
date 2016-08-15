import { connect } from 'react-redux'
import { default as mapActionCreators } from 'ACTION/msg/'
import MsgForm from 'COMPONENT/Msg/MsgForm/'

const mapStateToProps = ({ userData, msg }) => ({ userData, msg })

export default connect(mapStateToProps, mapActionCreators)(MsgForm)
