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
      async load({
        type,
        status,
        api,
        detailKey,
        viewData,
        formData,
        getState,
        dispatch,
        mutations,
      }) {
        return {
          status,
          data: viewData,
          error: null,
        }
      },
      async transmit({
        type,
        status,
        api,
        viewData,
        formData,
        getState,
        dispatch,
        mutations,
      }) {
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
