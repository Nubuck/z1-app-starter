import React from 'react'
import { task, connectState, VIEW_STATUS } from '@z1/lib-feature-box'
import { toCss } from '@z1/lib-ui-box-tailwind'
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
        <div className={css.editor}>
          <div className={css.colLeft}>
            <h1 className={css.title}>Z1 GANG SCREEN CMD</h1>
            {cmd.status}
            {t.not(t.eq(cmd.status, VIEW_STATUS.READY)) ? null : (
              <SchemaForm
                schema={cmd.form.schema}
                uiSchema={cmd.form.uiSchema}
                formData={cmd.current}
                onChange={props => mutations.formChange(props.formData)}
              >
                <div />
              </SchemaForm>
            )}
          </div>
          <div className={css.colRight}>
            <div className={css.row}>{`${JSON.stringify(cmd.data)}`}</div>
            <div className={css.row}>{toCss(cmd.data)}</div>
          </div>
        </div>
      </div>
    )
  })
)
