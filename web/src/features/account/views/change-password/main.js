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
      form({ type, status, viewData, formData }) {
        return t.merge(
          {
            data: formData,
          },
          changePasswordSchema({ disabled: false })
        )
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
    ui: ({
      HStack,
      ViewContainer,
      ViewHeading,
      ViewButton,
      ViewForm,
      Text,
    }) => ({ state, mutations }) => {
      return (
        <ViewContainer>
          <ViewHeading
            title="Change your Z1 password"
            text="Enter the email address you registered with to reset your password."
          />
        </ViewContainer>
      )
    },
  })
)
