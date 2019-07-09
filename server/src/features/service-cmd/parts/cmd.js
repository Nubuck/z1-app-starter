import { task } from '@z1/lib-feature-box-server-nedb'
import pm2 from 'pm2'

// transports
const connect = function() {
  return new Promise((resolve, reject) => {
    pm2.connect(err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
const disconnect = function() {
  pm2.disconnect()
}

const describeMachine = async function(procNameOrId) {
  await connect()
  return new Promise((resolve, reject) => {
    pm2.describe(procNameOrId, (err, processDescription) => {
      if (err) {
        disconnect()
        reject(err)
      } else {
        disconnect()
        resolve(processDescription)
      }
    })
  })
}
const listMachines = async function() {
  await connect()
  return new Promise((resolve, reject) => {
    pm2.list((err, processDescriptionList) => {
      if (err) {
        disconnect()
        reject(err)
      } else {
        disconnect()
        resolve(processDescriptionList)
      }
    })
  })
}
const flushMachine = async function(procNameOrId) {
  await connect()
  return new Promise((resolve, reject) => {
    pm2.flush(procNameOrId, (err, processDescription) => {
      if (err) {
        disconnect()
        reject(err)
      } else {
        disconnect()
        resolve(processDescription)
      }
    })
  })
}
const reloadLogs = async function() {
  await connect()
  return new Promise((resolve, reject) => {
    pm2.reloadLogs((err, processDescriptionList) => {
      if (err) {
        disconnect()
        reject(err)
      } else {
        disconnect()
        resolve(processDescriptionList)
      }
    })
  })
}

const startMachine = async function(processConfig) {
  await connect()
  return new Promise((resolve, reject) => {
    pm2.start(processConfig, (err, proc) => {
      if (err) {
        disconnect()
        reject(err)
      } else {
        disconnect()
        describeMachine(processConfig.name)
          .then(proc => {
            resolve(proc)
          })
          .catch(e => {
            reject(e)
          })
      }
    })
  })
}
const restartMachine = async function(procNameOrId) {
  await connect()
  return new Promise((resolve, reject) => {
    pm2.restart(procNameOrId, (err, proc) => {
      if (err) {
        disconnect()
        reject(err)
      } else {
        disconnect()
        describeMachine(procNameOrId)
          .then(proc => {
            resolve(proc)
          })
          .catch(e => {
            reject(e)
          })
      }
    })
  })
}
const reloadMachine = async function(procNameOrId) {
  await connect()
  return new Promise((resolve, reject) => {
    pm2.reload(procNameOrId, (err, proc) => {
      if (err) {
        disconnect()
        reject(err)
      } else {
        disconnect()
        describeMachine(procNameOrId)
          .then(proc => {
            resolve(proc)
          })
          .catch(e => {
            reject(e)
          })
      }
    })
  })
}
const stopMachine = async function(procNameOrId) {
  await connect()
  return new Promise((resolve, reject) => {
    pm2.stop(procNameOrId, (err, proc) => {
      if (err) {
        disconnect()
        reject(err)
      } else {
        disconnect()
        describeMachine(procNameOrId)
          .then(proc => {
            resolve(proc)
          })
          .catch(e => {
            reject(e)
          })
      }
    })
  })
}
const removeMachine = async function(procNameOrId) {
  await connect()
  return new Promise((resolve, reject) => {
    pm2.delete(procNameOrId, (err, proc) => {
      if (err) {
        disconnect()
        reject(err)
      } else {
        disconnect()
        listMachines()
          .then(procList => {
            resolve(procList)
          })
          .catch(e => {
            reject(e)
          })
      }
    })
  })
}
const killPm2 = async function() {
  return new Promise((resolve, reject) => {
    pm2.killDaemon(err => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

const pm2OutputToState = task(t => (output = {}) => {
  const topFields = t.pick(['pid', 'pm_id'], output || {})
  const envFields = t.pick(
    [
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
    pmId: topFields.pm_id,
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

const safeDbItem = task(t => item => {
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
    },
    extra,
  ])
})

// main
export const serviceCmd = {
  connect,
  disconnect,
  describe: describeMachine,
  list: listMachines,
  flush: flushMachine,
  start: startMachine,
  restart: restartMachine,
  reload: reloadMachine,
  stop: stopMachine,
  remove: removeMachine,
  kill: killPm2,
  reloadLogs,
  PM_ACTIONS: {
    START: 'start',
    STOP: 'stop',
    RESTART: 'restart',
    RELOAD: 'reload',
    REMOVE: 'remove',
  },
  PM_STATUS: {
    INIT: 'init',
    ONLINE: 'online',
    STOPPING: 'stopping',
    STOPPED: 'stopped',
    LAUNCHING: 'launching',
    ERRORED: 'errored',
    ONE_LAUNCH_STATUS: 'one-launch-status',
  },
  CMD_KEYS: [
    'name',
    'slug',
    'alias',
    'version',
    'script',
    'interpreter',
    'instances',
    'exec_mode',
    'port',
    'args',
    'node_args',
    'env',
    'options',
    'cwd',
  ],
  PLATFORM_KEYS: [
    'pid',
    'pmId',
    'version',
    'status',
    'instances',
    'restarts',
    'interpreter',
    'mode',
    'meta',
    'memory',
    'cpu',
    'uptime',
  ],
  pm2OutputToState,
  safeDbItem,
}
