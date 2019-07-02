import React from 'react'
import { task } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// main
export const verify = task((t, a) =>
  createView('verify', {
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
