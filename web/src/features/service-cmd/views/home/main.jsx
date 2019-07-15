import React from 'react'
import { task, VIEW_STATUS } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'
import bytes from 'bytes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

// elements
import { elements } from './elements'

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
        if (t.not(t.eq(type, 'data-change'))) {
          return { status, data: t.merge(viewData, nextData || {}), error }
        }

        const item = t.pathOr(null, ['item'], nextData || {})
        const event = t.pathOr(null, ['event'], nextData || {})
        const services = t.pathOr(null, ['services'], nextData || {})
        const currentServices = t.pathOr([], ['services'], viewData)

        const nextServices = t.and(t.isNil(item), t.isNil(services))
          ? currentServices
          : t.isNil(item)
          ? services
          : t.and(t.not(t.isNil(item)), t.eq(event, 'created'))
          ? t.concat(currentServices, [item])
          : t.map(
              service => (t.eq(service._id, item._id) ? item : service),
              currentServices
            )

        return {
          status,
          data: t.mergeAll([
            viewData,
            t.omit(['services', 'item', 'event'], nextData || {}),
            { services: nextServices, counts: computeCounts(nextServices) },
          ]),
          error,
        }
      },
      async load({ status, api }) {
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
      form({ formData }) {
        return {
          data: formData,
        }
      },
      async transmit({ api, viewData, formData, dispatch, mutations }) {
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
    }) => {
      const { ViewToolbar } = elements({
        ViewHeader,
        Match,
        When,
        MapIndexed,
        VStack,
        HStack,
        Select,
        Input,
        Spacer,
        Icon,
        Button,
        Row,
        ViewMetric,
        TransportButton,
        ViewIconLabel,
      })
      const itemMetricProps = (status, color) => ({
        xs: 6,
        sm: 3,
        md: 4,
        xl: 2,
        size: 'md',
        textBox: {
          padding: [{ right: 2, top: 0 }, { xl: { top: 3 } }],
        },
        color: t.eq(status, 'online') ? color : null,
      })
      const viewMetricProps = color => ({
        xs: 6,
        sm: 3,
        lg: 2,
        size: 'md',
        box: {
          padding: { right: 4, bottom: 4 },
          color,
        },
      })
      return ({ state, mutations }) => {
        return (
          <ViewContainer>
            <Match
              value={state.status}
              when={{
                _: <ViewSpinner />,
                ready: (
                  <React.Fragment>
                    <ViewToolbar
                      title="Service"
                      text="Cmd"
                      icon="cubes"
                      search={state.data.search}
                      sortBy={state.data.sortBy}
                      sortFields={state.data.sortFields}
                      sortDirection={state.data.sortDirection}
                      onDataChange={payload => mutations.dataChange(payload)}
                    />
                    <VStack box={{ padding: [null, { sm: { top: 4 } }] }}>
                      <Row
                        box={{
                          padding: { bottom: 2, top: 2 },
                        }}
                      >
                        <ViewMetric
                          {...viewMetricProps('yellow-500')}
                          icon="hdd-o"
                          label="4 CPUs"
                        />
                        <ViewMetric
                          {...viewMetricProps('yellow-500')}
                          icon="database"
                          label="16gb RAM"
                        />
                        <ViewMetric
                          {...viewMetricProps('green-500')}
                          icon="cube"
                          label={`${state.data.counts.online} online`}
                        />
                        <ViewMetric
                          {...viewMetricProps('red-500')}
                          icon="cube"
                          label={`${state.data.counts.stopped} offline`}
                        />
                      </Row>
                      <MapIndexed
                        list={state.data.services}
                        render={({ item, index }) => {
                          const busy = t.or(
                            t.eq(item.actionStatus, 'launching'),
                            t.eq(item.actionStatus, 'stopping')
                          )
                          const primaryMetricProps = itemMetricProps(
                            item.status,
                            'green-500'
                          )
                          const secondaryMetricProps = itemMetricProps(
                            item.status,
                            'teal-500'
                          )
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
                                  padding: [
                                    { bottom: 2 },
                                    { md: { right: 6 } },
                                  ],
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
                                      { bottom: 2, left: 2 },
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
                                      { bottom: 4, left: 3, top: 1 },
                                      { md: { top: 0 } },
                                    ],
                                  }}
                                />
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
      }
    },
  })
)
