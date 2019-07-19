import { task } from '@z1/lib-feature-box-server-nedb'
import { cmdHooks } from './hooks'
import { cmdEvents } from './events'

// main
export const services = task(t => (s, m, { auth, data }) => {
  const afterResult = ctx => {
    if (t.not(t.isNil(t.pathOr(null, ['result', '_id'], ctx)))) {
      ctx.result = t.merge(ctx.result, {
        env: JSON.parse(ctx.result.env || '{}'),
        options: JSON.parse(ctx.result.options || '{}'),
        meta: JSON.parse(ctx.result.meta || '{}'),
      })
    }
    return ctx
  }
  return [
    s(
      'service-cmd',
      {
        Model: m.services_state,
        events: ['log-pub', 'log-sub'],
      },
      {
        hooks: {
          before: {
            get: [auth.authenticate('jwt')],
            find: [auth.authenticate('jwt'), data.safeFindMSSQL],
            create: [auth.authenticate('jwt')],
            update: [auth.authenticate('jwt')],
            patch: [auth.authenticate('jwt'), cmdHooks.beforePatch],
            remove: [auth.authenticate('jwt')],
          },
          after: {
            get: [afterResult],
            find: [
              ctx => {
                ctx.result.data = t.map(
                  item =>
                    t.merge(item, {
                      env: JSON.parse(item.env || '{}'),
                      options: JSON.parse(item.options || '{}'),
                      meta: JSON.parse(item.meta || '{}'),
                    }),
                  ctx.result.data || []
                )
                return ctx
              },
            ],
            create: [afterResult],
            patch: [cmdHooks.afterPatch, afterResult],
            remove: [],
          },
        },
        events: {
          patched: cmdEvents.onPatched,
        },
      }
    ),
  ]
})
