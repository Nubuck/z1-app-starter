import { task } from '@z1/lib-feature-box'

// main
export const cmd = task((t, a, r) => ({
  effects(fx, { mutations, actions }) {
    return [
      fx(
        actions.routeHome,
        ({ api }) => {
          const patched$ = r.fromEvent(api.service('service-cmd'), 'patched')
          const created$ = r.fromEvent(api.service('service-cmd'), 'created')
          return patched$.pipe(
            r.merge(created$),
            r.map(ev => mutations.dataChange({ data: { item: ev } }))
          )
        },
        {
          cancelType: actions.routeExit,
          warnTimeout: 0,
          latest: true,
        }
      ),
    ]
  },
}))
