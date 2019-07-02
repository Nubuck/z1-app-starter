import React from 'react'
import { task } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// schema
import { changePasswordSchema } from './schema'

// main
export const changePassword = task((t, a) =>
  createView('change-password', {
    state: {
      data({ type, status, viewData, formData, error }) {
        return {
          status,
          data: viewData,
          error,
        }
      },
      async load({ type, status, state, api, detailKey, viewData, formData }) {
        return {
          status,
          data: viewData,
          error: null,
        }
      },
      form({ type, status, viewData, formData }) {
        return t.merge(
          {
            data: formData,
          },
          changePasswordSchema({ disabled: false })
        )
      },
      async transmit({ type, status, state, api, viewData, formData }) {
        return {
          status,
          data: formData,
          error: null,
        }
      },
    },
    ui: ({ ui }) => ({ state, mutations }) => {
      return <div />
    },
  })
)
