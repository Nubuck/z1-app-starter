import React from 'react'
import { task, VIEW_STATUS } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// elements
import { elements } from './elements'

// tasks
import { computeCounts, updateServiceInList, viewMetricProps } from './tasks'

// main
export const home = task((t, a) =>
  createView('home', {
    state: {
      data({ type, status, viewData, nextData, error }) {
        if (t.eq(type, 'init')) {
          return {
            data: {
              services: [],
              computedServices: [],
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
            status: VIEW_STATUS.READY,
            data: {
              services: nextServices,
              counts: computeCounts(nextServices),
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
      MapIndexed,
      VStack,
      Row,
      ViewMetric,
      ...ui
    }) => {
      const { ViewToolbar, TransportItem } = elements({
        MapIndexed,
        VStack,
        Row,
        ViewMetric,
        ...ui,
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
                          padding: [
                            { left: 2, right: 2 },
                            { sm: { bottom: 2, left: 4 } },
                          ],
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
                        render={({ item, index }) => (
                          <TransportItem
                            key={index}
                            item={item}
                            onTransport={payload =>
                              mutations.formTransmit(payload)
                            }
                          />
                        )}
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
