import React from 'react'
import { task } from '@z1/lib-feature-box'
import bytes from 'bytes'

// tasks
import { itemMetricProps } from './tasks'

// main
export const elements = task(
  t => ({
    ViewHeader,
    MapIndexed,
    VStack,
    HStack,
    Select,
    Input,
    Spacer,
    Icon,
    Button,
    Row,
    Col,
    ViewMetric,
    TransportButton,
    TransportItemRow,
    TransportItemMetricRow,
    TransportStatusIcon,
    TransportTitle,
    TransportStatusLabel,
    TimestampLabel,
    Value,
  }) => ({
    ViewToolbar({
      title,
      text,
      icon,
      search,
      sortBy,
      sortFields,
      sortDirection,
      onDataChange,
    }) {
      return (
        <Row
          y="center"
          x="right"
          box={{
            flexWrap: true,
            padding: { bottom: 2, x: 4 },
          }}
          className="form-dark"
        >
          <VStack
            y="center"
            box={{
              padding: { top: 4, bottom: 2 },
              width: ['full', { lg: 'auto' }],
            }}
          >
            <ViewHeader title={title} text={text} icon={icon} size="md" />
          </VStack>
          <Spacer />
          <Value
            defaultValue={{
              searchKey: search,
              sortByKey: sortBy,
              sortDirectionKey: sortDirection,
            }}
            onChange={t.throttle(
              ({ searchKey, sortByKey, sortDirectionKey }) => {
                onDataChange &&
                  onDataChange({
                    data: {
                      search: searchKey,
                      sortBy: sortByKey,
                      sortDirection: sortDirectionKey,
                    },
                  })
              },
              200
            )}
            render={({ searchKey, sortByKey, sortDirectionKey }, onChange) => {
              return (
                <React.Fragment>
                  <VStack
                    y="center"
                    box={{
                      padding: { top: 3, bottom: 2 },
                      width: ['full', { md: 'auto' }],
                    }}
                  >
                    <HStack y="center">
                      <Icon
                        name="search"
                        size="2xl"
                        box={{ margin: [{ right: 2 }, { md: { left: 2 } }] }}
                      />
                      <Input
                        placeholder="Search..."
                        value={searchKey || ''}
                        onChange={t.throttle(
                          event =>
                            onChange({
                              searchKey: event.target.value,
                              sortByKey,
                              sortDirectionKey,
                            }),
                          100
                        )}
                      />
                    </HStack>
                  </VStack>
                  <VStack
                    y="center"
                    box={{
                      padding: { top: 3, bottom: 2 },
                      width: ['full', { md: 'auto' }],
                    }}
                  >
                    <HStack y="center">
                      <Icon
                        name="sort"
                        size="2xl"
                        box={{ margin: [{ right: 2 }, { md: { left: 2 } }] }}
                      />
                      <Select
                        box={{ margin: { right: 2 } }}
                        value={sortByKey || 'status'}
                        onChange={event =>
                          onChange({
                            searchKey,
                            sortByKey: event.target.value,
                            sortDirectionKey,
                          })
                        }
                      >
                        <MapIndexed
                          list={sortFields || []}
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
                        disabled={t.eq(sortDirectionKey, 'asc')}
                        color={[
                          t.eq(sortDirectionKey, 'asc') ? 'green-500' : null,
                          {
                            hover: t.eq(sortDirectionKey, 'asc')
                              ? null
                              : 'yellow-500',
                          },
                        ]}
                        box={{ padding: { x: 1 } }}
                        onClick={() =>
                          onChange({
                            searchKey,
                            sortByKey,
                            sortDirectionKey: 'asc',
                          })
                        }
                      >
                        <Icon name="sort-amount-asc" size="2xl" />
                      </Button>
                      <Button
                        radius="full"
                        size="sm"
                        disabled={t.eq(sortDirectionKey, 'desc')}
                        color={[
                          t.eq(sortDirectionKey, 'desc') ? 'green-500' : null,
                          {
                            hover: t.eq(sortDirectionKey, 'desc')
                              ? null
                              : 'yellow-500',
                          },
                        ]}
                        box={{ padding: { x: 1 } }}
                        onClick={() =>
                          onChange({
                            searchKey,
                            sortByKey,
                            sortDirectionKey: 'desc',
                          })
                        }
                      >
                        <Icon name="sort-amount-desc" size="2xl" />
                      </Button>
                    </HStack>
                  </VStack>
                </React.Fragment>
              )
            }}
          />
        </Row>
      )
    },
    TransportItem({ item, onTransport }) {
      const busy = t.or(
        t.eq(item.actionStatus, 'launching'),
        t.eq(item.actionStatus, 'stopping')
      )
      const primaryMetricProps = itemMetricProps(item.status, 'green-500')
      const secondaryMetricProps = itemMetricProps(item.status, 'teal-500')
      return (
        <TransportItemRow status={item.status} busy={busy}>
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={5}
            xl={4}
            box={{
              padding: [{ bottom: 2 }, { md: { right: 6 } }],
              margin: [{ x: -2 }, { md: { x: 0 } }],
            }}
          >
            <HStack y="top">
              <TransportButton
                busy={busy}
                status={item.status}
                onStart={() =>
                  onTransport &&
                  onTransport({
                    data: {
                      id: item._id,
                      action: 'start',
                    },
                  })
                }
                onStop={() =>
                  onTransport &&
                  onTransport({
                    data: {
                      id: item._id,
                      action: 'stop',
                    },
                  })
                }
              />
              <TransportStatusIcon
                status={item.status}
                busy={busy}
                action={item.action}
                spacing={true}
              />
              <TransportTitle
                name={item.name}
                version={item.version}
                autoStart={item.autoStart}
                status={item.status}
                busy={busy}
                instances={item.instances}
                to={`/service-cmd/detail/${item._id}`}
              />
            </HStack>
            <TransportStatusLabel
              status={item.status}
              busy={busy}
              uptime={item.uptime}
            />
          </Col>
          <Col xs={12} sm={12} md={6} lg={7} xl={8}>
            <TransportItemMetricRow status={item.status}>
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
                text={`${t.caseTo.lowerCase(bytes(item.memory || 0))}`}
              />
              <ViewMetric
                {...secondaryMetricProps}
                icon="gears"
                label="pm2id"
                text={`${t.isNil(item.pmId) ? 'none' : item.pmId}`}
              />
              <ViewMetric
                {...secondaryMetricProps}
                icon="barcode"
                label="pid"
                text={`${t.isNil(item.pid) ? 'none' : item.pid}`}
              />
              <ViewMetric
                {...secondaryMetricProps}
                icon="terminal"
                label="interpreter"
                text={`${item.interpreter || 'none'}`}
              />
            </TransportItemMetricRow>
            <TimestampLabel updatedAt={item.updatedAt} />
          </Col>
        </TransportItemRow>
      )
    },
  })
)
