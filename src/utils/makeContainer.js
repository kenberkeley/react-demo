import { connect } from 'react-redux'

export default function makeContainer(mapStateToProps, mapActionCreators, component) {
  var connectComponent = connect(mapStateToProps, mapActionCreators)
  return component ? connectComponent(component) : connectComponent
}
