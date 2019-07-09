import React from 'react'
import { task } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

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
                sortDirection: 'asc',
                search: '',
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
      Spinner,
      VStack,
      HStack,
      Select,
      Input,
      Text,
      Spacer,
      Icon,
      Button,
      Row,
      Col,
    }) => ({ state, mutations }) => {
      return (
        <ViewContainer>
          <Match
            value={state.status}
            when={{
              _: <ViewSpinner />,
              ready: (
                <React.Fragment>
                  <HStack box={{ flexWrap: true }} className="form-dark">
                    <VStack box={{ padding: { y: 4 } }}>
                      <ViewHeader
                        title="Service"
                        text="Cmd"
                        icon="cubes"
                        size="md"
                      />
                    </VStack>
                    <Spacer />
                    <VStack y="center" box={{ padding: { y: 4 } }}>
                      <HStack y="center">
                        <Icon
                          name="search"
                          size="2xl"
                          box={{ margin: { right: 3 } }}
                        />
                        <Input
                          placeholder="Search..."
                          value={state.data.search}
                          onChange={t.throttle(event => {
                            mutations.dataChange({
                              data: { search: event.target.value },
                            })
                          }, 1500)}
                        />
                      </HStack>
                    </VStack>
                    <VStack
                      y="center"
                      box={{ padding: [{ y: 4 }, { sm: { left: 4 } }] }}
                    >
                      <HStack y="center">
                        <Icon
                          name="sort"
                          size="2xl"
                          box={{ margin: { right: 3 } }}
                        />
                        <Select
                          value={state.data.sortBy}
                          onChange={event =>
                            mutations.dataChange({
                              data: {
                                sortBy: event.target.value,
                              },
                            })
                          }
                        >
                          <MapIndexed
                            list={state.data.sortFields}
                            render={({ item, index }) => (
                              <option key={index} value={item.value}>
                                {item.label}
                              </option>
                            )}
                          />
                        </Select>
                      </HStack>
                    </VStack>
                    <VStack
                      y="center"
                      box={{ padding: { left: 4, right: 2, y: 4 } }}
                    >
                      <HStack y="center">
                        <Button
                          radius="full"
                          size="sm"
                          disabled={t.eq(state.data.sortDirection, 'asc')}
                          color={[
                            t.eq(state.data.sortDirection, 'asc')
                              ? 'green-500'
                              : null,
                            {
                              hover: t.eq(state.data.sortDirection, 'asc')
                                ? null
                                : 'yellow-500',
                            },
                          ]}
                          onClick={() =>
                            mutations.dataChange({
                              data: { sortDirection: 'asc' },
                            })
                          }
                        >
                          <Icon name="sort-amount-asc" size="2xl" />
                        </Button>
                        <Button
                          radius="full"
                          size="sm"
                          disabled={t.eq(state.data.sortDirection, 'desc')}
                          color={[
                            t.eq(state.data.sortDirection, 'desc')
                              ? 'green-500'
                              : null,
                            {
                              hover: t.eq(state.data.sortDirection, 'desc')
                                ? null
                                : 'yellow-500',
                            },
                          ]}
                          onClick={() =>
                            mutations.dataChange({
                              data: { sortDirection: 'desc' },
                            })
                          }
                        >
                          <Icon name="sort-amount-desc" size="2xl" />
                        </Button>
                      </HStack>
                    </VStack>
                  </HStack>
                  <VStack box={{ padding: { top: 6 } }}>
                    <MapIndexed
                      list={state.data.services}
                      render={({ item, index }) => {
                        const busy = t.or(
                          t.eq(item.actionStatus, 'launching'),
                          t.eq(item.actionStatus, 'stopping')
                        )
                        // const busy = true
                        return (
                          <Row
                            key={index}
                            y="center"
                            box={{
                              margin: { y: 3 },
                              padding: { y: 2, x: 4 },
                              borderWidth: { left: 2 },
                              borderColor: 'green-500',
                            }}
                          >
                            <Col xs={12} sm={7} md={5} lg={4}>
                              <HStack y="center">
                                <Icon
                                  name="cube"
                                  size="4xl"
                                  color={'green-500'}
                                  box={{
                                    margin: {
                                      right: 4,
                                    },
                                  }}
                                />
                                <VStack y="center">
                                  <Text
                                    size="xl"
                                    color={'yellow-500'}
                                    weight="semibold"
                                    box={{
                                      margin: {
                                        bottom: 2,
                                      },
                                    }}
                                  >
                                    {item.name}
                                  </Text>
                                  <Text weight="thin">v{item.version}</Text>
                                </VStack>
                              </HStack>
                              <HStack
                                y="center"
                                box={{
                                  padding: { y: 2 },
                                  opacity: busy ? 50 : null,
                                }}
                              >
                                <Icon
                                  name="play"
                                  size="xl"
                                  color={'green-500'}
                                  box={{
                                    margin: {
                                      right: 2,
                                      top: 1,
                                    },
                                  }}
                                />
                                <Text
                                  size="xl"
                                  color={'green-500'}
                                  box={{
                                    margin: {
                                      right: 3,
                                    },
                                  }}
                                >
                                  {item.status}
                                </Text>
                                <When is={t.isType(item.uptime, 'String')}>
                                  <Icon
                                    name="clock-o"
                                    size="lg"
                                    box={{
                                      margin: {
                                        top: 1,
                                        x: 2,
                                      },
                                    }}
                                  />
                                  <Text
                                    size="lg"
                                    weight="thin"
                                    box={{
                                      margin: {
                                        top: 1,
                                      },
                                    }}
                                  >
                                    {dayjs().from(dayjs(item.uptime), true)}
                                  </Text>
                                </When>
                              </HStack>
                              <HStack
                                y="center"
                                box={{
                                  padding: { y: 2 },
                                }}
                              >
                                <Match
                                  value={item.status}
                                  when={{
                                    online: (
                                      <Button
                                        radius="full"
                                        size="sm"
                                        color="red-500"
                                        border="red-500"
                                        borderWidth={2}
                                        disabled={busy}
                                        box={{
                                          padding: 2,
                                          opacity: busy ? 50 : null,
                                          cursor: busy ? 'wait' : 'pointer',
                                        }}
                                      >
                                        <Icon name="stop" size="3xl" />
                                      </Button>
                                    ),
                                    _: (
                                      <Button
                                        radius="full"
                                        size="sm"
                                        color="green-500"
                                        border="green-500"
                                        borderWidth={2}
                                        disabled={busy}
                                        box={{
                                          padding: 2,
                                          opacity: busy ? 50 : null,
                                          cursor: busy ? 'wait' : 'pointer',
                                        }}
                                      >
                                        <Icon name="play" size="3xl" />
                                      </Button>
                                    ),
                                  }}
                                />
                                <Button
                                  radius="full"
                                  size="sm"
                                  color="yellow-500"
                                  border="yellow-500"
                                  borderWidth={2}
                                  disabled={busy}
                                  box={{
                                    padding: 2,
                                    margin: { left: 4, right: 1, top: 1 },
                                    opacity: busy ? 50 : null,
                                    cursor: busy ? 'wait' : 'pointer',
                                  }}
                                >
                                  <Icon name="rotate-right" size="2xl" />
                                </Button>
                                <When is={busy}>
                                  <Spinner
                                    size="md"
                                    box={{
                                      display: 'block',
                                      height: 8,
                                      width: 8,
                                      padding: 2,
                                      margin: {
                                        left: 6,
                                      },
                                    }}
                                  />
                                </When>
                              </HStack>
                            </Col>
                          </Row>
                        )
                      }}
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
