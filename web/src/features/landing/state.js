import { task, createStateBox } from '@z1/lib-feature-box'
import { navSchema } from '@z1/lib-ui-schema'

// nav
const homeSchema = navSchema(n => [
  n('//', { icon: 'home-outline', title: 'Home' }, [
    n(
      '/activity',
      {
        icon: 'activity-outline',
        title: 'Activity',
        alert: { color: 'red-500', icon: 'bell-outline' },
      },
      [
        n(
          '/activity/popular/favourites',
          {
            target: 'body',
            icon: 'heart-outline',
            title: 'Favourites',
            exact: true,
            size: 'xl',
          },
          [
            n('/activity/popular/followers', {
              target: 'body',
              icon: 'flash-outline',
              title: 'Followers',
              exact: true,
              size: 'xl',
            }),
          ]
        ),
        n('/activity/popular/latest', {
          target: 'body',
          icon: 'flash-outline',
          title: 'Latest',
          exact: true,
          size: 'xl',
        }),
        n('/activity/search', {
          target: 'body-action',
          icon: 'search-outline',
          title: 'Search',
          exact: true,
          size: 'xl',
          color: 'gray-500',
        }),
        n('/activity/popular', { icon: 'globe-2-outline', title: 'Popular' }),
      ]
    ),
    n('/discover', { icon: 'radio-outline', title: 'Discover' }),
    n('/collections', { icon: 'grid-outline', title: 'Collections' }),
  ]),
  n('/screen-cmd/view-editor', { icon: 'code-outline', title: 'Screen CMD' }),
  n('/accounts', { icon: 'people-outline', title: 'Accounts' }),
  n('#', {
    target: 'primary-action',

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
    target: 'primary-action',
    borderWidth: 2,
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
