import { task } from '@z1/lib-feature-box-server-nedb'

// main
export const cmdEvents = task((t, a) => ({
  onPatched(data, ctx) {
    console.log(
      'ON PATCHED',
      t.keys(ctx),
      ctx.service.eventNames(),
      ctx.app.channels
    )
    ctx.service.emit('log-pub',data)
  },
  onRemoved(data, params) {},
}))
