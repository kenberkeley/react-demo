import { connect } from 'react-redux'
import { default as actionCreators } from 'ACTION/user'
import MainLayout from './MainLayout'

const mapActionCreators = actionCreators
const mapStateToProps = ({ userData }) => ({ userData })

export default connect(mapStateToProps, mapActionCreators)(MainLayout)
