const spa = require('@z1/lib-spa-server')
const Stopwatch = require('timer-stopwatch')
const app = spa.createAppServer({ appFolderName: 'site' })
app.listen(8081, () => {
  console.log('SPA server started at http://localhost:8081')
  const syncInterval = 1000 * 30
  const syncTimer = new Stopwatch(syncInterval)
  const restartSyncTimer = () => {
    syncTimer.stop()
    syncTimer.reset(syncInterval)
    syncTimer.start()
  }
  syncTimer.onDone(() => {
    console.log('TIMER LAPSED', new Date())
    restartSyncTimer()
  })
  syncTimer.start()
})
