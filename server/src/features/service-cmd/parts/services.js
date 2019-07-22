import { task, fs } from '@z1/lib-feature-box-server-nedb'
import { cmdHooks } from './hooks'
import { cmdEvents } from './events'
import { safeParse } from './sync'

// main
export const services = task((t, a) => (s, m, { auth, data }) => {
  const nextItem = (ctx, item) => {
    try {
      return t.merge(item, {
        env: safeParse(item.env),
        options: safeParse(item.options),
        meta: safeParse(item.meta),
        dependencies: safeParse(item.dependencies),
      })
    } catch (ex) {
      ctx.app.error('service-cmd afterResult error', ex, item)
      return item
    }
  }
  const withSafeParse = ctx => {
    if (t.not(t.isNil(t.pathOr(null, ['result', '_id'], ctx)))) {
      ctx.result = nextItem(ctx, ctx.result)
    }
    return ctx
  }
  const withLogs = async ctx => {
    if (
      t.and(t.not(t.isNil(ctx.params.provider)), t.not(t.isNil(ctx.result)))
    ) {
      const logPath = t.pathOr(null, ['meta', 'pm_out_log_path'], ctx.result)
      const errPath = t.pathOr(null, ['meta', 'pm_err_log_path'], ctx.result)
      if (t.not(t.isNil(logPath))) {
        const [logErr, logResult] = await a.of(fs.readAsync(logPath))
        if (logErr) {
          ctx.app.error('Error reading log', logErr)
        }
        const [errLogErr, errLogResult] = await a.of(fs.readAsync(errPath))
        if (errLogErr) {
          ctx.app.error('Error reading error log', errLogErr)
        }

        if (logResult) {
          ctx.result.logs = t.concat(
            t.map(
              line => ({ id: ctx.result._id, type: 'err', line }),
              t.split(/\n/, errLogResult || '')
            ),
            t.map(
              line => ({ id: ctx.result._id, type: 'out', line }),
              t.split(/\n/, logResult || '')
            )
          )
        }
      }
    }
    return ctx
  }
  return [
    s(
      'service-cmd',
      {
        Model: m.services_state,
        events: ['log-pub'],
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
            get: [withSafeParse, withLogs],
            find: [
              ctx => {
                ctx.result.data = t.map(
                  item => nextItem(ctx, item),
                  ctx.result.data || []
                )
                return ctx
              },
            ],
            create: [withSafeParse],
            patch: [cmdHooks.afterPatch, withSafeParse, withLogs],
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
