import { task } from '@z1/lib-feature-box-server-nedb'
import Tail from 'always-tail'

// main
export const cmdEvents = task((t, a) => ({
  onPatched(data, ctx) {
    if (t.or(t.eq(data.status, 'online'), t.eq(data.status, 'stopped'))) {
      const existingTail = ctx.app.get(`log_${data._id}`)
      if (t.and(t.isNil(existingTail), t.eq(data.status, 'online'))) {
        const logPath = t.pathOr(null, ['meta', 'pm_out_log_path'], data)
        const errorPath = t.pathOr(null, ['meta', 'pm_err_log_path'], data)
        // out
        if (t.not(t.isNil(logPath))) {
          const nextTail = new Tail(logPath)
          nextTail.on('line', line => {
            ctx.service.emit('log-pub', { id: data._id, type: 'out', line })
          })
          nextTail.on('error', line => {
            ctx.service.emit('log-pub', { id: data._id, type: 'err', line })
          })
          nextTail.watch()
          ctx.app.set(`log_${data._id}`, nextTail)
        } else {
          console.log('log path not found', data._id)
        }
        // err
        if (t.not(t.isNil(errorPath))) {
          const nextErrTail = new Tail(errorPath)
          nextErrTail.on('line', line => {
            ctx.service.emit('log-pub', { id: data._id, type: 'err', line })
          })
          nextErrTail.on('error', line => {
            ctx.service.emit('log-pub', { id: data._id, type: 'err', line })
          })
          nextErrTail.watch()
          ctx.app.set(`error_${data._id}`, nextErrTail)
        } else {
          console.log('error path not found', data._id)
        }
      } else if (
        t.and(t.not(t.isNil(existingTail)), t.eq(data.status, 'stopped'))
      ) {
        // out
        if (t.hasIn('unwatch')(ctx.app.get(`log_${data._id}`) || {})) {
          ctx.app.get(`log_${data._id}`).unwatch &&
            ctx.app.get(`log_${data._id}`).unwatch()
          ctx.app.set(`log_${data._id}`, null)
        }
        // err
        if (t.hasIn('unwatch')(ctx.app.get(`error_${data._id}`) || {})) {
          ctx.app.get(`error_${data._id}`).unwatch &&
            ctx.app.get(`error_${data._id}`).unwatch()
          ctx.app.set(`error_${data._id}`, null)
        }
      }
    }
  },
}))
