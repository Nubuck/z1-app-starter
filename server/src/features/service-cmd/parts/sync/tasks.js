import { task } from '@z1/lib-feature-box-server-nedb'
import { serviceCmd } from '../cmd'

// cmd
export const safeParse = task(t => val => {
  if (t.isNil(val)) {
    return {}
  }
  if (t.or(t.isType(val, 'Object'), t.isType(val, 'Array'))) {
    return val
  }
  if (t.isZeroLen(val)) {
    return {}
  }
  return JSON.parse(val)
})

export const pm2OutputToState = task(t => (output = {}) => {
  const topFields = t.pick(['pid', 'pm_id'], output || {})
  const envFields = t.pick(
    [
      'pm_id',
      'name',
      'status',
      'instances',
      'restart_time',
      'version',
      'exec_interpreter',
      'exec_mode',
      'pm_uptime',
    ],
    output.pm2_env || {}
  )
  return {
    pid: topFields.pid,
    pmId: envFields.pm_id,
    name: envFields.name,
    slug: t.caseTo.constantCase(envFields.name),
    version: envFields.version,
    status: envFields.status,
    instances: envFields.instances,
    restarts: envFields.restart_time,
    interpreter: envFields.exec_interpreter,
    mode: envFields.exec_mode,
    meta: t.pick(
      [
        'cwd',
        'pm_exec_path',
        'pm_out_log_path',
        'pm_err_log_path',
        'pm_pid_path',
      ],
      output.pm2_env || {}
    ),
    memory: output.monit.memory,
    cpu: output.monit.cpu,
    uptime: t.not(t.isNil(envFields.pm_uptime))
      ? new Date(envFields.pm_uptime)
      : null,
  }
})

export const safeDbItem = task(t => (item = {}) => {
  const extra = t.not(t.has('autoStart')(item))
    ? {}
    : {
        autoStart: t.eq(item.autoStart, null) ? false : item.autoStart,
      }
  return t.mergeAll([
    item,
    {
      env: t.isType(item.env, 'String')
        ? item.env
        : JSON.stringify(item.env || {}),
      meta: t.isType(item.meta, 'String')
        ? item.meta
        : JSON.stringify(item.meta || {}),
      options: t.isType(item.options, 'String')
        ? item.options
        : JSON.stringify(item.options || {}),
      dependencies: t.isType(item.dependencies, 'String')
        ? item.dependencies
        : JSON.stringify(item.dependencies || {}),
    },
    extra,
  ])
})

// ctx
const baseService = task(t => (current = {}, next = {}) => {
  return t.mergeAll([
    {
      name: '',
      description: '',
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
      dependencies: {},
    },
    current,
    {
      autoStart: t.isNil(current.autoStart) ? false : current.autoStart,
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

// pkg
export const pkgToDb = task(t => pkg => {
  const { name, alias, version, slug, cwd, cmd, dependencies } = pkg
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
        dependencies,
      },
      nextFields,
    ])
  )
})

// db
const syncFsDbItem = task(t => (fsItem, dbItem = {}) => {
  const keys = t.concat(serviceCmd.CMD_KEYS, ['autoStart', 'dependencies'])
  const remainder = t.omit(keys, safeDbItem(t.merge(dbItem, fsItem || {})))
  const nextFsItem = t.pick(keys, safeDbItem(fsItem))
  const nextDbItem = t.pick(keys, safeDbItem(dbItem))
  let _shouldUpdate = false
  const nextProps = t.map(key => {
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
  }, keys)
  return t.mergeAll(
    t.flatten([
      remainder,
      nextProps,
      { _shouldUpdate },
      { folderStatus: t.isNil(fsItem) ? 'deleted' : 'okay' },
    ])
  )
})

export const syncFsDbState = task(t => (fsState = {}, dbState = {}) => {
  const nextKeys = t.uniq(t.concat(t.keys(fsState), t.keys(dbState)))
  return t.fromPairs(
    t.map(nextKey => {
      return [nextKey, syncFsDbItem(fsState[nextKey], dbState[nextKey])]
    }, nextKeys)
  )
})

// platform
const syncFsDbPlatformItem = task(t => (fsDbItem, platformItem) => {
  const nextFsDbItem = t.pick(
    serviceCmd.PLATFORM_KEYS,
    safeDbItem(fsDbItem || {})
  )
  const nextPlatformItem = t.pick(
    serviceCmd.PLATFORM_KEYS,
    safeDbItem(t.merge(nextFsDbItem, platformItem || {}))
  )
  let _shouldRestart = false
  let _shouldUpdate = false
  const platformKeys = t.keys(nextPlatformItem)
  const nextProps = t.map(key => {
    const shouldUpdate = t.and(
      t.or(
        t.not(t.isNil(nextPlatformItem[key])),
        t.not(t.isNil(nextFsDbItem[key]))
      ),
      t.not(t.eq(nextFsDbItem[key], nextPlatformItem[key]))
    )
    if (shouldUpdate) {
      if (t.not(_shouldRestart)) {
        _shouldRestart = t.and(
          t.isNil(nextFsDbItem[key]),
          t.not(t.isNil(nextPlatformItem[key]))
        )
          ? remainder.autoStart
          : false
      }
      _shouldUpdate = true
    }
    return {
      [key]: shouldUpdate
        ? nextPlatformItem[key]
        : t.and(t.eq(key, 'status'), t.not(nextPlatformItem[key]))
        ? null
        : nextFsDbItem[key],
    }
  }, platformKeys)
  const remainder = t.omit(platformKeys, safeDbItem(fsDbItem))
  return t.mergeAll(
    t.flatten([remainder, nextProps, { _shouldRestart, _shouldUpdate }])
  )
})

export const syncFsDbPlatformState = task(t => (fsDbState, platformState) => {
  return t.fromPairs(
    t.map(fsDbKey => {
      return [
        fsDbKey,
        syncFsDbPlatformItem(fsDbState[fsDbKey], platformState[fsDbKey]),
      ]
    }, t.keys(fsDbState))
  )
})
