import { task } from '@z1/lib-feature-box-server-nedb'
import { installLocal } from 'npminstall'

// main
export const installCmd = task((t, a) => async (app, service) => {
  let installErr = null
  try {
    await installLocal({ root: service.cwd })
  } catch (err) {
    installErr = err
  }
  if (installErr) {
    app.error('FAILED TO INSTALL PKG', installErr)
    const [patchErr, patchResult] = await a.of(
      app
        .service('service-cmd')
        .patch(
          service._id,
          { status: 'errored', action: null, actionStatus: null },
          { skipCmd: true }
        )
    )
    if (patchErr) {
      app.error('FAILED TO PATCH PKG', service.name, patchErr)
    }
    return patchResult
  }
  const [patchErr, patchResult] = await a.of(
    app
      .service('service-cmd')
      .patch(
        service._id,
        { status: 'ready', action: null, actionStatus: null },
        { skipCmd: true }
      )
  )
  if (patchErr) {
    app.error('FAILED TO PATCH PKG', service.name, patchErr)
  }
  return patchResult
})
