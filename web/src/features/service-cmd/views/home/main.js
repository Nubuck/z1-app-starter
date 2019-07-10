import React from 'react'
import { task, VIEW_STATUS } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'
import bytes from 'bytes'
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
        if (t.or(t.isNil(formData.id), t.isNil(formData.action))) {
          return {
            status: VIEW_STATUS.READY,
            data: formData,
            error: null,
          }
        }
        const nextServices = t.map(
          service =>
            t.eq(service._id, formData.id)
              ? t.merge(service, {
                  actionStatus: t.getMatch(formData.action)({
                    start: 'launching',
                    stop: 'stopping',
                    restart: 'launcing',
                  }),
                  action: formData.action,
                })
              : service,
          viewData.services
        )
        dispatch(
          mutations.dataChange({
            data: { services: nextServices },
            status: VIEW_STATUS.READY,
          })
        )
        const [transportErr, transportResult] = await a.of(
          api
            .service('service-cmd')
            .patch(formData.id, { action: formData.action })
        )
        if (transportErr) {
          dispatch(
            mutations.dataChange({
              data: { services: viewData.services },
              status: VIEW_STATUS.READY,
            })
          )
          return {
            status: VIEW_STATUS.READY,
            data: formData,
            error: transportErr,
          }
        }
        const resultServices = t.map(
          service =>
            t.eq(service._id, formData.id) ? transportResult : service,
          viewData.services
        )
        dispatch(
          mutations.dataChange({
            data: { services: resultServices },
            status: VIEW_STATUS.READY,
          })
        )
        return {
          status: VIEW_STATUS.READY,
          data: { id: null, action: null },
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
                  <HStack
                    box={{ flexWrap: true, shadow: 'md' }}
                    className="form-dark"
                  >
                    <VStack box={{ padding: { y: 4, left: 4 } }}>
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
                  <VStack box={{ padding: [null, { sm: { top: 4 } }] }}>
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
                              padding: [4, { sm: { bottom: 4, top: 1, x: 6 } }],
                              borderWidth: [
                                { bottom: 2 },
                                { sm: { left: 2, bottom: 0 } },
                              ],
                              borderColor: busy
                                ? 'orange-500'
                                : t.not(t.eq(item.status, 'online'))
                                ? 'red-500'
                                : 'green-500',
                              shadow: 'md',
                            }}
                          >
                            <Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={3}
                              box={{
                                padding: [{ bottom: 4 }, { lg: 0 }],
                                flexDirection: [
                                  'col',
                                  { md: 'row', lg: 'col' },
                                ],
                              }}
                            >
                              <HStack y="top">
                                <VStack y="center">
                                  <HStack y="center" x="center">
                                    <Icon
                                      name="cube"
                                      size="4xl"
                                      color={
                                        busy
                                          ? 'orange-500'
                                          : t.not(t.eq(item.status, 'online'))
                                          ? 'red-500'
                                          : 'green-500'
                                      }
                                      box={{
                                        opacity: busy ? 50 : 100,
                                      }}
                                    />
                                  </HStack>
                                  <HStack
                                    y="center"
                                    x="center"
                                    box={{ opacity: busy ? 100 : 50 }}
                                  >
                                    <When is={busy}>
                                      <Text
                                        size="sm"
                                        weight="hairline"
                                        color="orange-500"
                                      >
                                        {item.action || 'busy'}
                                      </Text>
                                    </When>
                                    <When is={t.not(busy)}>
                                      <Text size="sm" weight="hairline">
                                        ready
                                      </Text>
                                    </When>
                                  </HStack>
                                </VStack>
                                <VStack y="top" box={{ padding: { left: 6 } }}>
                                  <Text
                                    size="2xl"
                                    color={'yellow-500'}
                                    weight="semibold"
                                    box={{
                                      margin: {
                                        bottom: 1,
                                      },
                                    }}
                                  >
                                    {item.name}
                                  </Text>
                                  <HStack y="center">
                                    <Text weight="thin">v{item.version}</Text>
                                    <When is={item.autoStart}>
                                      <Spacer />
                                      <Icon
                                        name="flag-checkered"
                                        color="blue-500"
                                        size="2xl"
                                        box={{
                                          padding: 1,
                                        }}
                                      />
                                    </When>
                                  </HStack>
                                </VStack>
                                <VStack
                                  y="top"
                                  x="left"
                                  box={{
                                    padding: { left: 2 },
                                    margin: { top: -2 },
                                  }}
                                >
                                  <Text
                                    weight="semibold"
                                    size="xl"
                                    color={
                                      busy
                                        ? 'orange-500'
                                        : t.not(t.eq(item.status, 'online'))
                                        ? 'gray-600'
                                        : 'green-500'
                                    }
                                    box={{ margin: { right: 2 } }}
                                  >{`x${item.instances || '0'}`}</Text>
                                </VStack>
                              </HStack>
                              <HStack
                                y="center"
                                box={{
                                  padding: [
                                    { y: 2 },
                                    {
                                      md: { left: 3, right: 6, top: 1 },
                                      lg: { x: 0 },
                                    },
                                  ],
                                  opacity: busy ? 50 : null,
                                }}
                              >
                                <Icon
                                  name={
                                    t.eq(item.status, 'online')
                                      ? 'play'
                                      : 'stop'
                                  }
                                  size="xl"
                                  color={
                                    t.eq(item.status, 'online')
                                      ? 'green-500'
                                      : 'red-500'
                                  }
                                  box={{
                                    margin: {
                                      right: 2,
                                      top: 1,
                                    },
                                  }}
                                />
                                <Text
                                  size="xl"
                                  color={
                                    t.eq(item.status, 'online')
                                      ? 'green-500'
                                      : 'red-500'
                                  }
                                  box={{
                                    margin: {
                                      right: 3,
                                    },
                                  }}
                                >
                                  {item.status || 'offline'}
                                </Text>
                                <When
                                  is={t.and(
                                    t.eq(item.status, 'online'),
                                    t.isType(item.uptime, 'String')
                                  )}
                                >
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
                                  padding: [
                                    { y: 2 },
                                    { md: { y: 0 }, lg: { y: 2 } },
                                  ],
                                }}
                              >
                                <Match
                                  value={item.status}
                                  when={{
                                    online: (
                                      <React.Fragment>
                                        <Button
                                          radius="full"
                                          size="sm"
                                          color={
                                            busy
                                              ? 'red-500'
                                              : ['red-500', { hover: 'white' }]
                                          }
                                          bg={
                                            busy
                                              ? null
                                              : [null, { hover: 'red-500' }]
                                          }
                                          border="red-500"
                                          borderWidth={2}
                                          disabled={busy}
                                          box={{
                                            padding: 2,
                                            opacity: busy ? 50 : null,
                                            cursor: busy ? 'wait' : 'pointer',
                                            outline: 'none',
                                          }}
                                          onClick={() =>
                                            mutations.formTransmit({
                                              data: {
                                                id: item._id,
                                                action: 'stop',
                                              },
                                            })
                                          }
                                        >
                                          <Icon
                                            name="stop"
                                            size="3xl"
                                            style={{
                                              paddingLeft: 1.8,
                                              paddingTop: 1.5,
                                            }}
                                          />
                                        </Button>
                                        <Button
                                          radius="full"
                                          size="sm"
                                          color={
                                            busy
                                              ? 'blue-500'
                                              : ['blue-500', { hover: 'white' }]
                                          }
                                          bg={
                                            busy
                                              ? null
                                              : [null, { hover: 'blue-500' }]
                                          }
                                          border="blue-500"
                                          borderWidth={2}
                                          disabled={busy}
                                          box={{
                                            padding: 2,
                                            margin: { left: 5, right: 2 },
                                            opacity: busy ? 50 : null,
                                            cursor: busy ? 'wait' : 'pointer',
                                            outline: 'none',
                                          }}
                                          onClick={() =>
                                            mutations.formTransmit({
                                              data: {
                                                id: item._id,
                                                action: 'restart',
                                              },
                                            })
                                          }
                                        >
                                          <Icon
                                            name="rotate-right"
                                            size="3xl"
                                          />
                                        </Button>
                                      </React.Fragment>
                                    ),
                                    _: (
                                      <Button
                                        radius="full"
                                        size="sm"
                                        color={
                                          busy
                                            ? 'green-500'
                                            : ['green-500', { hover: 'white' }]
                                        }
                                        bg={
                                          busy
                                            ? null
                                            : [null, { hover: 'green-500' }]
                                        }
                                        border="green-500"
                                        borderWidth={2}
                                        disabled={busy}
                                        box={{
                                          padding: 2,
                                          margin: { right: 2 },
                                          opacity: busy ? 50 : null,
                                          cursor: busy ? 'wait' : 'pointer',
                                          outline: 'none',
                                        }}
                                        onClick={() =>
                                          mutations.formTransmit({
                                            data: {
                                              id: item._id,
                                              action: 'start',
                                            },
                                          })
                                        }
                                      >
                                        <Icon
                                          name="play"
                                          size="3xl"
                                          style={{
                                            paddingLeft: 1.8,
                                            paddingTop: 1.5,
                                          }}
                                        />
                                      </Button>
                                    ),
                                  }}
                                />
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
                            <Col stretch>
                              <Row
                                box={{
                                  opacity: t.or(
                                    t.eq(item.status, 'stopped'),
                                    t.eq(item.status, 'init')
                                  )
                                    ? 50
                                    : 100,
                                }}
                              >
                                <Col
                                  y="top"
                                  xs={6}
                                  sm={3}
                                  box={{ padding: { x: 4, bottom: 4 } }}
                                >
                                  <Row y="center" x="left">
                                    <Icon
                                      name="rotate-right"
                                      size={['3xl', { lg: '4xl' }]}
                                      box={{ margin: { right: 3, top: 1 } }}
                                    />
                                    <Text
                                      size={['sm', { md: 'lg' }]}
                                      weight="hairline"
                                      letterSpacing="wide"
                                    >
                                      restarts
                                    </Text>
                                  </Row>
                                  <Text
                                    color={
                                      t.eq(item.status, 'online')
                                        ? 'green-400'
                                        : null
                                    }
                                    weight="semibold"
                                    size={['lg', { md: '3xl' }]}
                                  >{`x${item.restarts || '0'}`}</Text>
                                </Col>
                                <Col
                                  y="top"
                                  xs={6}
                                  sm={3}
                                  box={{ padding: { x: 4, bottom: 4 } }}
                                >
                                  <Row y="center" x="left">
                                    <Icon
                                      name="hdd-o"
                                      size={['3xl', { lg: '4xl' }]}
                                      box={{ margin: { right: 3, top: 1 } }}
                                    />
                                    <Text
                                      size={['sm', { md: 'lg' }]}
                                      weight="hairline"
                                      letterSpacing="wide"
                                    >
                                      CPU
                                    </Text>
                                  </Row>
                                  <Text
                                    color={
                                      t.eq(item.status, 'online')
                                        ? 'green-400'
                                        : null
                                    }
                                    weight="semibold"
                                    size={['lg', { md: '3xl' }]}
                                  >{`${item.cpu || '0'}%`}</Text>
                                </Col>
                                <Col
                                  y="top"
                                  xs={6}
                                  sm={3}
                                  box={{ padding: { x: 4, bottom: 4 } }}
                                >
                                  <Row y="center" x="left">
                                    <Icon
                                      name="database"
                                      size={['3xl', { lg: '4xl' }]}
                                      box={{ margin: { right: 3, top: 1 } }}
                                    />
                                    <Text
                                      size={['sm', { md: 'lg' }]}
                                      weight="hairline"
                                      letterSpacing="wide"
                                    >
                                      memory
                                    </Text>
                                  </Row>
                                  <Text
                                    color={
                                      t.eq(item.status, 'online')
                                        ? 'green-400'
                                        : null
                                    }
                                    weight="semibold"
                                    size={['lg', { md: '3xl' }]}
                                  >{`${bytes(item.memory || 0)}`}</Text>
                                </Col>
                                <Col
                                  y="top"
                                  xs={6}
                                  sm={3}
                                  box={{ padding: { x: 4, bottom: 4 } }}
                                >
                                  <Row y="center" x="left">
                                    <Icon
                                      name="calendar-check-o"
                                      size={['3xl', { lg: '4xl' }]}
                                      box={{ margin: { right: 3, top: 1 } }}
                                    />
                                    <Text
                                      size={['sm', { md: 'lg' }]}
                                      weight="hairline"
                                      letterSpacing="wide"
                                    >
                                      updated
                                    </Text>
                                  </Row>
                                  <Text
                                    color={
                                      t.eq(item.status, 'online')
                                        ? 'green-400'
                                        : null
                                    }
                                    weight="semibold"
                                    size={['sm', { md: 'xl' }]}
                                    box={{ padding: { top: 2 } }}
                                  >{`${
                                    item.updatedAt
                                      ? dayjs(item.updatedAt).format(
                                          'DD-MM-YYYY HH:mm a'
                                        )
                                      : ''
                                  }`}</Text>
                                </Col>
                              </Row>
                              <Row
                                box={{
                                  opacity: t.or(
                                    t.eq(item.status, 'stopped'),
                                    t.eq(item.status, 'init')
                                  )
                                    ? 50
                                    : 100,
                                }}
                              >
                                <Col
                                  y="top"
                                  xs={6}
                                  sm={3}
                                  box={{ padding: { x: 4, bottom: 4 } }}
                                >
                                  <Row y="center" x="left">
                                    <Icon
                                      name="barcode"
                                      size="3xl"
                                      box={{ margin: { right: 3, top: 1 } }}
                                    />
                                    <Text
                                      size={['sm', { md: 'lg' }]}
                                      weight="hairline"
                                      letterSpacing="wide"
                                    >
                                      pid
                                    </Text>
                                  </Row>
                                  <Text
                                    color={
                                      t.eq(item.status, 'online')
                                        ? 'green-500'
                                        : null
                                    }
                                    weight="semibold"
                                    size={['md', { md: 'xl' }]}
                                  >{`${item.pid || 'none'}`}</Text>
                                </Col>
                                <Col
                                  y="top"
                                  xs={6}
                                  sm={3}
                                  box={{ padding: { x: 4, bottom: 4 } }}
                                >
                                  <Row y="center" x="left">
                                    <Icon
                                      name="gears"
                                      size={['3xl', { lg: '4xl' }]}
                                      box={{ margin: { right: 3, top: 1 } }}
                                    />
                                    <Text
                                      size={['sm', { md: 'lg' }]}
                                      weight="hairline"
                                      letterSpacing="wide"
                                    >
                                      interpreter
                                    </Text>
                                  </Row>
                                  <Text
                                    color={
                                      t.eq(item.status, 'online')
                                        ? 'green-500'
                                        : null
                                    }
                                    weight="semibold"
                                    size={['md', { md: 'xl' }]}
                                  >{`${item.interpreter || 'none'}`}</Text>
                                </Col>
                                <Col
                                  y="top"
                                  xs={6}
                                  sm={3}
                                  box={{ padding: { x: 4 } }}
                                >
                                  <Row y="center" x="left">
                                    <Icon
                                      name="plug"
                                      size={['3xl', { lg: '4xl' }]}
                                      box={{ margin: { right: 3, top: 1 } }}
                                    />
                                    <Text
                                      size={['sm', { md: 'lg' }]}
                                      weight="hairline"
                                      letterSpacing="wide"
                                    >
                                      port
                                    </Text>
                                  </Row>
                                  <Text
                                    color={
                                      t.eq(item.status, 'online')
                                        ? 'green-500'
                                        : null
                                    }
                                    weight="semibold"
                                    size={['md', { md: 'xl' }]}
                                  >{`${item.port || 'none'}`}</Text>
                                </Col>
                                <Col
                                  y="top"
                                  xs={6}
                                  sm={3}
                                  box={{ padding: { x: 4, bottom: 4 } }}
                                >
                                  <Row y="center" x="left">
                                    <Icon
                                      name="calendar"
                                      size={['3xl', { lg: '4xl' }]}
                                      box={{ margin: { right: 3, top: 1 } }}
                                    />
                                    <Text
                                      size={['sm', { md: 'lg' }]}
                                      letterSpacing="wide"
                                      weight="hairline"
                                    >
                                      created
                                    </Text>
                                  </Row>
                                  <Text
                                    color={
                                      t.eq(item.status, 'online')
                                        ? 'green-500'
                                        : null
                                    }
                                    size={['sm', { md: 'xl' }]}
                                    weight="semibold"
                                  >{`${
                                    item.createdAt
                                      ? dayjs(item.createdAt).format(
                                          'DD-MM-YYYY HH:mm a'
                                        )
                                      : ''
                                  }`}</Text>
                                </Col>
                              </Row>
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
