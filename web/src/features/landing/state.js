import { task, createStateBox } from '@z1/lib-feature-box'
import { navSchema } from '@z1/lib-ui-schema'

// nav
const homeSchema = navSchema(n => [
  n('//', { icon: 'flash-outline', title: 'Z1 App Stater' }, [
    n('/about', { icon: 'lightbulb', title: 'About' }),
    n('/contact', { icon: 'phone', title: 'Contact' }),
  ]),
])

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
      dispatch({
        type: 'nav/NAV_SCHEMA_ADD',
        payload: {
          schema: homeSchema,
        },
      })
    },
  })
)