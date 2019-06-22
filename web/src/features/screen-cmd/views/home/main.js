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
    ui: ({ css, ui: { HStack, VStack, Spacer } }) => ({ state, mutations }) => {
      return (
        <VStack box={{ padding: 3 }}>
          <HStack className={css.title} x="center" y="left">
            <i className="eva eva-home-outline mr-2" />
            <span>HOME</span>
          </HStack>
          <VStack>
            <Link to="/box-editor">UI BOX EDITOR</Link>
            <Link to="/view-editor">UI VIEW EDITOR</Link>
          </VStack>
        </VStack>
      )
    },
  })
)
