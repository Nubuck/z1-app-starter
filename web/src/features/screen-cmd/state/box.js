import { createStateBox, task, VIEW_STATUS } from '@z1/lib-feature-box'

// schema
// import { uiBoxSchema } from './schema'

// ctx - for development reference
import { VIEWS } from '../ctx'

// tasks
const createInitViewState = task(t => (views = {}) => {
  return t.mergeAll([
    { viewKey: null },
    {
      views: t.mergeAll(
        t.map(([_, value]) => {
          return {
            [t.caseTo.constantCase(value)]: {
              status: VIEW_STATUS.INIT,
              detailKey: null,
              data: {},
              form: {
                schema: null,
                uiSchema: null,
                data: null,
              },
            },
          }
        }, t.toPairs(views))
      ),
    },
  ])
})

const nextViewState = task(t => (state, action) => {
  const viewKey = t.caseTo.constantCase(
    t.pathOr('home', ['payload', 'view'], action)
  )
  const detailKey = t.pathOr(null, ['payload', 'detail'], action)
  return t.merge(state, {
    viewKey,
    views: t.merge(state.views, {
      [viewKey]: t.mergeAll([
        state.views[viewKey],
        { detailKey, status: VIEW_STATUS.WAITING },
        t.omit(['view', 'detail'], action.payload),
      ]),
    }),
  })
})

// main
const boxName = 'screenCmd'
export const screenCmdState = task((t, a) =>
  createStateBox({
    name: boxName,
    initial: createInitViewState(VIEWS),
    mutations(m) {
      return [
        m(['routeHome', 'routeView', 'routeViewDetail'], nextViewState),
        // m(['routeLoadSuccess', 'routeLoadFail'], (state, action) => {
        //   return t.merge(state, {
        //     status: VIEW_STATUS.READY,
        //     cmd: action.payload,
        //   })
        // }),
        // m(['formChange'], (state, action) => {
        //   return t.merge(state, {
        //     current: action.payload,
        //     data: action.payload,
        //   })
        // }),
        // m(['formSubmit'], (state, action) => {
        //   return t.merge(state, {
        //     data: action.payload,
        //   })
        // }),
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
      const matchRoute = t.globrex(`${boxName}/ROUTE_*`).regex
      return [
        g([matchRoute], async ({ getState, action }, allow, reject) => {
          const state = getState()
          // const viewKey = 
          console.log(
            'GUARD ROUTE ENTER STATE: ',
            state,
            matchRoute.test(action.type)
          )
          allow(action)
        }),
      ]
    },
    effects(fx, box) {
      return [
        fx(
          [box.actions.routeHome],
          async ({ getState, api }, dispatch, done) => {
            const state = getState()
            console.log('FX STATE: ', state)
            // const [screenCmdErr, screenCmdResult] = await a.of(
            //   api.service('screen-cmd').find()
            // )
            // if (screenCmdErr) {
            //   console.log('FX STATE ERR', screenCmdErr)
            //   dispatch(box.mutations.routeLoadFail(null))
            // } else {
            //   dispatch(box.mutations.routeLoadSuccess(screenCmdResult.data))
            // }
            done()
          }
        ),
      ]
    },
  })
)
