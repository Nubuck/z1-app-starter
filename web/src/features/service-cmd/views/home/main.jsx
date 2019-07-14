import React from 'react'
import { task, VIEW_STATUS } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'
import bytes from 'bytes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

// tasks
const computeCounts = task(t => list =>
  t.reduce(
    (counts, item) =>
      t.merge(counts, {
        online: t.eq(item.status, 'online') ? counts.online + 1 : counts.online,
        stopped: t.or(
          t.isNil(item.status),
          t.or(t.eq(item.status, 'stopped'), t.eq(item.status, 'init'))
        )
          ? counts.stopped + 1
          : counts.stopped,
      }),
    { online: 0, stopped: 0 },
    list
  )
)
// main
export const home = task((t, a) =>
  createView('home', {
    state: {
      data({ type, status, viewData, nextData, error }) {
        if (t.eq(type, 'init')) {
          return {
            data: {
              services: [],
              sortFields: [
                { value: 'name', label: 'Name' },
                { value: 'status', label: 'Status' },
                { value: 'updatedAt', label: 'Date Updated' },
              ],
              sortBy: 'name',
              sortDirection: 'asc',
              search: '',
              counts: {
                online: 0,
                stopped: 0,
              },
            },
            error,
          }
        }
        if (t.eq(type, 'data-load-complete')) {
          return { status, data: t.merge(viewData, nextData || {}), error }
        }
        const item = t.pathOr(null, ['item'], nextData || {})
        const services = t.pathOr(null, ['services'], nextData)
        const currentServices = t.pathOr([], ['services'], viewData)
        const currentItem = t.isNil(item)
          ? null
          : t.find(service => t.eq(service._id, item._id), currentServices)
        const nextServices = t.and(t.isNil(item), t.isNil(currentItem))
          ? t.isNil(services)
            ? currentServices
            : services
          : t.and(t.not(t.isNil(item)), t.isNil(currentItem))
          ? t.concat(t.isNil(services) ? currentServices : services, [item])
          : t.map(
              service => (t.eq(service._id, item._id) ? item : service),
              t.isNil(services) ? currentServices : services
            )
        return {
          status,
          data: t.mergeAll([
            viewData,
            t.omit(['services', 'item'], nextData || {}),
            { services: nextServices, counts: computeCounts(nextServices) },
          ]),
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
            counts: computeCounts(cmdResult.data),
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
            data: {
              services: nextServices,
              counts: computeCounts(nextServices),
            },
            status: VIEW_STATUS.READY,
          })
        )
        const [transportErr] = await a.of(
          api
            .service('service-cmd')
            .patch(formData.id, { action: formData.action })
        )
        if (transportErr) {
          return {
            status: VIEW_STATUS.READY,
            data: formData,
            error: transportErr,
          }
        }
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
      ViewIconLabel,
    }) => ({ state, mutations }) => {
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
                          box={{ margin: { right: 2 } }}
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
                        padding: [{ y: 4 }, { sm: { left: 2 } }],
                        width: ['full', { md: 'auto' }],
                      }}
                    >
                      <HStack y="center">
                        <Icon
                          name="sort"
                          size="2xl"
                          box={{ margin: { right: 2 } }}
                        />
                        <Select
                          box={{ margin: { right: 2 } }}
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
                          box={{ padding: { x: 1 } }}
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
                          box={{ padding: { x: 1 } }}
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
                  </Row>
                  <VStack box={{ padding: [null, { sm: { top: 4 } }] }}>
                    <Row
                      box={{
                        padding: { bottom: 2, top: 2 },
                      }}
                    >
                      <ViewMetric
                        size="sm"
                        icon="hdd-o"
                        label="4 CPUs"
                        box={{
                          padding: { right: 4, bottom: 4 },

                          color: 'yellow-500',
                        }}
                      />
                      <ViewMetric
                        size="sm"
                        icon="database"
                        label="16gb RAM"
                        box={{
                          color: 'yellow-500',
                        }}
                      />
                      <ViewMetric
                        size="sm"
                        icon="cube"
                        label={`${state.data.counts.online} online`}
                        box={{
                          padding: [
                            { left: 2, right: 2, bottom: 4 },
                            { sm: { left: 4, bottom: 4 } },
                          ],
                          color: 'green-500',
                        }}
                      />
                      <ViewMetric
                        size="sm"
                        icon="cube"
                        label={`${state.data.counts.stopped} offline`}
                        box={{
                          padding: [{ bottom: 4 }, { sm: { x: 2, bottom: 4 } }],
                          color: 'red-500',
                        }}
                      />
                    </Row>
                    <MapIndexed
                      list={state.data.services}
                      render={({ item, index }) => {
                        const busy = t.or(
                          t.eq(item.actionStatus, 'launching'),
                          t.eq(item.actionStatus, 'stopping')
                        )
                        // const busy = false
                        const metricProps = {
                          xs: 6,
                          sm: 3,
                          md: 4,
                          xl: 2,
                          size: 'md',
                          textBox: {
                            padding: [{ right: 2, top: 0 }, { xl: { top: 3 } }],
                          },
                        }
                        const primaryMetricProps = {
                          ...metricProps,
                          color: t.eq(item.status, 'online')
                            ? 'green-500'
                            : null,
                        }
                        const secondaryMetricProps = {
                          ...metricProps,
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
                              padding: [{ top: 2 }, { sm: { top: 2, x: 6 } }],
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
                                    padding: { right: 4, left: 2 },
                                    display: ['hidden', { sm: 'flex' }],
                                  }}
                                >
                                  <HStack y="center" x="center">
                                    <Icon
                                      name="cube"
                                      size={['3xl', { xl: '4xl' }]}
                                      color={
                                        busy
                                          ? 'orange-500'
                                          : t.not(t.eq(item.status, 'online'))
                                          ? 'red-500'
                                          : 'green-500'
                                      }
                                      box={{
                                        opacity: busy ? 50 : 100,
                                        width: [8, { xl: 10 }],
                                        textAlignX: 'center',
                                      }}
                                    />
                                  </HStack>
                                  <HStack y="center" x="center">
                                    <When is={busy}>
                                      <Text
                                        size="sm"
                                        color="orange-500"
                                        weight="thin"
                                        letterSpacing="wide"
                                        box={{
                                          padding: { top: 1 },
                                        }}
                                      >
                                        {item.action || 'busy'}
                                      </Text>
                                    </When>
                                    <When is={t.not(busy)}>
                                      <Text
                                        size="sm"
                                        weight="thin"
                                        letterSpacing="wide"
                                        box={{
                                          padding: { top: 1 },
                                        }}
                                      >
                                        ready
                                      </Text>
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
                                    size={['xl', { xl: '2xl' }]}
                                    color={'yellow-500'}
                                    weight="semibold"
                                  >
                                    {item.name}
                                  </Text>
                                  <HStack y="bottom">
                                    <Text
                                      size="sm"
                                      weight="thin"
                                      box={{ padding: { top: 1 } }}
                                    >
                                      v{item.version}
                                    </Text>
                                    <When is={item.autoStart}>
                                      <Spacer />
                                      <ViewIconLabel
                                        icon="flag-checkered"
                                        text="autostart"
                                        color="blue-500"
                                        iconSize="xl"
                                        size="sm"
                                        letterSpacing="wide"
                                        box={{ padding: { left: 1 } }}
                                        textBox={{ margin: 0 }}
                                        y="bottom"
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
                                      alignSelf: 'auto',
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
                                    { y: 2, left: 2 },
                                    {
                                      md: { right: 6, top: 1 },
                                      lg: { x: 0 },
                                    },
                                  ],
                                  opacity: busy ? 50 : null,
                                }}
                              >
                                <ViewIconLabel
                                  icon={
                                    t.eq(item.status, 'online')
                                      ? 'play'
                                      : 'stop'
                                  }
                                  text={item.status || 'offline'}
                                  color={
                                    t.eq(item.status, 'online')
                                      ? 'green-500'
                                      : 'red-500'
                                  }
                                  size="xl"
                                  busy={busy}
                                  box={{ margin: { right: 2 } }}
                                />
                                <When
                                  is={t.and(
                                    t.eq(item.status, 'online'),
                                    t.isType(item.uptime, 'String')
                                  )}
                                >
                                  <ViewIconLabel
                                    icon="arrow-up"
                                    text={dayjs().from(
                                      dayjs(item.uptime),
                                      true
                                    )}
                                  />
                                </When>
                              </HStack>
                              <ViewIconLabel
                                icon="calendar"
                                size="sm"
                                iconSize="lg"
                                weight="thin"
                                letterSpacing="wide"
                                text={
                                  item.updatedAt
                                    ? `updated ${dayjs().from(
                                        dayjs(item.updatedAt),
                                        true
                                      )} ago`
                                    : ''
                                }
                                box={{
                                  opacity: 50,
                                  padding: [
                                    { y: 2, left: 2 },
                                    {
                                      md: { right: 6, top: 1 },
                                      lg: { x: 0 },
                                    },
                                  ],
                                }}
                              />
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={7} xl={8}>
                              <Row
                                box={{
                                  opacity: t.or(
                                    t.isNil(item.status),
                                    t.or(
                                      t.eq(item.status, 'stopped'),
                                      t.eq(item.status, 'init')
                                    )
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
                                <ViewMetric
                                  {...secondaryMetricProps}
                                  icon="gears"
                                  label="pm2id"
                                  text={`${
                                    t.isNil(item.pmId) ? 'none' : item.pmId
                                  }`}
                                />
                                <ViewMetric
                                  {...secondaryMetricProps}
                                  icon="barcode"
                                  label="pid"
                                  text={`${
                                    t.isNil(item.pid) ? 'none' : item.pid
                                  }`}
                                />
                                <ViewMetric
                                  {...secondaryMetricProps}
                                  icon="terminal"
                                  label="interpreter"
                                  text={`${item.interpreter || 'none'}`}
                                />
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
