import React from 'react'
import ExampleHOC from 'HOC/ExampleHOC'

const Pagination = ({ msgsLen, pageIdx, quantity, goPrevPage, goNextPage }) => (
  <nav>
    <ul className="pager">
      { /* 显然页码要大于1才显示上一页 */
        pageIdx > 1 &&
        <li
          className="previous"
          onClick={() => goPrevPage()}>
          <a href="javascript:;">
            <span aria-hidden="true">&larr;</span>
            上一页
          </a>
        </li>
      }
      { /* 当前加载的信息少于限制加载的数量时，表示没有下一页 */
        msgsLen == quantity &&
        <li
          className="next"
          onClick={() => goNextPage()}>
          <a href="javascript:;">
            下一页
            <span aria-hidden="true">&rarr;</span>
          </a>
        </li>
      }
    </ul>
  </nav>
)

export default ExampleHOC(Pagination)
