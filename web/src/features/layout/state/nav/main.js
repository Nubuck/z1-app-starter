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
        m(['navViewChange'], (state, action) => {
          return t.merge(state, {
            title: t.pathOr(state.status, ['payload', 'title'], action),
            status: t.pathOr(state.status, ['payload', 'status'], action),
            mode: t.pathOr(state.mode, ['payload', 'mode'], action),
            width: t.pathOr(state.width, ['payload', 'width'], action),
          })
        }),
        m(['navRouteMatch'], (state, action) => {
          return t.merge(state, {
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
        fx(['screen/RESIZE'], async ({ getState, action }, dispatch, done) => {
          done()
        }),
        fx(
          [t.globrex('*ROUTE_*').regex],
          async ({ getState }, dispatch, done) => {
            done()
          }
        ),
        fx(
          [
            actions.navSchemaAdd,
            actions.navSchemaUpdate,
            actions.navSchemaRemove,
          ],
          async ({ getState }, dispatch, done) => {
            done()
          },
          { latest: false }
        ),
      ]
    },
  })
)
