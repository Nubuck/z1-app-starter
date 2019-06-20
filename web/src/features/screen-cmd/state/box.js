import { createStateBox, task, VIEW_STATUS } from '@z1/lib-feature-box'

// schema
// import { uiBoxSchema } from './schema'

// ctx - for development reference
import { VIEWS } from '../ctx'

// macros
import {
  createInitViewState,
  nextRouteState,
  nextViewState,
  matchBoxRoutes,
} from './macros'

// props
const macroProps = {
  [VIEWS.HOME]: {
    async load({ state, api, detailKey, viewData, formData, status, type }) {
      console.log('LOAD HOME DATA', viewData, formData, status, type)
      return {
        status: null,
        data: null,
        error: null,
      }
    },
    data({ viewData, formData, status, type, error }) {
      console.log('GET HOME DATA', viewData, formData, status, type, error)
      return {
        status,
        data: viewData,
        error,
      }
    },
  },
  [VIEWS.BOX_EDITOR]: {
    async load({ state, api, detailKey, viewData, formData, status, type }) {
      console.log('LOAD BOX EDITOR DATA', viewData, formData, status, type)
      return {
        status: null,
        data: null,
        error: null,
      }
    },
    data({ viewData, formData, status, type, error }) {
      console.log(
        'GET BOX EDITOR DATA',
        viewData,
        formData,
        status,
        type,
        error
      )
      return {
        status,
        data: viewData,
        error,
      }
    },
    form({ viewData, formData, status, type }) {
      console.log('GET BOX EDITOR FORM', viewData, formData, status, type)
      return {
        schema: {},
        uiSchema: {},
        data: {},
      }
    },
    async transmit({ state, api, viewData, formData, status, type }) {
      console.log('LOAD BOX EDITOR FORM', viewData, formData, status, type)
      return {
        status: null,
        data: null,
        error: null,
      }
    },
  },
  [VIEWS.VIEW_EDITOR]: {
    async load({ state, api, viewData, formData, status, type }) {
      console.log('LOAD VIEW EDITOR DATA', viewData, formData, status, type)
      return {
        status: null,
        data: null,
        error: null,
      }
    },
    data({ viewData, formData, status, type, error }) {
      console.log(
        'GET VIEW EDITOR DATA',
        viewData,
        formData,
        status,
        type,
        error
      )
      return {
        status,
        data: viewData,
        error,
      }
    },
    form({ viewData, formData, status, type }) {
      console.log('GET VIEW EDITOR FORM', viewData, formData, status, type)
      return {
        schema: {},
        uiSchema: {},
        data: {},
      }
    },
    async transmit({ state, api, viewData, formData, status, type }) {
      console.log('LOAD VIEW EDITOR FORM', viewData, formData, status, type)
      return {
        status: null,
        data: null,
        error: null,
      }
    },
  },
}

// main
const boxName = 'screenCmd'
export const screenCmdState = task((t, a) =>
  createStateBox({
    name: boxName,
    initial: createInitViewState(macroProps),
    mutations(m) {
      return [
        m(
          ['routeHome', 'routeView', 'routeViewDetail'],
          nextRouteState(boxName, macroProps)
        ),
        m(['dataLoad', 'dataLoadComplete'], nextViewState(macroProps)),
      ]
    },
    routes(r, actions) {
      return [
        r(actions.routeHome, '/', {
          authenticate: false,
        }),
        r(actions.routeView, '/:view', {
          authenticate: false,
        }),
        r(actions.routeViewDetail, '/:view/:detail', {
          authenticate: false,
        }),
      ]
    },
    guards(g, box) {
      return [
        g(
          [matchBoxRoutes(boxName)],
          async ({ getState, action }, allow, reject) => {
            const state = getState()[boxName]
            const nextRoute = action.type.replace(`${boxName}/`, '')
            console.log(
              'GUARD ROUTE ENTER STATE: ',
              state,
              t.eq(nextRoute, state.route) ? 'noop' : 'next-route'
            )
            allow(action)
          }
        ),
      ]
    },
    effects(fx, box) {
      return [
        fx(
          [matchBoxRoutes(boxName), box.actions.dataLoad],
          async ({ getState, api, action }, dispatch, done) => {
            const state = getState()[boxName]
            const viewLoad = t.pathOr(null, [state.viewKey, 'load'], macroProps)
            if (t.isNil(viewLoad)) {
              done()
            } else {
              const viewData = t.pathOr(
                {},
                ['views', state.viewKey, 'data'],
                state
              )
              const formData = t.pathOr(
                {},
                ['views', state.viewKey, 'form', 'data'],
                state
              )
              const status = t.pathOr(
                {},
                ['views', state.viewKey, 'status'],
                state
              )
              const detailKey = t.pathOr(
                {},
                ['views', state.viewKey, 'detailKey'],
                state
              )
              const type = t.eq(action.type, box.actions.dataLoad)
                ? 'data-load'
                : 'route-enter'
              const [loadError, loadResult] = await a.of(
                viewLoad({
                  state,
                  api,
                  detailKey,
                  type,
                  status,
                  viewData,
                  formData,
                })
              )
              if (loadError) {
                dispatch(
                  box.mutations.dataLoadComplete({
                    error: loadError,
                    data: null,
                    status: VIEW_STATUS.READY,
                  })
                )
              } else {
                dispatch(
                  box.mutations.dataLoadComplete({
                    error: loadResult.error || null,
                    data: loadResult.data || null,
                    status: loadResult.status || VIEW_STATUS.READY,
                  })
                )
              }
              done()
            }
          }
        ),
      ]
    },
  })
)
