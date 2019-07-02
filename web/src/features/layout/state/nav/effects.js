import { task, NOT_FOUND } from '@z1/lib-feature-box'
import { matchedNavItem } from '@z1/lib-ui-schema'

// ctx
import { NAV_SIZE, NAV_MODE, NAV_STATUS } from './ctx'

// main
export const effects = task((t, a) => (fx, { actions, mutations }) => {
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
                height: t.not(t.or(t.eq(size, 'lg'), t.eq(size, 'xl')))
                  ? NAV_SIZE.BODY_SM
                  : NAV_SIZE.BODY,
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

          const validMatch = t.not(t.isZeroLen(primary.items))
            ? t.not(checkMatch)
              ? checkMatch
              : t.not(t.eq('nav', t.pathOr('nav', ['target'], checkMatch)))
              ? t.or(
                  t.isNil(checkMatch.children),
                  t.isZeroLen(
                    t.filter(
                      item => t.eq('nav', t.pathOr('nav', ['target'], item)),
                      checkMatch.children || []
                    )
                  )
                )
                ? matchedNavItem(checkMatch.parentPath, schema)
                : checkMatch
              : checkMatch
            : checkMatch

          const secondary = t.isZeroLen(primary.items)
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

          // mode
          const nextMode = t.isZeroLen(primary.items)
            ? NAV_MODE.PAGE
            : t.isNil(validMatch)
            ? NAV_MODE.PRIMARY
            : t.isZeroLen(secondary.items)
            ? NAV_MODE.PRIMARY
            : NAV_MODE.SECONDARY

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

          const checkBodyItem = t.not(t.eq(nextMode, NAV_MODE.PAGE))
            ? t.and(
                t.isNil(matchedBodyItem),
                t.not(t.isZeroLen(nextBody.items))
              )
              ? matchedNavItem(routePath, nextBody.items)
              : matchedBodyItem
            : validMatch

          const finalBodyItem = t.and(
            t.not(t.isZeroLen(nextBody.items)),
            t.and(t.isNil(matchedBodyItem), t.not(t.isNil(checkBodyItem)))
          )
            ? t.eq(checkBodyItem.path, routePath)
              ? matchedNavItem(checkBodyItem.parentPath, schema)
              : matchedBodyItem
            : matchedBodyItem

          const pageItems = t.isNil(finalBodyItem)
            ? []
            : t.not(t.isZeroLen(t.pathOr([], ['children'], finalBodyItem)))
            ? finalBodyItem.children
            : []

          const nextSecondaryItems = t.eq(nextMode, NAV_MODE.PAGE)
            ? secondary.items
            : t.and(
                t.not(t.isZeroLen(nextBody.items || [])),
                t.isZeroLen(secondary.items)
              )
            ? t.filter(
                item => t.eq('nav', t.pathOr('nav', ['target'], item)),
                t.pathOr(
                  [],
                  ['children'],
                  matchedNavItem(validMatch.parentPath, schema) || {}
                )
              )
            : secondary.items

          const finalMode = t.eq(nextMode, NAV_MODE.PAGE)
            ? nextMode
            : t.isNil(validMatch)
            ? NAV_MODE.PRIMARY
            : t.isZeroLen(nextSecondaryItems)
            ? NAV_MODE.PRIMARY
            : NAV_MODE.SECONDARY

          // mutate
          dispatch(
            mutations.navMatch({
              matched: validMatch,
              mode: finalMode,
              title: t.isNil(validMatch) ? title : validMatch.title,
              width: t.getMatch(finalMode)({
                [NAV_MODE.PAGE]: 0,
                [NAV_MODE.PRIMARY]: NAV_SIZE.PRIMARY,
                [NAV_MODE.SECONDARY]: NAV_SIZE.PRIMARY + NAV_SIZE.SECONDARY,
              }),
              primary,
              secondary: { items: nextSecondaryItems },
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
})
