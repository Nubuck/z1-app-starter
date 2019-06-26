import { task, createStateBox } from '@z1/lib-feature-box'
import { navSchema } from '@z1/lib-ui-schema'

// nav
const homeSchema = navSchema(n => [
  n('//', { icon: 'home-outline', title: 'Home' }, [
    n('/activity', {
      icon: 'activity-outline',
      title: 'Activity',
      alert: { color: 'red-500', icon: 'bell-outline' },
    }),
    n('/discover', { icon: 'radio-outline', title: 'Discover' }),
    n('/collections', { icon: 'grid-outline', title: 'Collections' }),
  ]),
  n('/chat', { icon: 'message-circle-outline', title: 'Chat' }),
  n('/accounts', { icon: 'people-outline', title: 'Accounts' }),
  n('#', {
    target: 'action',
    borderWidth: 0,
    icon: 'search-outline',
    title: 'Search',
    action: {
      type: 'landing/ROUTE_VIEW',
      payload: {
        view: 'search',
      },
    },
  }),
  n('#', {
    target: 'action',
    icon: 'person-outline',
    title: 'Profile',
    action: {
      type: 'landing/ROUTE_VIEW',
      payload: {
        view: 'profile',
      },
    },
  }),
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
