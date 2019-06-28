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
}

const NAV_STATUS = {
  INIT: 'init',
  OPEN: 'open',
  CLOSED: 'closed',
}

const NAV_WIDTH = {
  PRIMARY: 80,
  SECONDARY: 240,
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
      width: NAV_WIDTH.PRIMARY,
      size: 'xs',
      primary: {
        width: NAV_WIDTH.PRIMARY,
        items: [],
        actions: [],
        left: 0,
      },
      secondary: {
        width: NAV_WIDTH.SECONDARY,
        items: [],
        left: 0,
      },
      body: {
        height: 0,
        items: [],
        left: 0,
      },
    },
    mutations(m) {
      const calcPrimaryLeft = status => {
        return t.eq(status, 'closed') ? 0 - NAV_WIDTH.PRIMARY : 0
      }
      const calcSecondaryLeft = (status, secondaryItems) => {
        return t.or(t.eq(status, 'closed'), t.isZeroLen(secondaryItems))
          ? 0 - (NAV_WIDTH.SECONDARY + NAV_WIDTH.PRIMARY)
          : NAV_WIDTH.PRIMARY
      }
      const calcBodyLeft = (status, size, width) => {
        return t.not(t.or(t.eq(size, 'lg'), t.eq(size, 'xl')))
          ? 0
          : t.eq(status, 'closed')
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
          return t.merge(state, {
            title: t.pathOr(state.title, ['payload', 'title'], action),
            status,
            mode: t.pathOr(state.mode, ['payload', 'mode'], action),
            width,
            size,
            primary: t.merge(state.primary, {
              left: calcPrimaryLeft(status),
            }),
            secondary: t.merge(state.secondary, {
              left: calcSecondaryLeft(status, secondaryItems),
            }),
            body: t.merge(state.body, {
              left: calcBodyLeft(status, size, width),
            }),
          })
        }),
        m(['navMatch'], (state, action) => {
          const status = t.pathOr(state.status, ['payload', 'status'], action)
          const width = t.pathOr(state.width, ['payload', 'width'], action)
          const secondaryItems = t.pathOr(
            state.secondary.items,
            ['payload', 'secondary', 'items'],
            action
          )
          return t.merge(state, {
            title: t.pathOr(state.title, ['payload', 'title'], action),
            status,
            mode: t.pathOr(state.mode, ['payload', 'mode'], action),
            width,
            matched: t.pathOr(state.matched, ['payload', 'matched'], action),
            primary: t.merge(state.primary, {
              left: calcPrimaryLeft(status),
              items: t.pathOr(
                state.primary.items,
                ['payload', 'primary', 'items'],
                action
              ),
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
              left: calcBodyLeft(status, state.size, width),
              items: t.pathOr(
                state.body.items,
                ['payload', 'body', 'items'],
                action
              ),
            }),
          })
        }),
        m('navToggleStatus', state => {
          const status = t.eq(state.status, 'open') ? 'closed' : 'open'
          return t.merge(state, {
            status,
            primary: t.merge(state.primary, {
              left: calcPrimaryLeft(status),
            }),
            secondary: t.merge(state.secondary, {
              left: calcSecondaryLeft(status, state.secondary.items),
            }),
            body: t.merge(state.body, {
              left: calcBodyLeft(status, state.size, state.width),
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
            const validMatch = t.not(nextMatch)
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

            // compute layout
            const nextMode = t.isNil(validMatch)
              ? NAV_MODE.PRIMARY
              : t.or(
                  t.isNil(validMatch.children),
                  t.isZeroLen(validMatch.children)
                )
              ? NAV_MODE.PRIMARY
              : NAV_MODE.SECONDARY

            const primary = t.reduce(
              (data, item) => {
                const isAction = t.eq(
                  t.pathOr('nav', ['target'], item),
                  'primary-action'
                )
                return t.merge(data, {
                  items: isAction ? data.items : t.concat(data.items, [item]),
                  actions: t.not(isAction)
                    ? data.actions
                    : t.concat(data.actions, [item]),
                })
              },
              { items: [], actions: [] },
              schema
            )

            const secondary = t.reduce(
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

            // left compute
            const secondaryItems = secondary.items
            const nextWidth = t.getMatch(nextMode)({
              [NAV_MODE.PRIMARY]: NAV_WIDTH.PRIMARY,
              [NAV_MODE.SECONDARY]: NAV_WIDTH.PRIMARY + NAV_WIDTH.SECONDARY,
            })

            // mutate
            dispatch(
              mutations.navMatch({
                matched: validMatch,
                mode: nextMode,
                title: t.isNil(validMatch) ? title : validMatch.title,
                width: nextWidth,
                primary,
                secondary: { items: secondaryItems },
                body: {
                  items: secondary.bodyItems,
                  actions: secondary.bodyActions,
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
