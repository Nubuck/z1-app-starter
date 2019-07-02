import React from 'react'
import { task } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// schema
import { resetPasswordSchema } from './schema'

// main
export const resetPassword = task((t, a) =>
  createView('RESET_PASSWORD', {
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
        resetPasswordSchema({ disabled: false })
      )
    },
    async transmit({ type, status, state, api, viewData, formData }) {
      return {
        status,
        data: formData,
        error: null,
      }
    },
    ui: ({ ui }) => ({ state, mutations }) => {
      return <div />
    },
  })
)
