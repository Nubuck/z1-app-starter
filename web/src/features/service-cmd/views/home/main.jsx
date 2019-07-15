import React from 'react'
import { task, VIEW_STATUS } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'
import bytes from 'bytes'

// elements
import { elements } from './elements'

// tasks
import {
  computeCounts,
  updateServiceInList,
  itemMetricProps,
  viewMetricProps,
} from './tasks'

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
          : updateServiceInList(item, currentServices)
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
        const service = t.find(
          item => t.eq(item._id, formData.id),
          viewData.services
        )
        const nextServices = updateServiceInList(
          t.merge(service || {}, {
            actionStatus: t.getMatch(formData.action)({
              start: 'launching',
              stop: 'stopping',
              restart: 'launcing',
            }),
            action: formData.action,
          }),
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
      const {
        ViewToolbar,
        ViewTransportItemRow,
        ViewTransportMetricRow,
        ViewStatusIcon,
        ViewTransportTitle,
        ViewTransportStatusLabel,
        ViewTimestampLabel,
      } = elements({
        ViewHeader,
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
        ViewIconLabel,
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
                    <VStack box={{ padding: [{ top: 6 }, { sm: { top: 4 } }] }}>
                      <Row
                        box={{
                          padding: { bottom: 2 },
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
                            <ViewTransportItemRow
                              key={index}
                              status={item.status}
                              busy={busy}
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
                                  <ViewStatusIcon
                                    status={item.status}
                                    busy={busy}
                                    action={item.action}
                                  />
                                  <ViewTransportTitle
                                    name={item.name}
                                    version={item.version}
                                    autoStart={item.autoStart}
                                    status={item.status}
                                    busy={busy}
                                    instances={item.instances}
                                  />
                                </HStack>
                                <ViewTransportStatusLabel
                                  status={item.status}
                                  busy={busy}
                                  uptime={item.uptime}
                                />
                              </Col>
                              <Col xs={12} sm={12} md={6} lg={7} xl={8}>
                                <ViewTransportMetricRow status={item.status}>
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
                                </ViewTransportMetricRow>
                                <ViewTimestampLabel
                                  updatedAt={item.updatedAt}
                                />
                              </Col>
                            </ViewTransportItemRow>
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
