import { createStateBox, task, VIEW_STATUS } from '@z1/lib-feature-box'

// main
export const screenCmdState = createStateBox({
  name: 'screenCmd',
  initial: {
    status: VIEW_STATUS.INIT,
  },
  mutations(m) {
    return [
      m(
        ['ROUTE_HOME'],
        task(t => (state, action) => {
          return t.merge(state, {
            status: 'ready',
          })
        })
      ),
    ]
  },
  routes(r, actions) {
    return [
      r(actions.routeHome, '/', {
        authenticate: false,
      }),
    ]
  },
})
