import React from 'react'
import { task } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// main
export const home = task((t, a) =>
  createView('home', {
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
        const [cmdError, cmdResult] = await a.of(
          api.service('service-cmd').find()
        )
        if (cmdError) {
          return {
            status,
            data: t.merge(viewData, {
              services: [],
            }),
            error: cmdError.message,
          }
        }
        return {
          status,
          data: t.merge(viewData, {
            services: cmdResult.data,
          }),
          error: null,
        }
      },
      form({ type, status, viewData, formData }) {
        return t.merge(
          {
            data: formData,
          },
          {}
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
    ui: ({ ViewContainer, ViewSpinner, Match }) => ({ state, mutations }) => {
      return (
        <ViewContainer>
          <Match
            value={state.status}
            when={{
              init: <ViewSpinner />,
              waiting: <ViewSpinner />,
              _: (
                <React.Fragment>
                  <h1>Service Cmd</h1>
                </React.Fragment>
              ),
            }}
          />
        </ViewContainer>
      )
    },
  })
)
