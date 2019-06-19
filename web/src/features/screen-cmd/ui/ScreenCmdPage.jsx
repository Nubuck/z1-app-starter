import React from 'react'
import { task, connectState, VIEW_STATUS, Link } from '@z1/lib-feature-box'

// styles
import { css } from './styles'

// ui
import { views } from './views'

// state
const stateQuery = ({ screenCmd }) => ({ cmd: screenCmd })

// main
export const ScreenCmdPage = task(t => ({ mutationCreators }) => {
  // const Views = views({ ui: {} })
  return connectState(stateQuery, mutationCreators)(({ cmd, mutations }) => {
    return (
      <div className={css.page}>
        <Link to="/box-editor">BOX</Link>
        {/* {cmd.status} */}
        {/* <div className='spinner-xl d-block h-20 bg-gray-300'/> */}
      </div>
    )
  })
})
