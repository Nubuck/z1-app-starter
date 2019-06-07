import React from 'react'
import { task, connectState } from '@z1/lib-feature-box'

// ui
import SchemaForm from 'react-jsonschema-form'

// styles
import { css } from './styles'

// state
const stateQuery = ({ screenCmd }) => ({ cmd: screenCmd })

// main
export const ScreenCmdPage = task(t => ({ mutations }) =>
  connectState(stateQuery, mutations)(({ cmd, mutations }) => {
    return (
      <div className={css.page}>
        <h1 className={css.title}>Z1 GANG SCREEN CMD</h1>
        {cmd.status}
        <SchemaForm schema={cmd.form.schema} uiSchema={cmd.form.uiSchema} />
      </div>
    )
  })
)
