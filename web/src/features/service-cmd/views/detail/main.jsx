import React from 'react'
import { task, VIEW_STATUS } from '@z1/lib-feature-box'
import { createView, VIEW_LIFECYCLE } from '@z1/lib-feature-macros'
import bytes from 'bytes'

// main
export const detail = task((t, a) =>
  createView('detail', {
    state: {
      data({ type, status, viewData, nextData, error }) {
        if (t.eq(type, VIEW_LIFECYCLE.INIT)) {
          return {
            status: VIEW_STATUS.WAITING,
            data: {
              service: null,
              logs: [],
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
          const nextLogs = t.pathOr([], ['logs'], nextData.service || {})
          return {
            status,
            data: t.merge(viewData, {
              service: t.omit(['logs'], nextData.service || {}),
              logs: t.isZeroLen(nextLogs) ? viewData.logs : nextLogs,
            }),
            error,
          }
        }
        if (
          t.and(
            t.eq(type, VIEW_LIFECYCLE.DATA_CHANGE),
            t.not(t.isNil(t.pathOr(null, ['log', 'id'], nextData || {})))
          )
        ) {
          return {
            status,
            data: t.merge(viewData, {
              logs: t.concat(viewData.logs, [nextData.log]),
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
      async load({ status, api, detailKey }) {
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
        const nextLogs = t.pathOr(null, ['logs'], cmdResult)
        return {
          status,
          data: {
            service: t.omit(['logs'], cmdResult),
            logs: nextLogs,
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
                  setup: 'installing',
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
      HStack,
      VStack,
      Spacer,
      Row,
      Col,
      Text,
      ViewHeader,
      ViewMetric,
      TransportButton,
      TransportStatusIcon,
      TransportStatusLabel,
      DateLabel,
      AutoSizer,
      List,
    }) => {
      const metricProps = (status, color, secondary = null) => ({
        xs: 6,
        md: 4,
        xl: 4,
        size: 'md',
        textBox: {
          padding: [{ right: 2, top: 0 }, { xl: { top: 1 } }],
        },
        box: { padding: { y: 2 } },
        color: t.eq(status, 'online') ? color : secondary,
      })
      const folderProps = (status, color) => ({
        xs: 12,
        size: 'sm',
        textBox: {
          padding: [{ right: 2, top: 2 }, { xl: { top: 1 } }],
          fontSize: ['sm', { xl: 'lg' }],
        },
        box: {
          padding: [{ x: 0, bottom: 2 }, { md: { x: 0, bottom: 2, top: 0 } }],
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
        const busy = t.anyOf([
          t.eq(actionStatus, 'launching'),
          t.eq(actionStatus, 'stopping'),
          t.eq(actionStatus, 'running'),
        ])
        const logList = t.pathOr([], ['data', 'logs'], state)
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
                          padding: [
                            { top: 3, bottom: 1, x: 4 },
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
                          onSetup={() =>
                            mutations.formTransmit({
                              data: {
                                id,
                                action: 'setup',
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
                          padding: [{ top: 3, x: 4 }, { md: { top: 6, x: 4 } }],
                        }}
                      >
                        <Col
                          xs={12}
                          md={6}
                          xl={5}
                          box={{
                            padding: [{ bottom: 4 }, { md: { bottom: 0 } }],
                          }}
                        >
                          <Row box={{ flexWrap: true }}>
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
                              icon="folder-o"
                              label="folder status"
                              color={
                                t.eq(
                                  t.pathOr(
                                    '...',
                                    ['data', 'service', 'folderStatus'],
                                    state
                                  ),
                                  'deleted'
                                )
                                  ? 'red-500'
                                  : 'blue-500'
                              }
                              text={`${t.pathOr(
                                '...',
                                ['data', 'service', 'folderStatus'],
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
                          <Col xs={12}>
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
                                  opacity: 50,
                                  margin: { y: 2 },
                                  padding: { left: 0, right: 0 },
                                })
                              }
                            />
                          </Col>
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
                        <Col
                          xs={12}
                          md={6}
                          xl={7}
                          box={{
                            flex: 1,
                            height: ['screen', { md: 'auto' }],
                          }}
                        >
                          <ViewHeader
                            title="Log"
                            text="output"
                            icon="newspaper-o"
                            size="sm"
                            box={{ padding: { bottom: 3 } }}
                          />
                          <VStack box={{ flex: 1 }}>
                            <AutoSizer>
                              {({ width, height }) => (
                                <List
                                  width={width}
                                  height={height}
                                  rowCount={t.length(logList)}
                                  rowHeight={({ index }) => {
                                    const item = logList[index]
                                    return t.gt(t.length(item.line), 80)
                                      ? t.length(item.line) / 1.9
                                      : 26
                                  }}
                                  scrollToIndex={
                                    t.gt(t.length(logList), 0)
                                      ? t.length(logList) - 1
                                      : undefined
                                  }
                                  rowRenderer={({ index, key, style }) => {
                                    const item = logList[index]
                                    return (
                                      <HStack key={key} style={style}>
                                        <Text
                                          size="sm"
                                          color={
                                            t.eq(item.type, 'err')
                                              ? 'red-500'
                                              : 'green-500'
                                          }
                                        >{`${item.line}`}</Text>
                                      </HStack>
                                    )
                                  }}
                                />
                              )}
                            </AutoSizer>
                          </VStack>
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
