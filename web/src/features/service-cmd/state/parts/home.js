import { task } from '@z1/lib-feature-box'

// main
export const homeCmd = task((t, _, r) => ({
  initial: {
    homeSubsribed: false,
  },
  mutations(m) {
    return [
      m(['homeSub', 'homeUnsub'], (state, action) =>
        t.merge(state, { homeSubsribed: action.payload })
      ),
    ]
  },
  effects(fx, { mutations, actions }) {
    return [
      fx(
        actions.routeHome,
        ({ action$, cancelled$ }, dispatch, done) => {
          dispatch(mutations.homeSub(true))
          action$
            .pipe(
              r.filter(action =>
                t.and(
                  t.eq(action.type, actions.exitRoute),
                  t.eq(action.payload.route, actions.routeHome)
                )
              ),
              r.tap(() => {
                dispatch(mutations.homeUnsub(false))
                done()
              }),
              r.takeUntil(cancelled$)
            )
            .subscribe()
        },
        {
          cancelType: actions.homeUnsub,
          warnTimeout: 0,
          latest: true,
        }
      ),
      fx(
        actions.homeSub,
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
          cancelType: actions.homeUnsub,
          warnTimeout: 0,
          latest: true,
        }
      ),
    ]
  },
}))
