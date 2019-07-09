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
    ui: ({
      ViewContainer,
      ViewSpinner,
      ViewHeader,
      Match,
      When,
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
                        className="bg-transparent"
                        theme={theme => ({
                          ...theme,
                          // borderRadius: 0,
                          colors: {
                            ...theme.colors,
                            primary25: '#48bb78',
                            primary: 'white',
                          },
                        })}
                        styles={{
                          menu: (provided, state) => ({
                            ...provided,
                            // borderBottom: '1px dotted pink',
                            color: 'white',
                            // padding: 20,
                            backgroundColor: '#2d3748',
                          }),
                          option: (provided, state) => ({
                            ...provided,
                            // borderBottom: '1px dotted pink',
                            color: state.isFocused
                              ? state.isSelected
                                ? 'white'
                                : '#48bb78'
                              : 'white',
                            padding: 10,
                            backgroundColor: state.isSelected
                              ? '#48bb78'
                              : 'transparent',
                          }),
                          control: provided => ({
                            ...provided,
                            // none of react-select's styles are passed to <Control />
                            color: 'white',
                            backgroundColor: 'transparent',
                            minHeight: 42,
                          }),
                          singleValue: (provided, state) => {
                            const opacity = state.isDisabled ? 0.5 : 1
                            const transition = 'opacity 300ms'

                            return {
                              ...provided,
                              color: 'white',
                              opacity,
                              transition,
                            }
                          },
                        }}
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
                  <When is={t.not(t.isZeroLen(state.data.services || []))}>
                    <VStack box={{ padding: { top: 6 } }}>
                      {t.mapIndexed(
                        (service, index) => (
                          <ServiceItem key={index} {...service} />
                        ),
                        state.data.services || []
                      )}
                    </VStack>
                  </When>
                </React.Fragment>
              ),
              _: <ViewSpinner />,
            }}
          />
        </ViewContainer>
      )
    },
  })
)
