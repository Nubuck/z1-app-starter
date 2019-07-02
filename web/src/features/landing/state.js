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
        r(a.routeView, '/:view', { authenticate: false }),
      ]
    },
    onInit({ dispatch }) {
      // dispatch({
      //   type: 'nav/NAV_SCHEMA_ADD',
      //   payload: {
      //     schema: homeSchema,
      //   },
      // })
    },
  })
)
