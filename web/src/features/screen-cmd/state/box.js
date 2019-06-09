import { createStateBox, task, VIEW_STATUS } from '@z1/lib-feature-box'

// schema
import { uiBoxSchema } from './schema'

// tasks

// main
export const screenCmdState = task((t, a) =>
  createStateBox({
    name: 'screenCmd',
    initial: {
      status: VIEW_STATUS.INIT,
      cmd: null,
      form: uiBoxSchema,
      data: {},
      current: {},
    },
    mutations(m) {
      return [
        m(['routeHome'], (state, action) => {
          return t.merge(state, {
            status: VIEW_STATUS.LOADING,
          })
        }),
        m(['routeLoadSuccess', 'routeLoadFail'], (state, action) => {
          return t.merge(state, {
            status: VIEW_STATUS.READY,
            cmd: action.payload,
          })
        }),
        m(['formChange'], (state, action) => {
          return t.merge(state, {
            current: action.payload,
            data: action.payload,
          })
        }),
        m(['formSubmit'], (state, action) => {
          return t.merge(state, {
            data: action.payload,
          })
        }),
      ]
    },
    routes(r, actions) {
      return [
        r(actions.routeHome, '/', {
          authenticate: false,
        }),
      ]
    },
    guards(g, box) {
      return [
        g(
          [box.actions.routeHome],
          async ({ getState, action }, allow, reject) => {
            const state = getState()
            console.log('GUARD STATE: ', state)
            allow(action)
          }
        ),
      ]
    },
    effects(fx, box) {
      return [
        fx(
          [box.actions.routeHome],
          async ({ getState, api }, dispatch, done) => {
            const state = getState()
            console.log('FX STATE: ', state)
            const [screenCmdErr, screenCmdResult] = await a.of(
              api.service('screen-cmd').find()
            )
            if (screenCmdErr) {
              console.log('FX STATE ERR', screenCmdErr)
              dispatch(box.mutations.routeLoadFail(null))
            } else {
              dispatch(box.mutations.routeLoadSuccess(screenCmdResult.data))
            }
            done()
          }
        ),
      ]
    },
  })
)
