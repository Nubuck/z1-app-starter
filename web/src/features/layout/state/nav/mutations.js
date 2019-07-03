import { task } from '@z1/lib-feature-box'

// tasks
import {
  isPathInTopSchema,
  topSchemaWithoutPath,
  updateSchemaInPlace,
  calcPrimaryLeft,
  calcSecondaryLeft,
  calcBodyLeft,
  calcBodySpacing,
  calcPageLeft,
} from './tasks'

// main
export const mutations = task(t => m => {
  return [
    m(['navSchemaAdd'], (state, action) => {
      return t.merge(state, {
        schema: t.concat(
          state.schema,
          t.filter(
            schemaItem =>
              t.not(isPathInTopSchema(schemaItem.path, state.schema || [])),
            t.pathOr([], ['payload', 'schema'], action)
          ) || []
        ),
      })
    }),
    m(['navSchemaUpdate'], (state, action) => {
      return t.merge(state, {
        schema: updateSchemaInPlace(
          t.pathOr([], ['payload', 'schema'], action),
          state.schema
        ),
      })
    }),
    m(['navSchemaRemove'], (state, action) => {
      return t.merge(state, {
        schema: topSchemaWithoutPath(
          t.pathOr([], ['payload', 'schema'], action),
          state.schema
        ),
      })
    }),
    m(['navChange'], (state, action) => {
      const status = t.pathOr(state.status, ['payload', 'status'], action)
      const bodyHeight = t.pathOr(
        state.body.height,
        ['payload', 'height'],
        action
      )
      const size = t.pathOr(state.size, ['payload', 'size'], action)
      const width = t.pathOr(state.width, ['payload', 'width'], action)
      const secondaryItems = t.pathOr([], ['secondary', 'items'], state)
      const pageItems = t.pathOr([], ['page', 'items'], state)
      const bodyItems = t.pathOr([], ['body', 'items'], state)
      const bodyActions = t.pathOr([], ['body', 'actions'], state)
      const body = t.concat(bodyItems, bodyActions)
      const pageStatus = t.pathOr(
        state.page.status,
        ['payload', 'pageStatus'],
        action
      )
      const bottom = calcBodySpacing('bottom', body, size, bodyHeight)
      const top = calcBodySpacing('top', body, size, bodyHeight)
      return t.merge(state, {
        status,
        width,
        size,
        title: t.pathOr(state.title, ['payload', 'title'], action),
        mode: t.pathOr(state.mode, ['payload', 'mode'], action),
        primary: t.merge(state.primary, {
          left: calcPrimaryLeft(
            status,
            t.concat(state.primary.items, state.primary.actions)
          ),
          bottom,
        }),
        secondary: t.merge(state.secondary, {
          left: calcSecondaryLeft(status, secondaryItems),
          bottom,
        }),
        body: t.merge(state.body, {
          height: bodyHeight,
          left: calcBodyLeft(
            status,
            size,
            width,
            t.not(t.isZeroLen(pageItems))
          ),
          navLeft: calcBodyLeft(status, size, width),
          top,
          bottom,
        }),
        page: t.merge(state.page, {
          status: pageStatus,
          left: calcPageLeft(status, size, width, pageStatus),
          top,
          bottom,
        }),
      })
    }),
    m(['navMatch'], (state, action) => {
      const width = t.pathOr(state.width, ['payload', 'width'], action)
      const primaryItems = t.pathOr(
        state.primary.items,
        ['payload', 'primary', 'items'],
        action
      )
      const primaryActions = t.pathOr(
        state.primary.actions,
        ['payload', 'primary', 'actions'],
        action
      )
      const secondaryItems = t.pathOr(
        state.secondary.items,
        ['payload', 'secondary', 'items'],
        action
      )
      const bodyItems = t.pathOr(
        state.body.items,
        ['payload', 'body', 'items'],
        action
      )
      const bodyActions = t.pathOr(
        state.body.actions,
        ['payload', 'body', 'actions'],
        action
      )
      const body = t.concat(bodyItems, bodyActions)
      const pageItems = t.pathOr(
        state.page.items,
        ['payload', 'page', 'items'],
        action
      )
      const pageStatus = t.isZeroLen(pageItems) ? 'closed' : state.page.status
      const bottom = calcBodySpacing(
        'bottom',
        body,
        state.size,
        state.body.height
      )
      const top = calcBodySpacing('top', body, state.size, state.body.height)
      return t.merge(state, {
        width,
        title: t.pathOr(state.title, ['payload', 'title'], action),
        mode: t.pathOr(state.mode, ['payload', 'mode'], action),
        matched: t.pathOr(state.matched, ['payload', 'matched'], action),
        primary: t.merge(state.primary, {
          left: calcPrimaryLeft(
            state.status,
            t.concat(primaryItems, primaryActions)
          ),
          bottom,
          items: primaryItems,
          actions: primaryActions,
        }),
        secondary: t.merge(state.secondary, {
          left: calcSecondaryLeft(state.status, secondaryItems),
          bottom,
          items: secondaryItems,
        }),
        body: t.merge(state.body, {
          left: calcBodyLeft(
            state.status,
            state.size,
            width,
            t.not(t.isZeroLen(pageItems))
          ),
          navLeft: calcBodyLeft(state.status, state.size, width),
          top,
          bottom,
          items: bodyItems,
          actions: t.pathOr(
            state.body.actions,
            ['payload', 'body', 'actions'],
            action
          ),
        }),
        page: t.merge(state.page, {
          status: pageStatus,
          left: calcPageLeft(state.status, state.size, width, pageStatus),
          top,
          bottom,
          items: pageItems,
        }),
      })
    }),
    m('navToggleStatus', (state, action) => {
      const target = t.pathOr('nav', ['payload', 'target'], action)
      const status = t.eq('nav', target)
        ? t.eq(state.status, 'open')
          ? 'closed'
          : 'open'
        : state.status
      const pageStatus = t.not(t.eq('nav', target))
        ? t.eq(state.page.status, 'open')
          ? 'closed'
          : 'open'
        : t.eq(status, 'open')
        ? 'closed'
        : state.page.status
      const nextStatus = t.and(
        t.not(t.eq('nav', target)),
        t.eq(pageStatus, 'open')
      )
        ? 'closed'
        : status
      const pageItems = t.pathOr([], ['page', 'items'], state)
      const body = t.concat(state.body.items, state.body.actions)
      const bottom = calcBodySpacing(
        'bottom',
        body,
        state.size,
        state.body.height
      )
      const top = calcBodySpacing('top', body, state.size, state.body.height)
      return t.merge(state, {
        status: nextStatus,
        primary: t.merge(state.primary, {
          left: calcPrimaryLeft(
            nextStatus,
            t.concat(state.primary.items, state.primary.actions)
          ),
          bottom,
        }),
        secondary: t.merge(state.secondary, {
          left: calcSecondaryLeft(nextStatus, state.secondary.items),
          bottom,
        }),
        body: t.merge(state.body, {
          left: calcBodyLeft(
            nextStatus,
            state.size,
            state.width,
            t.not(t.isZeroLen(pageItems))
          ),
          navLeft: calcBodyLeft(nextStatus, state.size, state.width),
          top,
          bottom,
        }),
        page: t.merge(state.page, {
          status: pageStatus,
          left: calcPageLeft(nextStatus, state.size, state.width, pageStatus),
          top,
          bottom,
        }),
      })
    }),
  ]
})
