import { connect } from 'react-redux'
import { default as actionCreators } from 'ACTION/user'
import LayoutView from './LayoutView'

const mapActionCreators = actionCreators
const mapStateToProps = ({ userData }) => ({ userData })

export default connect(mapStateToProps, mapActionCreators)(LayoutView)
