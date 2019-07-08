import { task, createStateBox } from '@z1/lib-feature-box'

// main
export const landingState = task((t, a) =>
  createStateBox({
    name: 'landing',
    initial: {},
    mutations(m) {
      return [
        m(['routeHome', 'routeView'], (state, action) => {
          return state
        }),
      ]
    },
    routes(r, a) {
      return [
        r(a.routeHome, '/', { authenticate: false }),
        r(a.routeView, '/pages/:view', { authenticate: false }),
      ]
    },
    effects(fx, box) {
      return [
        fx(
          [box.actions.routeHome],
          async ({ getState, redirect }, dispatch, done) => {
            const accountStatus = t.pathOr(
              null,
              ['account', 'status'],
              getState()
            )
            if (t.eq(accountStatus, 'auth-success')) {
              dispatch(
                redirect({
                  type: 'serviceCmd/ROUTE_HOME',
                  payload: {
                    view: 'home',
                  },
                })
              )
            }
            done()
          }
        ),
      ]
    },
  })
)
