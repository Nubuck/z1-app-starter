import { task } from '@z1/lib-feature-box-server-nedb'
import { serviceCmd } from './cmd'

// tasks
const activeCmd = task(t => item => {
  const options = JSON.parse(item.options || '{}')
  return t.mergeAll([
    item,
    {
      env: JSON.parse(item.env || '{}'),
    },
    options,
  ])
})

// main
export const cmdHooksServices = task((t, a) => ({
  async beforePatch(ctx) {
    if (ctx.params.skipCmd) {
      return ctx
    }
    const [serviceError, serviceResult] = await a.of(
      ctx.app.service('service-cmd').get(ctx.id)
    )
    // ctx.app.debug('BEFORE PATCH SERVICE', ctx)
    if (serviceError) {
      return ctx
    }
    const nextStatus = t.has('status')(ctx.data)
      ? ctx.data.status
      : serviceResult.status
    ctx.app.debug('BEFORE PATCH PRE', ctx.data, nextStatus)
    if (
      t.and(
        t.and(
          t.eq(ctx.data.action, 'start'),
          t.not(t.or(t.eq(nextStatus, 'online'), t.eq(nextStatus, 'launching')))
        ),
        t.not(t.eq(serviceResult.actionStatus, 'running'))
      )
    ) {
      ctx.data.actionStatus = 'running'
    } else if (
      t.and(
        t.and(
          t.eq(ctx.data.action, 'stop'),
          t.not(t.or(t.eq(nextStatus, 'stopped'), t.eq(nextStatus, 'stopping')))
        ),
        t.not(t.eq(serviceResult.actionStatus, 'running'))
      )
    ) {
      ctx.data.actionStatus = 'running'
    } else if (
      t.and(
        t.and(
          t.eq(ctx.data.action, 'restart'),
          t.not(t.or(t.eq(nextStatus, 'online'), t.eq(nextStatus, 'launching')))
        ),
        t.not(t.eq(serviceResult.actionStatus, 'running'))
      )
    ) {
      ctx.data.actionStatus = 'running'
    } else {
      ctx.data.action = null
      ctx.data.actionStatus = null
    }
    return ctx
  },
  async afterPatch(ctx) {
    if (ctx.params.skipCmd) {
      return ctx
    }
    const status = t.path(['result', 'status'], ctx)
    const action = t.path(['result', 'action'], ctx)
    // start
    if (
      t.and(
        t.eq(action, 'start'),
        t.not(t.or(t.eq(status, 'online'), t.eq(status, 'launching')))
      )
    ) {
      const [startError, startResult] = await a.of(
        serviceCmd.start(
          activeCmd(t.pick(serviceCmd.CMD_KEYS, ctx.result || {}))
        )
      )
      if (startError) {
        ctx.app.error('SERVICE CMD FAILED TO START', startError)
      } else {
        const nextResult = t.isType(startResult, 'Array')
          ? t.head(startResult)
          : startResult || {}
        const nextStartResult = serviceCmd.pm2OutputToState(nextResult)
        const [syncError, syncResult] = await a.of(
          ctx.app.service('service-cmd').patch(
            ctx.id,
            serviceCmd.safeDbItem(
              t.merge(t.pick(serviceCmd.PLATFORM_KEYS, nextStartResult || {}), {
                action: null,
                actionStatus: null,
              })
            ),
            { skipCmd: true }
          )
        )
        if (syncError) {
          ctx.app.error('SERVICE CMD FAILED TO SYNC', syncError)
        } else {
          ctx.result = syncResult
        }
      }
    }
    // restart
    else if (
      t.and(
        t.eq(action, 'restart'),
        t.not(t.or(t.eq(status, 'online'), t.eq(status, 'launching')))
      )
    ) {
      const [restartError, restartResult] = await a.of(
        serviceCmd.restart(ctx.result.pmId)
      )
      if (restartError) {
        ctx.app.error('SERVICE CMD FAILED TO RESTART', restartError)
      } else {
        const nextResult = t.isType(restartResult, 'Array')
          ? t.head(restartResult)
          : restartResult || {}
        const nextStartResult = serviceCmd.pm2OutputToState(nextResult)
        const [syncError, syncResult] = await a.of(
          ctx.app.service('service-cmd').patch(
            ctx.id,
            serviceCmd.safeDbItem(
              t.merge(t.pick(serviceCmd.PLATFORM_KEYS, nextStartResult || {}), {
                action: null,
                actionStatus: null,
              })
            ),
            { skipCmd: true }
          )
        )
        if (syncError) {
          ctx.app.error('SERVICE CMD FAILED TO SYNC', syncError)
        } else {
          ctx.result = syncResult
        }
      }
    }
    // stop
    else if (
      t.and(
        t.eq(action, 'stop'),
        t.not(t.or(t.eq(status, 'stopped'), t.eq(status, 'stopping')))
      )
    ) {
      const [stopError, stopResult] = await a.of(
        serviceCmd.stop(ctx.result.pmId)
      )
      if (stopError) {
        ctx.app.error('SERVICE CMD FAILED TO STOP', stopError)
      } else {
        const nextResult = t.isType(stopResult, 'Array')
          ? t.head(stopResult)
          : stopResult || {}
        const nextStartResult = serviceCmd.pm2OutputToState(nextResult)
        const [syncError, syncResult] = await a.of(
          ctx.app.service('service-cmd').patch(
            ctx.id,
            serviceCmd.safeDbItem(
              t.merge(t.pick(serviceCmd.PLATFORM_KEYS, nextStartResult || {}), {
                action: null,
                actionStatus: null,
              })
            ),
            { skipCmd: true }
          )
        )
        if (syncError) {
          ctx.app.error('SERVICE CMD FAILED TO SYNC', syncError)
        } else {
          ctx.result = syncResult
        }
      }
    }
    // next
    return ctx
  },
}))
