import { connect } from 'react-redux'
import { default as actions } from 'ACTION/user'
import MainLayout from './MainLayout'

const mapActionCreators = actions
const mapStateToProps = ({ userData }) => ({ userData })

export default connect(mapStateToProps, mapActionCreators)(MainLayout)
