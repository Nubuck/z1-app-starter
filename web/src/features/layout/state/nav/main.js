import { task, createStateBox } from '@z1/lib-feature-box'

// schema
import { matchedNavItem } from './schema'

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
      primaryWidth: NAV_WIDTH.PRIMARY,
      secondaryWidth: NAV_WIDTH.SECONDARY,
      width: NAV_WIDTH.PRIMARY,
    },
    mutations(m) {
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
          return t.merge(state, {
            title: t.pathOr(state.status, ['payload', 'title'], action),
            status: t.pathOr(state.status, ['payload', 'status'], action),
            mode: t.pathOr(state.mode, ['payload', 'mode'], action),
            width: t.pathOr(state.width, ['payload', 'width'], action),
          })
        }),
        m(['navMatch'], (state, action) => {
          return t.merge(state, {
            title: t.pathOr(state.status, ['payload', 'title'], action),
            status: t.pathOr(state.status, ['payload', 'status'], action),
            mode: t.pathOr(state.mode, ['payload', 'mode'], action),
            width: t.pathOr(state.width, ['payload', 'width'], action),
            matched: t.pathOr(state.matched, ['payload', 'matched'], action),
          })
        }),
      ]
    },
    effects(fx, { actions, mutations }) {
      return [
        fx(['screen/RESIZE'], async ({ getState }, dispatch, done) => {
          const state = getState()
          const status = t.pathOr(null, ['nav', 'status'], state)
          const size = t.pathOr('xs', ['screen', 'size'], state)
          const nextStatus = t.eq(size, 'xs')
            ? t.eq(status, NAV_STATUS.INIT)
              ? NAV_STATUS.CLOSED
              : status
            : status
          if (t.not(t.eq(status, nextStatus))) {
            dispatch(mutations.navChange({ status: nextStatus }))
          }
          done()
        }),
        fx(
          [
            t.globrex('*/ROUTE_*').regex,
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
            if (
              t.not(
                t.eq(
                  t.pathOr(null, ['path'], matched),
                  t.pathOr(null, ['path'], validMatch)
                )
              )
            ) {
              const nextMode = t.isNil(validMatch)
                ? NAV_MODE.PRIMARY
                : t.or(
                    t.isNil(validMatch.children),
                    t.isZeroLen(validMatch.children)
                  )
                ? NAV_MODE.PRIMARY
                : NAV_MODE.SECONDARY

              // mutate
              dispatch(
                mutations.navMatch({
                  matched: validMatch,
                  mode: nextMode,
                  title: t.isNil(validMatch) ? title : validMatch.title,
                  width: t.getMatch(nextMode)({
                    [NAV_MODE.PRIMARY]: NAV_WIDTH.PRIMARY,
                    [NAV_MODE.SECONDARY]:
                      NAV_WIDTH.PRIMARY + NAV_WIDTH.SECONDARY,
                  }),
                })
              )
            }
            done()
          }
        ),
      ]
    },
  })
)
