import React from 'react'
import { task } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// schema
import { signInSchema } from './schema'

// main
export const signIn = task((t, a) =>
  createView('sign-in', {
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
          signInSchema({ disabled: false })
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
    ui: ({ ui: { HStack, ViewContainer, ViewHeading, ViewButton, ViewForm } }) => ({ state, mutations }) => {
      return (
        <ViewContainer>
          <ViewHeading
            title="Sign-in to your Z1 Account"
            text="Enter your account credentials below to continue."
          />
            <ViewForm
            schema={state.form.schema}
            uiSchema={state.form.uiSchema}
            formData={state.form.data}
            onSubmit={({ formData }) =>
              mutations.formTransmit({ data: formData })
            }
          >
            <HStack box={{ padding: { y: 4 } }}>
              <ViewButton type="submit">Sign-in</ViewButton>
            </HStack>
          </ViewForm>
        </ViewContainer>
      )
    },
  })
)
