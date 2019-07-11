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
      ViewMetric,
      TransportButton,
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
                    <VStack box={{ padding: { y: 4 } }}>
                      <ViewHeader
                        title="Service"
                        text="Cmd"
                        icon="cubes"
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
                      box={{
                        padding: [{ y: 4 }, { sm: { left: 4 } }],
                        width: ['full', { sm: 'auto' }],
                      }}
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
                    <Row
                      box={{
                        padding: { bottom: 2, top: 2 },
                        color: 'yellow-500',
                      }}
                    >
                      <ViewMetric
                        size="sm"
                        icon="server"
                        label="2 online"
                        box={{ padding: { right: 4, bottom: 4 } }}
                      />
                      <ViewMetric size="sm" icon="server" label="2 offline" />
                      <ViewMetric size="sm" icon="th-large" label="4 CPUs" />
                    </Row>
                    <MapIndexed
                      list={state.data.services}
                      render={({ item, index }) => {
                        const busy = t.or(
                          t.eq(item.actionStatus, 'launching'),
                          t.eq(item.actionStatus, 'stopping')
                        )
                        // const busy = false
                        const primaryMetricProps = {
                          xs: 6,
                          sm: 3,
                          md: 4,
                          xl: 2,
                          size: 'md',
                          color: t.eq(item.status, 'online')
                            ? 'green-500'
                            : null,
                        }
                        const secondaryMetricProps = {
                          xs: 6,
                          sm: 3,
                          md: 4,
                          xl: 2,
                          size: 'md',
                          color: t.eq(item.status, 'online')
                            ? 'green-600'
                            : null,
                        }
                        return (
                          <Row
                            key={index}
                            y="center"
                            box={{
                              margin: { y: 3 },
                              padding: [0, { sm: { bottom: 4, top: 1, x: 6 } }],
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
                              md={6}
                              lg={5}
                              xl={4}
                              box={{
                                padding: [{ bottom: 4 }, { md: { right: 6 } }],
                              }}
                            >
                              <HStack y="top">
                                <VStack y="center">
                                  <TransportButton
                                    busy={busy}
                                    status={item.status}
                                    onStart={() =>
                                      mutations.formTransmit({
                                        data: {
                                          id: item._id,
                                          action: 'start',
                                        },
                                      })
                                    }
                                    onStop={() =>
                                      mutations.formTransmit({
                                        data: {
                                          id: item._id,
                                          action: 'stop',
                                        },
                                      })
                                    }
                                  />
                                </VStack>
                                <VStack
                                  y="top"
                                  box={{
                                    padding: { top: 1, right: 4, left: 2 },
                                    display: ['hidden', { sm: 'flex' }],
                                  }}
                                >
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
                                        width: 10,
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
                                        weight="hairline"
                                        color="orange-500"
                                      >
                                        {item.action || 'busy'}
                                      </Text>
                                    </When>
                                    <When is={t.not(busy)}>
                                      <Text weight="thin">ready</Text>
                                    </When>
                                  </HStack>
                                </VStack>
                                <VStack
                                  y="top"
                                  box={{
                                    position: 'relative',
                                    padding: [
                                      { left: 0, right: 4 },
                                      { lg: { left: 3 } },
                                    ],
                                    flexWrap: true,
                                  }}
                                >
                                  <Text
                                    size={['xl', { sm: '2xl' }]}
                                    color={'yellow-500'}
                                    weight="semibold"
                                  >
                                    {item.name}
                                  </Text>
                                  <HStack y="center">
                                    <Text
                                      weight="thin"
                                      box={{ padding: { top: 1 } }}
                                    >
                                      v{item.version}
                                    </Text>
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
                                  <VStack
                                    y="top"
                                    x="left"
                                    box={{
                                      position: 'absolute',
                                      pin: { top: true, right: true },
                                      margin: { top: -4, right: -4 },
                                      alignSelf: 'autp',
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
                                </VStack>
                              </HStack>
                              <HStack
                                y="center"
                                box={{
                                  padding: [
                                    { y: 2 },
                                    {
                                      md: { right: 6, top: 1 },
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
                                      right: 2,
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
                                    box={{
                                      margin: {
                                        top: 1,
                                        x: 2,
                                      },
                                    }}
                                  />
                                  <Text
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
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={7} xl={8}>
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
                                <ViewMetric
                                  {...primaryMetricProps}
                                  icon="rotate-right"
                                  label="restarts"
                                  text={`x${item.restarts || '0'}`}
                                />
                                <ViewMetric
                                  {...primaryMetricProps}
                                  icon="hdd-o"
                                  label="CPU"
                                  text={`${item.cpu || '0'}%`}
                                />
                                <ViewMetric
                                  {...primaryMetricProps}
                                  icon="database"
                                  label="memory"
                                  text={`${t.caseTo.lowerCase(
                                    bytes(item.memory || 0)
                                  )}`}
                                />
                                {/* <ViewMetric
                                  {...primaryMetricProps}
                                  icon="calendar-check-o"
                                  label="updated"
                                  text={`${
                                    item.updatedAt
                                      ? dayjs(item.updatedAt).format(
                                          'DD-MM-YYYY HH:mm a'
                                        )
                                      : ''
                                  }`}
                                /> */}

                                <ViewMetric
                                  {...secondaryMetricProps}
                                  icon="server"
                                  label="pm2id"
                                  text={`${item.pmId || 'none'}`}
                                />
                                <ViewMetric
                                  {...secondaryMetricProps}
                                  icon="barcode"
                                  label="pid"
                                  text={`${item.pid || 'none'}`}
                                />
                                <ViewMetric
                                  {...secondaryMetricProps}
                                  icon="terminal"
                                  label="interpreter"
                                  text={`${item.interpreter || 'none'}`}
                                />
                                {/* <ViewMetric
                                  {...secondaryMetricProps}
                                  icon="plug"
                                  label="port"
                                  text={`${item.port || 'none'}`}
                                /> */}
                                {/* <ViewMetric
                                  {...secondaryMetricProps}
                                  icon="calendar"
                                  label="created"
                                  text={`${
                                    item.createdAt
                                      ? dayjs(item.createdAt).format(
                                          'DD-MM-YYYY HH:mm a'
                                        )
                                      : ''
                                  }`}
                                /> */}
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
