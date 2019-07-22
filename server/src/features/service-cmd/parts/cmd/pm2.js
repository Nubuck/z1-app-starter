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
    'username',
  ],

}
