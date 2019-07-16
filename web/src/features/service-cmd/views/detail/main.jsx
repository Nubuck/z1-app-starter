import React from 'react'
import { task } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// main
export const detail = task((t, a) =>
  createView('detail', {
    state: {
      data({ type, status, viewData, nextData, formData, error }) {
        if (t.eq(type, 'init')) {
          return {
            status,
            data: {
              service: null,
            },
            error: null,
          }
        }
        return {
          status,
          data: t.merge(viewData, nextData || {}),
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
          api.service('service-cmd').get(detailKey)
        )
        if (cmdError) {
          return {
            status,
            data: {
              service: null,
            },
            error: cmdError.message,
          }
        }
        return {
          status,
          data: {
            service: cmdResult,
          },
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
    ui: ({
      ViewContainer,
      ViewSpinner,
      Match,
      VStack,
      Row,
      ViewHeader,
      Spacer,
      When,
    }) => ({ state, mutations }) => {
      return (
        <ViewContainer>
          <Match
            value={state.status}
            when={{
              _: <ViewSpinner />,
              ready: (
                <React.Fragment>
                  <When is={t.not(t.isNil(state.data.service))}>
                    <Row
                      box={{ flexWrap: true, shadow: 'md' }}
                      className="form-dark"
                    >
                      <VStack box={{ padding: { y: 4 } }}>
                        <ViewHeader
                          title="Service"
                          text={t.pathOr(
                            '',
                            ['data', 'service', 'name'],
                            state
                          )}
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
                  </When>
                </React.Fragment>
              ),
            }}
          />
        </ViewContainer>
      )
    },
  })
)
