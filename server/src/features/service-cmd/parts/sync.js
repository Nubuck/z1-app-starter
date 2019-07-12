import { task } from '@z1/lib-feature-box-server-nedb'
import { Fs } from '@z1/preset-tools'
import Stopwatch from 'timer-stopwatch'
import path from 'path'
import { serviceCmd } from './cmd'

// tasks

const baseService = task(t => (current = {}, next = {}) => {
  return t.mergeAll([
    {
      name: '',
      slug: '',
      alias: null,
      version: null,
      script: null,
      interpreter: null,
      instances: 0,
      exec_mode: null,
      port: 0,
      args: null,
      node_args: null,
      env: {},
      cwd: null,
      options: {},
      pid: null,
      pmId: null,
      meta: {},
      ipAddress: null,
      restarts: 0,
      status: 'init',
      action: null,
      actionStatus: null,
      folderStatus: null,
      memory: 0,
      cpu: 0,
      username: null,
    },
    current,
    {
      autoStart: t.or(
        t.eq(current.autoStart, null),
        t.eq(current.autoStart, undefined)
      )
        ? false
        : current.autoStart,
    },
    next,
  ])
})

const cmdKeys = [
  'script',
  'interpreter',
  'instances',
  'exec_mode',
  'port',
  'args',
  'node_args',
  'env',
  'autoStart',
]

const pkgToDb = task(t => pkg => {
  const { name, alias, version, slug, cwd, cmd } = pkg
  const nextFields = t.pick(cmdKeys, cmd || {})
  const options = t.omit(cmdKeys, cmd || {})
  return baseService(
    t.mergeAll([
      {
        name,
        alias,
        version,
        slug,
        cwd,
        options,
      },
      nextFields,
    ])
  )
})

const syncFsDbItem = task(t => (fsItem, dbItem) => {
  const keys = t.concat(serviceCmd.CMD_KEYS, ['autoStart'])
  const remainder = t.omit(keys, dbItem)
  const nextFsItem = serviceCmd.safeDbItem(t.pick(keys, fsItem || {}))
  const nextDbItem = serviceCmd.safeDbItem(t.pick(keys, dbItem || {}))
  let _shouldUpdate = false
  return t.mergeAll(
    t.flatten([
      t.map(key => {
        const shouldUpdate = t.and(
          t.has(key)(nextFsItem),
          t.not(t.eq(nextFsItem[key], nextDbItem[key]))
        )
        if (shouldUpdate) {
          _shouldUpdate = true
        }
        return {
          [key]: shouldUpdate ? nextFsItem[key] : nextDbItem[key],
        }
      }, keys),
      serviceCmd.safeDbItem(remainder),
      { _shouldUpdate },
    ])
  )
})

const syncFsDbState = task(t => (fsState, dbState) => {
  return t.fromPairs(
    t.map(fsKey => {
      return [fsKey, syncFsDbItem(fsState[fsKey], dbState[fsKey])]
    }, t.keys(fsState))
  )
})

const syncFsDbPlatformItem = task(t => (fsDbItem, platformItem) => {
  const remainder = t.omit(serviceCmd.PLATFORM_KEYS, fsDbItem)
  const nextFsDbItem = serviceCmd.safeDbItem(
    t.pick(serviceCmd.PLATFORM_KEYS, fsDbItem || {})
  )
  const nextPlatformItem = serviceCmd.safeDbItem(
    t.pick(serviceCmd.PLATFORM_KEYS, platformItem || {})
  )
  let _shouldRestart = false
  let _shouldUpdate = false
  return t.mergeAll(
    t.flatten([
      t.map(key => {
        const shouldUpdate = t.or(
          t.isNil(nextPlatformItem[key]),
          t.not(t.eq(nextFsDbItem[key], nextPlatformItem[key]))
        )
        if (shouldUpdate) {
          if (t.not(_shouldRestart)) {
            _shouldRestart = t.or(
              t.eq(nextFsDbItem[key], null),
              t.eq(nextFsDbItem[key], undefined)
            )
              ? remainder.autoStart
              : true
          }
          _shouldUpdate = true
        }
        const nextResult = {
          [key]: shouldUpdate
            ? t.eq(t.findIndex(k => t.eq(k, key), serviceCmd.CMD_KEYS), -1)
              ? nextPlatformItem[key] || null
              : t.and(t.eq(key, 'status'), t.not(nextPlatformItem[key]))
              ? null
              : nextFsDbItem[key]
            : t.and(t.eq(key, 'status'), t.not(nextPlatformItem[key]))
            ? null
            : nextFsDbItem[key] || nextPlatformItem[key],
        }

        return nextResult
      }, serviceCmd.PLATFORM_KEYS),
      remainder,
      { _shouldRestart, _shouldUpdate },
    ])
  )
})

const syncFsDbPlatformState = task(t => (fsDbState, platformState) => {
  return t.fromPairs(
    t.map(fsDbKey => {
      return [
        fsDbKey,
        syncFsDbPlatformItem(fsDbState[fsDbKey], platformState[fsDbKey]),
      ]
    }, t.keys(fsDbState))
  )
})

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
  // app.debug('FS SERVICES', fsServices)

  // db state
  const [dbServicesError, dbServicesResult] = await a.of(
    app.service('service-cmd').find()
  )
  //     query: {
  //       $limit: 0,
  //     },
  // app.debug('DB SERVICES RESULT', dbServicesResult)

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
  // app.debug('DB SERVICES', dbServices)

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
            serviceCmd.pm2OutputToState(service),
          ],
          platformResult || []
        )
      )
  // app.debug('PLATFORM SERVICES', platformState)

  // next state
  const dbKeys = t.keys(dbServices)
  const fsKeys = t.keys(fsServices)

  // seed
  if (t.isZeroLen(dbKeys)) {
    return await a.map(fsKeys, 1, async fsKey => {
      const nextService = fsServices[fsKey]
      const [seedError, seedResult] = await a.of(
        app.service('service-cmd').create(serviceCmd.safeDbItem(nextService))
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
  // app.debug('NEXT STATE SERVICES', nextFsDbPlatformState)

  const patchKeys = t.map(
    nextKey => nextFsDbPlatformState[nextKey].slug,
    t.filter(key => {
      return t.or(
        nextFsDbPlatformState[key]._shouldUpdate,
        nextFsDbPlatformState[key]._shouldRestart
      )
    }, t.keys(nextFsDbPlatformState))
  )

  const syncResult = await a.map(patchKeys, 1, async key => {
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
    // app.debug('SERVICE SYNC PAYLOAD', payload, params)

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
  // app.debug('SERVICE SYNC RESULT', syncResult)
  return syncResult
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
