import React from 'react'
import { task, Link, VIEW_STATUS } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// ctx
import { VIEWS } from '../../ctx'

// ui
import SortableTree from 'react-sortable-tree'

// styles
import { css } from '../../styles'

// main
export const viewEditor = task(t =>
  createView(VIEWS.VIEW_EDITOR, {
    state: {
      async load({ state, api, viewData, formData, status, type }) {
        console.log('LOAD VIEW EDITOR DATA', viewData, formData, status, type)
        return {
          status: null,
          data: null,
          error: null,
        }
      },
      data({ viewData, formData, status, type, error }) {
        console.log(
          'GET VIEW EDITOR DATA',
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
        console.log('GET VIEW EDITOR FORM', viewData, formData, status, type)
        return {
          schema: {},
          uiSchema: {},
          data: {},
        }
      },
      async transmit({ state, api, viewData, formData, status, type }) {
        console.log('LOAD VIEW EDITOR FORM', viewData, formData, status, type)
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
            <h2 className={css.title}>VIEW EDITOR</h2>
            <div className={css.editorContainer}>{/* <SortableTree /> */}</div>
          </div>
          <div className={css.colRight}>
            <div className={css.row}>
              <div className={css.col}>{`${JSON.stringify(state.data)}`}</div>
            </div>
            {/* <div className={css.row}>{toCss(cmd.data)}</div> */}
          </div>
        </div>
      )
    },
  })
)
