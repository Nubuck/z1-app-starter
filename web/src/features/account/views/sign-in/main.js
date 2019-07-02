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
    ui: ({ ui: { VStack, HStack, ViewHeading } }) => ({ state, mutations }) => {
      return (
        <VStack x="center" y="center">
          <HStack x="center" y="center" box={{ padding: { x: 2 } }}>
            <ViewHeading
              title="Sign-in to your Z1 Account"
              text="Enter your account credentials below to continue."
            />
          </HStack>
        </VStack>
      )
    },
  })
)
