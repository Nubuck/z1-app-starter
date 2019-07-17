import React from 'react'
import { task, VIEW_STATUS } from '@z1/lib-feature-box'
import { createView, VIEW_LIFECYCLE } from '@z1/lib-feature-macros'
import bytes from 'bytes'

// tasks
const metricProps = task(t => (status, color) => ({
  xs: 6,
  sm: 3,
  md: 4,
  xl: 2,
  size: 'md',
  textBox: {
    padding: [{ right: 2, top: 0 }, { xl: { top: 3 } }],
  },
  color: t.eq(status, 'online') ? color : null,
}))

// main
export const detail = task((t, a) =>
  createView('detail', {
    state: {
      data({ type, status, viewData, nextData, formData, error }) {
        if (t.eq(type, VIEW_LIFECYCLE.INIT)) {
          return {
            status: VIEW_STATUS.WAITING,
            data: {
              service: null,
            },
            error: null,
          }
        }
        if (
          t.and(
            t.eq(type, VIEW_LIFECYCLE.DATA_CHANGE),
            t.eq(
              t.pathOr('detail', ['service', '_id'], viewData),
              t.pathOr(null, ['item', '_id'], nextData || {})
            )
          )
        ) {
          return {
            status,
            data: t.merge(viewData, {
              service: nextData.item || {},
            }),
            error,
          }
        }
        return {
          status,
          data: t.merge(
            viewData,
            t.omit(['item', 'event', 'detail', 'view', 'more'], nextData || {})
          ),
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
        dispatch(
          mutations.dataChange({
            status: VIEW_STATUS.READY,
            data: {
              service: t.merge(viewData.service || {}, {
                actionStatus: t.getMatch(formData.action)({
                  start: 'launching',
                  stop: 'stopping',
                  restart: 'launcing',
                }),
                action: formData.action,
              }),
            },
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
      Match,
      When,
      MapIndexed,
      HStack,
      VStack,
      Spacer,
      Row,
      Col,
      ViewHeader,
      ViewMetric,
      TransportButton,
      TransportStatusIcon,
      TransportTitle,
      TransportStatusLabel,
      TimestampLabel,
    }) => ({ state, mutations }) => {
      const id = t.pathOr(null, ['data', 'service', '_id'], state)
      const status = t.pathOr('init', ['data', 'service', 'status'], state)
      const actionStatus = t.pathOr(
        null,
        ['data', 'service', 'actionStatus'],
        state
      )
      const busy = t.or(
        t.eq(actionStatus, 'launching'),
        t.eq(actionStatus, 'stopping')
      )
      const primaryMetricProps = metricProps(status, 'green-500')
      const secondaryMetricProps = metricProps(status, 'teal-500')
      return (
        <ViewContainer>
          <Match
            value={state.status}
            when={{
              _: <ViewSpinner />,
              ready: (
                <React.Fragment>
                  <When is={t.not(t.isNil(id))}>
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
                      <TransportStatusLabel
                        status={status}
                        busy={busy}
                        uptime={t.pathOr(
                          null,
                          ['data', 'service', 'uptime'],
                          state
                        )}
                        box={{ padding: { left: 0, right: 2, y: 0 } }}
                      />
                      <TransportStatusIcon
                        y="center"
                        status={status}
                        busy={busy}
                        spacing={false}
                        action={t.pathOr(
                          null,
                          ['data', 'service', 'action'],
                          state
                        )}
                        next={ui => ui.next({ display: 'flex' })}
                      />
                      <TransportButton
                        busy={busy}
                        status={status}
                        onStart={() =>
                          mutations.formTransmit({
                            data: {
                              id,
                              action: 'start',
                            },
                          })
                        }
                        onStop={() =>
                          mutations.formTransmit({
                            data: {
                              id,
                              action: 'stop',
                            },
                          })
                        }
                      />
                    </Row>
                    <Row box={{ flexWrap: true, padding: { y: 6 } }}>
                      <ViewMetric
                        {...primaryMetricProps}
                        icon="rotate-right"
                        label="restarts"
                        text={`x${t.pathOr(
                          '0',
                          ['data', 'service', 'restarts'],
                          state
                        )}`}
                      />
                      <ViewMetric
                        {...primaryMetricProps}
                        icon="hdd-o"
                        label="CPU"
                        text={`${t.pathOr(
                          '0',
                          ['data', 'service', 'cpu'],
                          state
                        )}%`}
                      />
                      <ViewMetric
                        {...primaryMetricProps}
                        icon="database"
                        label="memory"
                        text={`${t.caseTo.lowerCase(
                          bytes(
                            t.pathOr(0, ['data', 'service', 'memory'], state)
                          )
                        )}`}
                      />
                      <ViewMetric
                        {...secondaryMetricProps}
                        icon="gears"
                        label="pm2id"
                        text={`${t.pathOr(
                          'none',
                          ['data', 'service', 'pmId'],
                          state
                        )}`}
                      />
                      <ViewMetric
                        {...secondaryMetricProps}
                        icon="barcode"
                        label="pid"
                        text={`${t.pathOr(
                          '0',
                          ['data', 'service', 'pid'],
                          state
                        )}`}
                      />
                      <ViewMetric
                        {...secondaryMetricProps}
                        icon="terminal"
                        label="interpreter"
                        text={`${t.pathOr(
                          'none',
                          ['data', 'service', 'interpreter'],
                          state
                        )}`}
                      />
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
