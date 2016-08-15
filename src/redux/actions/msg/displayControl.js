import initState from 'REDUX/initState'

const SPECIFY_AUTHOR = 'SPECIFY_AUTHOR'
const PREV_PAGE = 'PREV_PAGE'
const NEXT_PAGE = 'NEXT_PAGE'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
const RESET_DISPLAY_CONTROL = 'RESET_DISPLAY_CONTROL'

const specifyAuthor = (authorSpecified) => ({
  type: SPECIFY_AUTHOR,
  payload: authorSpecified
})

const goPrevPage = () => ({
  type: PREV_PAGE
})

const goNextPage = () => ({
  type: NEXT_PAGE
})

const changeQuantity = (quantity) => ({
  type: CHANGE_QUANTITY,
  payload: quantity
})

const resetDisplayControl = () => ({
  type: RESET_DISPLAY_CONTROL
})

export default {
  specifyAuthor, goPrevPage, goNextPage,
  changeQuantity, resetDisplayControl
}

export const ACTION_HANDLERS = {
  [SPECIFY_AUTHOR]: (displayControl, { payload: authorSpecified }) => (
    { ...displayControl, authorSpecified }
  ),
  [PREV_PAGE]: (displayControl) => {
    let pageIdx = displayControl.pageIdx
    pageIdx = pageIdx <= 1 ? 1 : pageIdx - 1
    return { ...displayControl, pageIdx }
  },
  [NEXT_PAGE]: (displayControl) => (
    { ...displayControl, pageIdx: displayControl.pageIdx + 1 }
  ),
  [CHANGE_QUANTITY]: (displayControl, { payload: quantity }) => {
    quantity = ~~quantity || 10
    return { ...displayControl, quantity }
  },
  [RESET_DISPLAY_CONTROL]: (displayControl) => (
    // 不能直接返回，而是返回一个copy
    { ...initState.msg.displayControl }
  )
}
