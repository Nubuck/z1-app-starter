const spa = require('@z1/lib-spa-server')
const app = spa.createAppServer({ appFolderName: 'site' })
app.listen(8082, () =>
  console.log('SPA server started at http://localhost:8082')
)
