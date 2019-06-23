import React from 'react'
import { task, connectState, VIEW_STATUS } from '@z1/lib-feature-box'
import { renderView } from '@z1/lib-feature-macros'
import { toCss } from '@z1/lib-ui-box-elements'

// styles
const css = {
  page: toCss({
    position: 'relative',
    display: 'flex',
    flexDirection: 'col',
    padding: 3,
  }),
  title: toCss({
    color: 'gray-700',
    fontSize: '2xl',
    // fontFamily: 'mono',
    margin: { bottom: 3 },
  }),
  editor: toCss({
    display: 'flex',
    flexDirection: 'row',
    // fontFamily: 'mono',
  }),
  container: toCss({
    display: 'flex',
    flexDirection: 'col',
    // fontFamily: 'mono',
    height: '64',
  }),
  colLeft: toCss({
    display: 'flex',
    flexDirection: 'col',
    width: '7/12',
    overflowY: 'scroll',
    maxHeight: 'screen',
  }),
  colRight: toCss({
    display: 'flex',
    flexDirection: 'col',
    width: '5/12',
  }),
  row: toCss({
    display: 'flex',
    flexDirection: 'row',
    padding: { y: 4 },
  }),
  col: toCss({
    display: 'flex',
    flexDirection: 'col',
    padding: { x: 3 },
    flexWrap: true,
    overflowX: 'hidden',
  }),
}

// ui
import { views } from './views'

// state
const stateQuery = ({ screenCmd }) => ({ state: screenCmd })

// main
export const ScreenCmdPage = task(t => ({ ui, mutationCreators }) => {
  const Views = views.ui({ ui, css })
  return connectState(stateQuery, mutationCreators)(({ state, mutations }) => {
    return <div className={css.page}>{renderView(Views, state, mutations)}</div>
  })
})
