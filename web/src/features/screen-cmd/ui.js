import React from 'react'
import { task, connectState, VIEW_STATUS } from '@z1/lib-feature-box'
import { renderView } from '@z1/lib-feature-macros'

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
    return (
      <div className={css.page}>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => mutations.dataChange({})}
          >
            data change
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => mutations.formChange({})}
          >
            form change
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => mutations.formTransmit({})}
          >
            form transmit
          </button>
        </div>
        {renderView(Views, state, mutations)}
      </div>
    )
  })
})
