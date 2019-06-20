import { task, VIEW_STATUS } from '@z1/lib-feature-box'

// main
export const createInitViewState = task(t => (views = {}) => {
  return {
    viewKey: null,
    route: null,
    views: t.mergeAll(
      t.map(([key, value]) => {
        const viewData = t.pathOr(null, ['data'], value)
        const makeForm = t.pathOr(null, ['form'], value)
        const nextViewData = t.isNil(viewData)
          ? {}
          : t.isType(viewData, 'Function')
          ? viewData({
              type: 'init',
              status: VIEW_STATUS.INIT,
              formData: null,
              viewData: null,
              error: null,
            })
          : viewData
        return {
          [t.caseTo.constantCase(key)]: {
            status: nextViewData.status || VIEW_STATUS.INIT,
            error: nextViewData.error || null,
            detailKey: null,
            data: nextViewData.data || {},
            form: t.isNil(makeForm)
              ? null
              : makeForm({
                  type: 'init',
                  status: nextViewData.status || VIEW_STATUS.INIT,
                  viewData: nextViewData.data,
                  formData: {},
                }),
          },
        }
      }, t.toPairs(views))
    ),
  }
})

export const nextRouteState = task(
  t => (boxName, macroProps) => (state, action) => {
    const viewKey = t.caseTo.constantCase(
      t.pathOr('home', ['payload', 'view'], action)
    )
    const detailKey = t.pathOr(null, ['payload', 'detail'], action)
    const viewProps = t.pathOr(null, [viewKey], macroProps)
    const viewData = t.pathOr(null, ['data'], viewProps || {})
    const makeForm = t.pathOr(null, ['form'], viewProps || {})
    const viewState = t.pathOr({}, ['views', viewKey], state)
    const nextViewData = t.isNil(viewData)
      ? viewState.data
      : t.isType(viewData, 'Function')
      ? viewData({
          type: 'route-enter',
          status: VIEW_STATUS.WAITING,
          formData: viewState.formData,
          viewData: viewState.data,
          error: null,
        })
      : viewData
    return t.merge(state, {
      viewKey,
      route: action.type.replace(`${boxName}/`, ''),
      views: t.merge(state.views, {
        [viewKey]: t.mergeAll([
          viewState,
          {
            detailKey,
            status: nextViewData.status || VIEW_STATUS.WAITING,
            error: null,
            data: nextViewData.data || viewState.data,
          },
          {
            form: t.isNil(makeForm)
              ? viewState.form
              : makeForm({
                  type: 'route-enter',
                  viewData: nextViewData.data || viewState.data,
                  formData: viewState.formData,
                  status: nextViewData.status || VIEW_STATUS.WAITING,
                }),
          },
        ]),
      }),
    })
  }
)

export const nextViewState = task(t => macroProps => (state, action) => {
  const data = t.pathOr(null, [state.viewKey, 'data'], macroProps)
  const form = t.pathOr(null, [state.viewKey, 'form'], macroProps)
  const formData = t.pathOr({}, [state.viewKey, 'form', 'data'], state)
  const nextViewState = t.isType(data, 'Function')
    ? t.merge(
        t.path(['views', state.viewKey], state),
        data({
          type: 'data-load-complete',
          viewData: action.payload.data,
          formData,
          status: action.payload.status,
          error: action.payload.error,
        })
      )
    : t.merge(t.path(['views', state.viewKey], state), {
        status: action.payload.status || VIEW_STATUS.READY,
        data:
          action.payload.data ||
          t.path(['views', state.viewKey, 'data'], state),
        error: action.payload.error || null,
      })
  const nextForm = t.isType(form, 'Function')
    ? form({
        type: 'data-load-complete',
        formData,
        viewData: nextViewState.data,
        status: nextViewState.status,
      })
    : t.path(['views', state.viewKey, 'form'], state)

  return t.merge(state, {
    views: t.merge(state.views, {
      [state.viewKey]: t.merge(nextViewState, { form: nextForm }),
    }),
  })
})

export const matchBoxRoutes = task(t => boxName =>
  t.globrex(`${boxName}/ROUTE_*`).regex
)

export const routeActions = task(t => actions =>
  t.filter(
    action => t.globrex('*/ROUTE_*').regex.test(action),
    t.map(([_, value]) => value, t.toPairs(actions))
  )
)
