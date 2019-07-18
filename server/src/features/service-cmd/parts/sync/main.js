import { task } from '@z1/lib-feature-box-server-nedb'
import { Fs } from '@z1/preset-tools'
import Stopwatch from 'timer-stopwatch'
import path from 'path'
import { serviceCmd } from '../cmd'

// tasks
import {
  pkgToDb,
  syncFsDbState,
  syncFsDbPlatformState,
  pm2OutputToState,
  safeDbItem,
} from './tasks'

// main
export const syncCmdPm2 = task((t, a) => async app => {
  // config
  const cmdConfig = app.get('cmd').service || {}
  if (t.not(t.has('path')(cmdConfig))) {
    return {}
  }
  // folder state
  const servicePath = Fs.path(cmdConfig.path)
  const [dirErr] = await a.of(Fs.dirAsync(servicePath))
  if (dirErr) {
    app.error('SERVICE CMD CONFIRM ERROR', inspectError)
    return {}
  }
  const [findErr, findResult] = await a.of(
    Fs.findAsync(servicePath, {
      matching: '*/package.json',
    })
  )
  if (findErr) {
    app.error('SERVICE CMD SYNC FIND ERROR', findErr)
  }
  const [fsStateErr, fsStateResult] = await a.of(
    a.map(findResult || [], 1, async pkgPath => {
      const cmdFile = await Fs.readAsync(pkgPath, 'json')
      const nextCwd = path.dirname(Fs.path(pkgPath))
      return pkgToDb(
        t.merge(
          {
            cwd: nextCwd,
            slug: t.caseTo.constantCase(cmdFile.name),
          },
          t.pick(['name', 'version', 'main', 'bin', 'cmd'], cmdFile || {})
        )
      )
    })
  )
  if (fsStateErr) {
    app.error('SERVICE CMD FOLDER SYNC ERROR', fsStateErr)
  }
  const fsServices = t.not(fsStateResult)
    ? {}
    : t.fromPairs(
        t.map(service => [service.slug, service], fsStateResult || [])
      )

  // db state
  const [dbServicesError, dbServicesResult] = await a.of(
    app.service('service-cmd').find()
  )

  if (dbServicesError) {
    app.error('SERVICE CMD DB SYNC ERROR', dbServicesError)
  }
  const dbServices = t.not(dbServicesResult)
    ? {}
    : t.not(t.has('data')(dbServicesResult))
    ? {}
    : t.fromPairs(
        t.map(service => [service.slug, service], dbServicesResult.data || [])
      )

  // platform state
  const [platformError, platformResult] = await a.of(serviceCmd.list())
  if (platformError) {
    app.error('SERVICE CMD PLATFORM SYNC ERROR', platformError)
  }
  const platformState = t.not(platformResult)
    ? {}
    : t.fromPairs(
        t.map(
          service => [
            t.caseTo.constantCase(service.name),
            pm2OutputToState(service),
          ],
          platformResult || []
        )
      )

  // next state
  const dbKeys = t.keys(dbServices)
  const fsKeys = t.keys(fsServices)

  // seed
  if (t.isZeroLen(dbKeys)) {
    return await a.map(fsKeys, 1, async fsKey => {
      const nextService = fsServices[fsKey]
      const [seedError, seedResult] = await a.of(
        app.service('service-cmd').create(safeDbItem(nextService))
      )
      if (seedError) {
        app.error('SERVICE CMD SEED ERROR', seedError)
      }
      return seedResult || nextService
    })
  }

  // sync
  const nextFsDbPlatformState = syncFsDbPlatformState(
    syncFsDbState(fsServices, dbServices),
    platformState
  )

  const patchKeys = t.map(
    nextKey => nextFsDbPlatformState[nextKey].slug,
    t.filter(key => {
      return t.or(
        nextFsDbPlatformState[key]._shouldUpdate,
        nextFsDbPlatformState[key]._shouldRestart
      )
    }, t.keys(nextFsDbPlatformState))
  )

  return await a.map(patchKeys, 1, async key => {
    const syncItem = t.omit(
      ['updatedAt', 'createdAt'],
      nextFsDbPlatformState[key]
    )
    const shouldStart = t.and(
      syncItem.autoStart,
      t.not(
        t.or(
          t.eq(syncItem.status, 'online'),
          t.eq(syncItem.status, 'launching')
        )
      )
    )

    const payload = shouldStart
      ? t.merge(syncItem, { action: 'start' })
      : syncItem
    const params = t.not(shouldStart) ? { skipCmd: true } : undefined

    if (t.isNil(payload._id)) {
      const [createError, createResult] = await a.of(
        app.service('service-cmd').create(payload)
      )
      if (createError) {
        app.error('SERVICE CMD CREATE ERROR', createError)
      }
      return createResult || syncItem
    }

    const [patchError, patchResult] = await a.of(
      app.service('service-cmd').patch(payload._id, payload, params)
    )
    if (patchError) {
      app.error('SERVICE CMD PATCH ERROR', patchError)
    }
    return patchResult || syncItem
  })
})

export const bootCmdService = app => {
  const syncInterval = 1000 * app.get('cmd').service.interval
  const syncTimer = new Stopwatch(syncInterval)
  const restartSyncTimer = () => {
    syncTimer.stop()
    syncTimer.reset(syncInterval)
    syncTimer.start()
  }
  // run
  syncCmdPm2(app)
    .then(() => {
      app.debug('SYNC SERVICES BOOTED')
      syncTimer.start()
    })
    .catch(error => {
      app.error('SYNC SERVICES SETUP ERROR', error)
      syncTimer.start()
    })
  // repeat
  syncTimer.onDone(() => {
    syncCmdPm2(app)
      .then(() => {
        app.debug('SYNC SERVICES COMPLETE', new Date())
        restartSyncTimer()
      })
      .catch(error => {
        app.error('SYNC SERVICES TIMER ERROR', error)
        restartSyncTimer()
      })
  })
}
