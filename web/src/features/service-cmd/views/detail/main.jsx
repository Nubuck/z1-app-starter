import React from 'react'
import { task, VIEW_STATUS } from '@z1/lib-feature-box'
import { createView, VIEW_LIFECYCLE } from '@z1/lib-feature-macros'
import bytes from 'bytes'

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
              t.pathOr(null, ['service', '_id'], nextData || {})
            )
          )
        ) {
          return {
            status,
            data: t.merge(viewData, {
              service: nextData.service || {},
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
      Text,
      ViewHeader,
      ViewMetric,
      ViewIconLabel,
      TransportButton,
      TransportStatusIcon,
      TransportTitle,
      TransportStatusLabel,
      TimestampLabel,
      DateLabel,
    }) => {
      const metricProps = (status, color, secondary = null) => ({
        xs: 6,
        md: 4,
        xl: 3,
        size: 'md',
        textBox: {
          padding: [{ right: 2, top: 0 }, { xl: { top: 3 } }],
        },
        box: { padding: { y: 4 } },
        color: t.eq(status, 'online') ? color : secondary,
      })
      const folderProps = (status, color) => ({
        xs: 12,
        size: 'sm',
        textBox: {
          padding: [{ right: 2, top: 2 }, { xl: { top: 2 } }],
        },
        box: {
          padding: [{ x: 0, bottom: 4 }, { md: { x: 4, bottom: 4, top: 1 } }],
        },
        color: t.eq(status, 'online') ? color : 'blue-600',
      })
      return ({ state, mutations }) => {
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
        const primaryMetricProps = metricProps(status, 'green-500', 'gray-500')
        const secondaryMetricProps = metricProps(status, 'teal-500', 'teal-700')
        const folderMetricProps = folderProps(status, 'blue-500')
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
                        y="center"
                        x="right"
                        box={{
                          flexWrap: true,
                          shadow: 'md',
                          padding: [
                            { top: 3, bottom: 2, x: 4 },
                            { lg: { top: 0, bottom: 0 } },
                          ],
                        }}
                        className="form-dark"
                      >
                        <VStack
                          y="center"
                          box={{ width: ['full', { lg: 'auto' }] }}
                        >
                          <HStack
                            y="center"
                            box={{ flexWrap: true, padding: 0 }}
                          >
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
                            <Text
                              y="center"
                              as={VStack}
                              weight="thin"
                              box={{
                                padding: { left: 0, top: 2 },
                              }}
                            >
                              {`v${t.pathOr(
                                '0.0.0',
                                ['data', 'service', 'version'],
                                state
                              )}`}
                            </Text>
                          </HStack>
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
                          next={ui =>
                            ui.next({
                              flexDirection: 'row',
                              width: [20, { xl: 24 }],
                              padding: { right: 4, left: 0 },
                            })
                          }
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
                      <Row
                        box={{
                          flexWrap: true,
                          padding: [{ y: 4, x: 4 }, { md: { y: 6, x: 4 } }],
                        }}
                      >
                        <Col xs={12} md={6}>
                          <Row box={{ flexWrap: true }}>
                            <Col xs={12}>
                              <TimestampLabel
                                updatedAt={t.pathOr(
                                  null,
                                  ['data', 'service', 'updatedAt'],
                                  state
                                )}
                                size="md"
                                iconSize="xl"
                                next={ui =>
                                  ui.next({
                                    opacity: 1,
                                    margin: [
                                      { top: 3, bottom: 6 },
                                      { top: 4, bottom: 4 },
                                    ],
                                    padding: 0,
                                  })
                                }
                              />
                            </Col>
                            <ViewMetric
                              {...primaryMetricProps}
                              icon="clone"
                              label="instances"
                              text={`x${t.pathOr(
                                '0',
                                ['data', 'service', 'instances'],
                                state
                              )}`}
                            />
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
                                  t.pathOr(
                                    0,
                                    ['data', 'service', 'memory'],
                                    state
                                  )
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
                            <ViewMetric
                              {...secondaryMetricProps}
                              icon="wrench"
                              label="mode"
                              text={`${t.pathOr(
                                'fork',
                                ['data', 'service', 'exec_mode'],
                                state
                              )}`}
                            />
                            <ViewMetric
                              {...secondaryMetricProps}
                              icon="folder-o"
                              label="folder status"
                              text={`${t.pathOr(
                                'okay',
                                ['data', 'service', 'folderStatus'],
                                state
                              )}`}
                            />
                            <ViewMetric
                              {...secondaryMetricProps}
                              icon="flag-checkered"
                              label="autostart"
                              text={`${
                                t.not(
                                  t.pathOr(
                                    false,
                                    ['data', 'service', 'autoStart'],
                                    state
                                  )
                                )
                                  ? 'disabled'
                                  : 'active'
                              }`}
                            />
                            <ViewMetric
                              {...secondaryMetricProps}
                              icon="plug"
                              label="port"
                              text={`${t.pathOr(
                                'N/A',
                                ['data', 'service', 'port'],
                                state
                              )}`}
                            />
                            <ViewMetric
                              {...secondaryMetricProps}
                              icon="user"
                              label="username"
                              text={`${t.pathOr(
                                'current',
                                ['data', 'service', 'username'],
                                state
                              )}`}
                            />
                          </Row>
                        </Col>
                        <Col xs={12} md={6}>
                          <DateLabel
                            label="created"
                            date={t.pathOr(
                              null,
                              ['data', 'service', 'updatedAt'],
                              state
                            )}
                            size="md"
                            iconSize="xl"
                            next={ui =>
                              ui.next({
                                opacity: 1,
                                margin: { top: 4, bottom: 8 },
                                padding: [{ x: 0 }, { md: { x: 4 } }],
                              })
                            }
                          />
                          <ViewMetric
                            {...folderMetricProps}
                            icon="folder-open-o"
                            label="working directory"
                            text={`${t.pathOr(
                              '...',
                              ['data', 'service', 'meta', 'cwd'],
                              state
                            )}`}
                          />
                          <ViewMetric
                            {...folderMetricProps}
                            icon="code"
                            label="executable path"
                            text={`${t.pathOr(
                              '...',
                              ['data', 'service', 'meta', 'pm_exec_path'],
                              state
                            )}`}
                          />

                          <ViewMetric
                            {...folderMetricProps}
                            icon="terminal"
                            label="output log path"
                            text={`${t.pathOr(
                              '...',
                              ['data', 'service', 'meta', 'pm_out_log_path'],
                              state
                            )}`}
                          />
                          <ViewMetric
                            {...folderMetricProps}
                            icon="warning"
                            label="error log path"
                            text={`${t.pathOr(
                              '...',
                              ['data', 'service', 'meta', 'pm_err_log_path'],
                              state
                            )}`}
                          />
                        </Col>
                      </Row>
                    </When>
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
