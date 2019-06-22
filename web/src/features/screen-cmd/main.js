import { createFeature } from '@z1/lib-feature-box'
import { routeActions } from '@z1/lib-feature-macros'

// state
import { screenCmdState } from './state'

// ui
import { ScreenCmdPage } from './ui'

// exports
export const screenCmd = createFeature(({ ui }) => {
  return {
    name: 'screenCmd',
    state: [screenCmdState],
    routes: [
      {
        type: routeActions(screenCmdState.actions),
        ui: ScreenCmdPage({ ui, mutationCreators: screenCmdState.mutations }),
      },
    ],
  }
})
