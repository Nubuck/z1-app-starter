import { task } from '@z1/lib-feature-box'

// main
export const cmd = task((t, a, r) => ({
  initial: {
    subbed: false,
  },
  mutations(m) {
    return [
      m(['sub', 'unsub'], (state, action) =>
        t.merge(state, { subbed: action.payload })
      ),
    ]
  },
  effects(fx, { mutations, actions }) {
    return [
      fx(
        actions.routeHome,
        ({ action$, cancelled$ }, dispatch, done) => {
          dispatch(mutations.sub(true))
          action$
            .pipe(
              r.filter(action =>
                t.and(
                  t.eq(action.type, actions.exitRoute),
                  t.eq(action.payload.route, actions.routeHome)
                )
              ),
              r.tap(() => {
                dispatch(mutations.unsub(false))
                done()
              }),
              r.takeUntil(cancelled$)
            )
            .subscribe()
        },
        {
          cancelType: actions.unsub,
          warnTimeout: 0,
          latest: true,
        }
      ),
      fx(
        actions.sub,
        ({ api }) => {
          const patched$ = r.fromEvent(api.service('service-cmd'), 'patched')
          const created$ = r.fromEvent(api.service('service-cmd'), 'created')
          return patched$.pipe(
            r.merge(
              created$.pipe(
                r.map(created => ({
                  data: { item: created, event: 'created' },
                }))
              )
            ),
            r.map(patchedOrCreated =>
              t.eq(
                t.pathOr(null, ['data', 'event'], patchedOrCreated),
                'created'
              )
                ? mutations.dataChange(patchedOrCreated)
                : mutations.dataChange({
                    data: { item: patchedOrCreated, event: 'patched' },
                  })
            )
          )
        },
        {
          cancelType: actions.unsub,
          warnTimeout: 0,
          latest: true,
        }
      ),
    ]
  },
}))
