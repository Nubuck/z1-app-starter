import { createApiBox } from '@z1/lib-feature-box-server-nedb'

// main
export const screenCmdApi = createApiBox({
  models(m) {
    return [m('screen_cmd')]
  },
  services(s, m, h) {
    return [
      s(
        'screen-cmd',
        {
          Model: m.screen_cmd,
        },
        {
          hooks: {
            before: {
              create: [h.auth.authenticate('jwt')],
              update: [h.auth.authenticate('jwt')],
              patch: [h.auth.authenticate('jwt')],
              remove: [h.auth.authenticate('jwt')],
            },
          },
        }
      ),
    ]
  },
  lifecycle: {
    onSync(app) {
      app.debug('SCREEN CMD FEATURE ON SYNC')
    },
  },
})
