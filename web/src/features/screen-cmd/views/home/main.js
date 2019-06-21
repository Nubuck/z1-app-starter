import React from 'react'
import { task, Link } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// main
export const home = task(t =>
  createView('HOME', {
    state: {
      async load({ state, api, detailKey, viewData, formData, status, type }) {
        return {
          status: null,
          data: null,
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
    },
    ui: ({ css }) => ({ state, mutations }) => {
      return (
        <div className={css.container}>
          <h2 className={css.title}>HOME</h2>
          <div className={css.row}>
            <div className={css.col}>
              <Link to="/box-editor">UI BOX EDITOR</Link>
              <Link to="/view-editor">UI VIEW EDITOR</Link>
            </div>
          </div>
        </div>
      )
    },
  })
)
