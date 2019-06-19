import React from 'react'
import { task, connectState, VIEW_STATUS } from '@z1/lib-feature-box'
import { toCss } from '@z1/lib-ui-box-tailwind'

// ui
import SchemaForm from './form'

// styles
import { css } from './styles'

// state
const stateQuery = ({ screenCmd }) => ({ cmd: screenCmd })

// main
export const ScreenCmdPage = task(t => ({ mutationCreators }) =>
  connectState(stateQuery, mutationCreators)(({ cmd, mutations }) => {
    return (
      <div className={css.page}>
        {cmd.status}
        <div className='spinner-xl d-block h-20 bg-gray-300'/>
      </div>
    )
  })
)
