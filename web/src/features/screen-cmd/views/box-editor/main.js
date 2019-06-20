import React from 'react'
import { task, Link, VIEW_STATUS } from '@z1/lib-feature-box'
import { createView } from '../../macros'

// ctx
import { VIEWS } from '../../ctx'

// ui
import SchemaForm from '../../form'

// styles
import { css } from '../../styles'

// main
export const boxEditor = task((t, a) =>
  createView(VIEWS.BOX_EDITOR, {
    state: {
      async load({ state, api, detailKey, viewData, formData, status, type }) {
        console.log('LOAD BOX EDITOR DATA', viewData, formData, status, type)
        return {
          status: null,
          data: null,
          error: null,
        }
      },
      data({ viewData, formData, status, type, error }) {
        console.log(
          'GET BOX EDITOR DATA',
          viewData,
          formData,
          status,
          type,
          error
        )
        return {
          status,
          data: viewData,
          error,
        }
      },
      form({ viewData, formData, status, type }) {
        console.log('GET BOX EDITOR FORM', viewData, formData, status, type)
        return {
          schema: {},
          uiSchema: {},
          data: {},
        }
      },
      async transmit({ state, api, viewData, formData, status, type }) {
        console.log('LOAD BOX EDITOR FORM', viewData, formData, status, type)
        return {
          status: null,
          data: null,
          error: null,
        }
      },
    },
    ui: props => ({ state, mutations }) => {
      return (
        <div className={css.editor}>
          <div className={css.colLeft}>
            <p>
              <Link to="/">HOME</Link>
            </p>
            <h2 className={css.title}>UI BOX EDITOR</h2>
            {t.not(t.eq(state.status, VIEW_STATUS.READY)) ? null : (
              <SchemaForm
                className={'baz-container'}
                schema={state.form.schema}
                uiSchema={state.form.uiSchema}
                formData={state.form.data}
                onChange={props => {
                  // console.log('ON CHANGE', props)
                  // mutations.formChange(props.formData)
                }}
              >
                <div />
              </SchemaForm>
            )}
          </div>
          <div className={css.colRight}>
            <div className={css.row}>
              <div className={css.col}>{`${JSON.stringify(
                state.form.data
              )}`}</div>
            </div>
            {/* <div className={css.row}>{toCss(cmd.data)}</div> */}
          </div>
        </div>
      )
    },
  })
)
