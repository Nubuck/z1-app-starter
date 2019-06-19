import { createFeature, task } from '@z1/lib-feature-box'

// state
import { screenCmdState } from './state'

// ui
import { ScreenCmdPage } from './ui'

// exports
export default task(t =>
  createFeature(({}) => {
    const nextRoutes = t.filter(
      action => t.globrex('*/ROUTE_*').regex.test(action),
      t.map(([_, value]) => value, t.toPairs(screenCmdState.actions))
    )
    return {
      name: 'screenCmd',
      state: [screenCmdState],
      routes: [
        {
          type: nextRoutes,
          ui: ScreenCmdPage({ mutationCreators: screenCmdState.mutations }),
        },
      ],
    }
  })
)
