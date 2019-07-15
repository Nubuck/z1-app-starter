import React from 'react'
import { task } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// main
export const detail = task((t, a) =>
  createView('detail', {
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
    ui: ({ ViewContainer, ViewSpinner, Match, VStack, Row, ViewHeader }) => ({
      state,
      mutations,
    }) => {
      return (
        <ViewContainer>
          <Match
            value={state.status}
            when={{
              _: <ViewSpinner />,
              ready: (
                <React.Fragment>
                  <Row
                    box={{ flexWrap: true, shadow: 'md' }}
                    className="form-dark"
                  >
                    <VStack box={{ padding: { y: 4 } }}>
                      <ViewHeader
                        title="Service"
                        text="Service-name"
                        icon="cube"
                        size="md"
                      />
                    </VStack>
                    <Spacer />
                    <VStack
                      y="center"
                      box={{
                        padding: { y: 4 },
                        width: ['full', { sm: 'auto' }],
                      }}
                    >
                      {/* transport */}
                    </VStack>
                  </Row>
                </React.Fragment>
              ),
            }}
          />
        </ViewContainer>
      )
    },
  })
)
