import React from 'react'
import { task, connectState, VIEW_STATUS, Link } from '@z1/lib-feature-box'

// styles
import { css } from './styles'

// ui
import { makeViews } from './views'

// state
const stateQuery = ({ screenCmd }) => ({ cmd: screenCmd })

// main
export const ScreenCmdPage = task(t => ({ mutationCreators }) => {
  const views = makeViews({ ui: {} })
  return connectState(stateQuery, mutationCreators)(({ cmd, mutations }) => {
    const View = t.pathOr(null, [cmd.viewKey], views)
    return (
      <div className={css.page}>
        {/* <Link to="/box-editor">BOX</Link> */}
        {/* {cmd.status} */}
        {/* <div className='spinner-xl d-block h-20 bg-gray-300'/> */}
        {t.isNil(View) ? null : (
          <View cmd={cmd.views[cmd.viewKey]} mutations={mutations} />
        )}
      </div>
    )
  })
})
