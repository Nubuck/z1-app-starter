import {
  createAppServer,
  reloadAppServer,
} from '@z1/lib-feature-box-server-nedb'

// main
import features from './features'

process.on('unhandledRejection', (reason, p) =>
  console.log('Unhandled Rejection at: Promise ', p, reason)
)

let app = createAppServer(
  {
    boxes: features.api,
    namespace: 'api',
    appFolderName: 'site',
  },
  () => {
    const host = app.api.get('host')
    const port = app.api.get('port')
    app.api.log(`App Server started on http://${host}:${port}`)
  }
)

if (module.hot) {
  module.hot.accept(['./features'], () => {
    app = reloadAppServer(app, { boxes: features.api })
  })
}
