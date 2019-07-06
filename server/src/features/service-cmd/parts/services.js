import { task } from '@z1/lib-feature-box-server-nedb'
import { cmdHooksServices } from './hooks'
export const services = (s, m, { auth, data }) => {
  return [
    s(
      'service-cmd',
      {
        Model: m.services_state,
      },
      {
        hooks: {
          before: {
            get: [auth.authenticate('jwt')],
            find: [auth.authenticate('jwt'), data.safeFindMSSQL],
            create: [auth.authenticate('jwt')],
            update: [auth.authenticate('jwt')],
            patch: [auth.authenticate('jwt'), cmdHooksServices.beforePatch],
            remove: [auth.authenticate('jwt')],
          },
          after: {
            find: [
              task(t => ctx => {
                ctx.result.data = t.map(
                  item =>
                    t.merge(item, {
                      env: JSON.parse(item.env || '{}'),
                      options: JSON.parse(item.options || '{}'),
                      meta: JSON.parse(item.meta || '{}'),
                    }),
                  ctx.result.data || []
                )
                return ctx
              }),
            ],
            create: [],
            patch: [cmdHooksServices.afterPatch],
            remove: [],
          },
        },
      }
    ),
  ]
}
