import React from 'react'
import { task } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// main
export const home = task((t, a) =>
  createView('home', {
    state: {
      data({ type, status, viewData, nextData, error }) {
        return {
          status,
          data: t.eq(type, 'init')
            ? {
                services: [],
                sortFields: [
                  { value: 'name', label: 'Name' },
                  { value: 'status', label: 'Status' },
                  { value: 'updatedAt', label: 'Date Updated' },
                ],
                sortBy: { value: 'name', label: 'Name' },
                screen: {
                  size: null,
                  width: null,
                  height: null,
                },
              }
            : t.isNil(nextData)
            ? viewData
            : t.merge(viewData, nextData),
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
            data: {
              services: [],
            },
            error: cmdError.message,
          }
        }
        return {
          status,
          data: {
            services: cmdResult.data,
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
      ViewHeader,
      Match,
      When,
      MapIndexed,
      ServiceItem,
      VStack,
      HStack,
      SelectNext,
      Input,
      Text,
      Spacer,
      Icon,
    }) => ({ state, mutations }) => {
      return (
        <ViewContainer>
          <Match
            value={state.status}
            when={{
              _: <ViewSpinner />,
              ready: (
                <React.Fragment>
                  <HStack box={{ flexWrap: true }}>
                    <VStack box={{ padding: { y: 4 } }}>
                      <ViewHeader
                        title="Service"
                        text="Cmd"
                        icon="cubes"
                        size="md"
                      />
                    </VStack>
                    <Spacer />
                    <VStack y="center" box={{ padding: { left: 4, y: 4 } }}>
                      <Icon name="search" size="2xl" />
                    </VStack>
                    <VStack
                      box={{ width: 64, padding: { left: 4, y: 4 } }}
                      className="form-dark"
                    >
                      <Input placeholder="Search..." />
                    </VStack>
                    <VStack y="center" box={{ padding: { left: 4, y: 4 } }}>
                      <Icon name="sort" size="2xl" />
                    </VStack>
                    <VStack box={{ width: 64, padding: { left: 4, y: 4 } }}>
                      <SelectNext
                        value={state.data.sortBy}
                        options={state.data.sortFields}
                        onChange={selected =>
                          mutations.dataChange({
                            data: t.merge(state.data, {
                              sortBy: selected,
                            }),
                          })
                        }
                      />
                    </VStack>
                    <VStack
                      y="center"
                      box={{ padding: { left: 4, right: 2, y: 4 } }}
                    >
                      <Icon
                        name="sort-amount-asc"
                        size="2xl"
                        color="green-500"
                      />
                    </VStack>
                    <VStack
                      y="center"
                      box={{ padding: { left: 2, right: 4, y: 4 } }}
                    >
                      <Icon name="sort-amount-desc" size="2xl" />
                    </VStack>
                  </HStack>
                  <VStack box={{ padding: { top: 6 } }}>
                    <MapIndexed
                      list={state.data.services}
                      render={({ item, index }) => (
                        <ServiceItem key={index} {...item} />
                      )}
                    />
                  </VStack>
                </React.Fragment>
              ),
            }}
          />
        </ViewContainer>
      )
    },
  })
)
