import React from 'react'
import { task } from '@z1/lib-feature-box'

// ui
import SchemaForm from './form'

// styles
import { css } from './styles'

// main
export const BoxEditorView = task(t => ({ ui: {} }) => ({ cmd, mutations }) => {
  return (
    <div className={css.editor}>
      <div className={css.colLeft}>
        <h1 className={css.title}>Z1 GANG SCREEN CMD</h1>

        {t.not(t.eq(cmd.status, VIEW_STATUS.READY)) ? null : (
          <SchemaForm
            className={'baz-container'}
            schema={cmd.form.schema}
            uiSchema={cmd.form.uiSchema}
            formData={cmd.current}
            onChange={props => {
              // console.log('ON CHANGE', props)
              mutations.formChange(props.formData)
            }}
          >
            <div />
          </SchemaForm>
        )}
      </div>
      <div className={css.colRight}>
        <div className={css.row}>
          <div className={css.col}>{`${JSON.stringify(cmd.data)}`}</div>
        </div>
        {/* <div className={css.row}>{toCss(cmd.data)}</div> */}
      </div>
    </div>
  )
})
