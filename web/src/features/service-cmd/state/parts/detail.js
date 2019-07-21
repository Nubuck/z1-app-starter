import { task } from '@z1/lib-feature-box'

// main
export const detailCmd = task((t, a, r) => ({
  initial: {
    detailSubbed: false,
  },
  mutations(m) {
    return [
      m(['detailSub', 'detailUnsub'], (state, action) =>
        t.merge(state, { detailSubbed: action.payload })
      ),
    ]
  },
  effects(fx, { mutations, actions }) {
    return [
      fx(
        actions.routeViewDetail,
        ({ action$, cancelled$ }, dispatch, done) => {
          dispatch(mutations.detailSub(true))
          action$
            .pipe(
              r.filter(action =>
                t.and(
                  t.eq(action.type, actions.exitRoute),
                  t.eq(
                    t.pathOr(null, ['payload', 'route'], action),
                    actions.routeViewDetail
                  )
                )
              ),
              r.tap(() => {
                dispatch(mutations.detailUnsub(false))
                done()
              }),
              r.takeUntil(cancelled$)
            )
            .subscribe()
        },
        {
          cancelType: actions.detailUnsub,
          warnTimeout: 0,
          latest: true,
        }
      ),
      fx(
        actions.detailSub,
        ({ getState, api }) => {
          return r.fromEvent(api.service('service-cmd'), 'patched').pipe(
            r.filter(service =>
              t.eq(
                service._id,
                t.pathOr(
                  null,
                  ['serviceCmd', 'views', 'DETAIL', 'data', 'service', '_id'],
                  getState()
                )
              )
            ),
            r.map(service =>
              mutations.dataChange({
                data: { service, event: 'patched' },
              })
            )
          )
        },
        {
          cancelType: actions.detailUnsub,
          warnTimeout: 0,
          latest: true,
        }
      ),
      fx(
        actions.detailSub,
        ({ getState, api }) => {
          return r.fromEvent(api.service('service-cmd'), 'log-pub').pipe(
            r.filter(log =>
              t.eq(
                log.id,
                t.pathOr(
                  null,
                  ['serviceCmd', 'views', 'DETAIL', 'data', 'service', '_id'],
                  getState()
                )
              )
            ),
            r.map(log =>
              mutations.dataChange({
                data: { log },
              })
            )
          )
        },
        {
          cancelType: actions.detailUnsub,
          warnTimeout: 0,
          latest: true,
        }
      ),
    ]
  },
}))
