import { createStateBox, task, VIEW_STATUS } from '@z1/lib-feature-box'
// schema
import { uiBoxSchema } from './schema'
// main
export const screenCmdState = task((t, a) =>
  createStateBox({
    name: 'screenCmd',
    initial: {
      status: VIEW_STATUS.INIT,
      cmd: null,
      form: uiBoxSchema({}),
    },
    mutations(m) {
      return [
        m(['ROUTE_HOME'], (state, action) => {
          return t.merge(state, {
            status: VIEW_STATUS.LOADING,
          })
        }),
        m(['INIT'], (state, action) => {
          return t.merge(state, {
            status: VIEW_STATUS.READY,
            cmd: action.payload,
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
            } else {
              dispatch(box.mutations.init(screenCmdResult.data))
            }
            done()
          }
        ),
      ]
    },
  })
)
