import React from 'react'
import { task, connectState, VIEW_STATUS } from '@z1/lib-feature-box'
import { renderView } from './macros'

// styles
import { css } from './styles'

// ui
import { views } from './views'

// state
const stateQuery = ({ screenCmd }) => ({ state: screenCmd })

// main
export const ScreenCmdPage = task(t => ({ mutationCreators }) => {
  const Views = views.ui({ ui: {} })
  return connectState(stateQuery, mutationCreators)(({ state, mutations }) => {
    return <div className={css.page}>{renderView(Views, state, mutations)}</div>
  })
})
