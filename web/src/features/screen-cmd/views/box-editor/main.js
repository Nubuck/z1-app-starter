import React from 'react'
import { task, Link, VIEW_STATUS } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// ctx
import { VIEWS } from '../../ctx'

// ui
import SchemaForm from '../../form'

// schema
import { uiBoxSchema } from './schema'

// main
export const boxEditor = task((t, a) =>
  createView(VIEWS.BOX_EDITOR, {
    state: {
      async load({ state, api, detailKey, viewData, formData, status, type }) {
        return {
          status,
          data: viewData,
          error: null,
        }
      },
      data({ viewData, formData, status, type, error }) {
        return {
          status,
          data: viewData,
          error,
        }
      },
      form({ viewData, formData, status, type }) {
        return t.merge(
          {
            data: formData,
          },
          uiBoxSchema
        )
      },
      async transmit({ state, api, viewData, formData, status, type }) {
        return {
          status,
          data: formData,
          error: null,
        }
      },
    },
    ui: ({ css }) => ({ state, mutations }) => {
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
                  mutations.formChange({ data: props.formData })
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
