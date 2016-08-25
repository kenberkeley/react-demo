import { default as msgActionCreators } from './msg'
import { default as displayControlActionCreator } from './displayControl'

export default {
  ...msgActionCreators,
  ...displayControlActionCreator
}
