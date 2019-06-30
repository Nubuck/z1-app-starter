import { task, createStateBox, NOT_FOUND } from '@z1/lib-feature-box'
import { matchedNavItem } from '@z1/lib-ui-schema'

// tasks
import {
  isPathInTopSchema,
  topSchemaWithoutPath,
  updateSchemaInPlace,
} from './tasks'

// ctx
const NAV_MODE = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  PAGE: 'page',
}

const NAV_STATUS = {
  INIT: 'init',
  OPEN: 'open',
  CLOSED: 'closed',
}

const NAV_SIZE = {
  PRIMARY: 80,
  SECONDARY: 240,
  BODY: 78.4,
  PAGE: 240,
}

// main
export const navState = task((t, a) =>
  createStateBox({
    name: 'nav',
    initial: {
      title: '',
      status: NAV_STATUS.INIT,
      mode: NAV_MODE.PRIMARY,
      schema: [],
      matched: null,
      width: 0,
      size: 'xs',
      primary: {
        width: NAV_SIZE.PRIMARY,
        items: [],
        actions: [],
        left: 0,
      },
      secondary: {
        width: NAV_SIZE.SECONDARY,
        items: [],
        left: 0,
      },
      body: {
        height: NAV_SIZE.BODY,
        items: [],
        actions: [],
        left: 0,
        navLeft: 0,
        top: 0,
        bottom: 0,
      },
      page: {
        status: NAV_STATUS.CLOSED,
        width: NAV_SIZE.PAGE,
        items: [],
        left: 0,
        top: 0,
        bottom: 0,
      },
    },
    mutations(m) {
      const calcPrimaryLeft = (status, primaryItems = []) => {
        return t.or(t.eq(status, 'closed'), t.isZeroLen(primaryItems))
          ? 0 - NAV_SIZE.PRIMARY
          : 0
      }
      const calcSecondaryLeft = (status, secondaryItems) => {
        return t.or(t.eq(status, 'closed'), t.isZeroLen(secondaryItems))
          ? 0 - (NAV_SIZE.SECONDARY + NAV_SIZE.PRIMARY)
          : NAV_SIZE.PRIMARY
      }
      const calcBodyLeft = (status, size, width, pageNav = false) => {
        return t.not(t.or(t.eq(size, 'lg'), t.eq(size, 'xl')))
          ? 0
          : t.eq(status, 'closed')
          ? 0
          : pageNav
          ? width + NAV_SIZE.PAGE
          : width
      }
      const calcBodySpacing = (key, items, size) =>
        t.isZeroLen(items)
          ? 0
          : t.contains(size, ['lg', 'xl'])
          ? t.eq(key, 'top')
            ? NAV_SIZE.BODY
            : 0
          : t.eq(key, 'bottom')
          ? NAV_SIZE.BODY
          : 0
      const calcPageLeft = (status, size, width, pageStatus) => {
        return t.and(
          t.not(t.or(t.eq(size, 'lg'), t.eq(size, 'xl'))),
          t.and(t.eq(status, 'closed'), t.eq(pageStatus, 'closed'))
        )
          ? -(width + NAV_SIZE.PAGE)
          : t.not(t.or(t.eq(size, 'lg'), t.eq(size, 'xl')))
          ? 0
          : width
      }
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
          const size = t.pathOr(state.size, ['payload', 'size'], action)
          const width = t.pathOr(state.width, ['payload', 'width'], action)
          const secondaryItems = t.pathOr([], ['secondary', 'items'], state)
          const pageItems = t.pathOr([], ['page', 'items'], state)
          const bodyItems = t.pathOr([], ['body', 'items'], state)
          const pageStatus = t.pathOr(
            state.page.status,
            ['payload', 'pageStatus'],
            action
          )
          return t.merge(state, {
            status,
            width,
            size,
            title: t.pathOr(state.title, ['payload', 'title'], action),
            mode: t.pathOr(state.mode, ['payload', 'mode'], action),
            primary: t.merge(state.primary, {
              left: calcPrimaryLeft(status, state.primary.items),
            }),
            secondary: t.merge(state.secondary, {
              left: calcSecondaryLeft(status, secondaryItems),
            }),
            body: t.merge(state.body, {
              left: calcBodyLeft(
                status,
                size,
                width,
                t.not(t.isZeroLen(pageItems))
              ),
              navLeft: calcBodyLeft(status, size, width),
              top: calcBodySpacing('top', bodyItems, size),
              bottom: calcBodySpacing('bottom', bodyItems, size),
            }),
            page: t.merge(state.page, {
              status: pageStatus,
              left: calcPageLeft(status, size, width, pageStatus),
              top: calcBodySpacing('top', bodyItems, size),
              bottom: calcBodySpacing('bottom', bodyItems, size),
            }),
          })
        }),
        m(['navMatch'], (state, action) => {
          const status = t.pathOr(state.status, ['payload', 'status'], action)
          const width = t.pathOr(state.width, ['payload', 'width'], action)
          const primaryItems = t.pathOr(
            state.primary.items,
            ['payload', 'primary', 'items'],
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
          const pageItems = t.pathOr(
            state.page.items,
            ['payload', 'page', 'items'],
            action
          )
          const pageStatus = t.isZeroLen(pageItems)
            ? 'closed'
            : state.page.status
          return t.merge(state, {
            status,
            width,
            title: t.pathOr(state.title, ['payload', 'title'], action),
            mode: t.pathOr(state.mode, ['payload', 'mode'], action),
            matched: t.pathOr(state.matched, ['payload', 'matched'], action),
            primary: t.merge(state.primary, {
              left: calcPrimaryLeft(status, primaryItems),
              items: primaryItems,
              actions: t.pathOr(
                state.primary.actions,
                ['payload', 'primary', 'actions'],
                action
              ),
            }),
            secondary: t.merge(state.secondary, {
              left: calcSecondaryLeft(status, secondaryItems),
              items: secondaryItems,
            }),
            body: t.merge(state.body, {
              left: calcBodyLeft(
                status,
                state.size,
                width,
                t.not(t.isZeroLen(pageItems))
              ),
              navLeft: calcBodyLeft(status, state.size, width),
              top: calcBodySpacing('top', bodyItems, state.size),
              bottom: calcBodySpacing('bottom', bodyItems, state.size),
              items: bodyItems,
              actions: t.pathOr(
                state.body.actions,
                ['payload', 'body', 'actions'],
                action
              ),
            }),
            page: t.merge(state.page, {
              status: pageStatus,
              left: calcPageLeft(status, state.size, width, pageStatus),
              top: calcBodySpacing('top', bodyItems, state.size),
              bottom: calcBodySpacing('bottom', bodyItems, state.size),
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
          return t.merge(state, {
            status: nextStatus,
            primary: t.merge(state.primary, {
              left: calcPrimaryLeft(nextStatus, state.primary.items),
            }),
            secondary: t.merge(state.secondary, {
              left: calcSecondaryLeft(nextStatus, state.secondary.items),
            }),
            body: t.merge(state.body, {
              left: calcBodyLeft(
                nextStatus,
                state.size,
                state.width,
                t.not(t.isZeroLen(pageItems))
              ),
              navLeft: calcBodyLeft(nextStatus, state.size, state.width),
              top: calcBodySpacing('top', state.body.items, state.size),
              bottom: calcBodySpacing('bottom', state.body.items, state.size),
            }),
            page: t.merge(state.page, {
              status: pageStatus,
              left: calcPageLeft(
                nextStatus,
                state.size,
                state.width,
                pageStatus
              ),
              top: calcBodySpacing('top', state.body.items, state.size),
              bottom: calcBodySpacing('bottom', state.body.items, state.size),
            }),
          })
        }),
      ]
    },
    effects(fx, { actions, mutations }) {
      return [
        fx(
          ['screen/RESIZE', actions.navToggleStatus],
          async ({ getState }, dispatch, done) => {
            const state = getState()
            const status = t.pathOr(null, ['nav', 'status'], state)
            const size = t.pathOr('xs', ['screen', 'size'], state)
            const navSize = t.pathOr('xs', ['nav', 'size'], state)
            const nextStatus = t.not(t.or(t.eq(size, 'lg'), t.eq(size, 'xl')))
              ? t.eq(status, NAV_STATUS.INIT)
                ? NAV_STATUS.CLOSED
                : status
              : NAV_STATUS.INIT
            if (
              t.or(t.not(t.eq(status, nextStatus)), t.not(t.eq(size, navSize)))
            ) {
              dispatch(
                mutations.navChange({
                  status: nextStatus,
                  pageSize: nextStatus,
                  size,
                })
              )
            }
            done()
          }
        ),
        fx(
          [
            t.globrex('*/ROUTE_*').regex,
            NOT_FOUND,
            actions.navSchemaAdd,
            actions.navSchemaUpdate,
            actions.navSchemaRemove,
          ],
          async ({ getState }, dispatch, done) => {
            const state = getState()
            const routePath = t.pathOr('', ['location', 'pathname'], state)
            const schema = t.pathOr([], ['nav', 'schema'], state)
            const matched = t.pathOr(null, ['nav', 'matched'], state)
            const title = t.pathOr('', ['nav', 'title'], state)

            // search
            const nextMatch = matchedNavItem(routePath, schema)

            // validate match
            const checkMatch = t.not(nextMatch)
              ? t.not(matched)
                ? nextMatch
                : t.contains(routePath, matched.path)
                ? matched
                : nextMatch
              : t.or(
                  t.isNil(nextMatch.children),
                  t.isZeroLen(nextMatch.children || [])
                )
              ? matched
                ? t.contains(routePath, matched.path)
                  ? matched
                  : matchedNavItem(nextMatch.parentPath, schema)
                : matchedNavItem(nextMatch.parentPath, schema)
              : nextMatch

            const validMatch = t.not(checkMatch)
              ? checkMatch
              : t.not(t.eq('nav', t.pathOr('nav', ['target'], checkMatch)))
              ? t.or(
                  t.isNil(checkMatch.children),
                  t.isZeroLen(checkMatch.children || [])
                )
                ? matchedNavItem(checkMatch.parentPath, schema)
                : checkMatch
              : checkMatch

            // compute layout
            const primary = t.reduce(
              (data, item) => {
                const isItem = t.eq(t.pathOr('nav', ['target'], item), 'nav')
                const isAction = t.eq(
                  t.pathOr('nav', ['target'], item),
                  'primary-action'
                )
                return t.merge(data, {
                  items: t.or(t.not(isItem), isAction)
                    ? data.items
                    : t.not(isItem)
                    ? data.items
                    : t.concat(data.items, [item]),
                  actions: t.not(isAction)
                    ? data.actions
                    : t.concat(data.actions, [item]),
                })
              },
              { items: [], actions: [] },
              schema
            )

            // mode
            const nextMode = t.isZeroLen(primary.items)
              ? NAV_MODE.PAGE
              : t.isNil(validMatch)
              ? NAV_MODE.PRIMARY
              : t.or(
                  t.isNil(validMatch.children),
                  t.isZeroLen(validMatch.children)
                )
              ? NAV_MODE.PRIMARY
              : NAV_MODE.SECONDARY

            const secondary = t.eq(nextMode, NAV_MODE.PAGE)
              ? { items: [], bodyItems: [], bodyActions: [] }
              : t.reduce(
                  (data, item) => {
                    const isBodyItem = t.eq(
                      t.pathOr('nav', ['target'], item),
                      'body'
                    )
                    const isBodyAction = t.eq(
                      t.pathOr('nav', ['target'], item),
                      'body-action'
                    )
                    return t.merge(data, {
                      items: t.or(isBodyItem, isBodyAction)
                        ? data.items
                        : t.concat(data.items, [item]),
                      bodyItems: t.not(isBodyItem)
                        ? data.bodyItems
                        : t.concat(data.bodyItems, [item]),
                      bodyActions: t.not(isBodyAction)
                        ? data.bodyActions
                        : t.concat(data.bodyActions, [item]),
                    })
                  },
                  { items: [], bodyItems: [], bodyActions: [] },
                  t.isNil(validMatch) ? [] : validMatch.children
                )

            const nextBody = t.not(t.eq(nextMode, NAV_MODE.PAGE))
              ? {
                  items: secondary.bodyItems,
                  actions: secondary.bodyActions,
                }
              : t.reduce(
                  (data, item) => {
                    const isBodyItem = t.eq(
                      t.pathOr('nav', ['target'], item),
                      'body'
                    )
                    const isBodyAction = t.eq(
                      t.pathOr('nav', ['target'], item),
                      'body-action'
                    )
                    return t.merge(data, {
                      items: t.not(isBodyItem)
                        ? data.items
                        : t.concat(data.items, [item]),
                      actions: t.not(isBodyAction)
                        ? data.actions
                        : t.concat(data.actions, [item]),
                    })
                  },
                  { items: [], actions: [] },
                  schema
                )

            // page items
            const matchedBodyItem = t.not(t.eq(nextMode, NAV_MODE.PAGE))
              ? t.find(item => t.eq(routePath, item.path), nextBody.items || [])
              : validMatch

            const pageItems = t.isNil(matchedBodyItem)
              ? []
              : t.not(t.isZeroLen(t.pathOr([], ['children'], matchedBodyItem)))
              ? matchedBodyItem.children
              : []

            // mutate
            dispatch(
              mutations.navMatch({
                matched: validMatch,
                mode: nextMode,
                title: t.isNil(validMatch) ? title : validMatch.title,
                width: t.getMatch(nextMode)({
                  [NAV_MODE.PAGE]: 0,
                  [NAV_MODE.PRIMARY]: NAV_SIZE.PRIMARY,
                  [NAV_MODE.SECONDARY]: NAV_SIZE.PRIMARY + NAV_SIZE.SECONDARY,
                }),
                primary,
                secondary: { items: secondary.items },
                body: nextBody,
                page: {
                  items: pageItems,
                },
              })
            )

            // finally
            done()
          }
        ),
      ]
    },
  })
)
