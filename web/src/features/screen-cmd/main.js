import { createFeature } from '@z1/lib-feature-box'
import { routeActions } from './macros'

// state
import { screenCmdState } from './state'

// ui
import { ScreenCmdPage } from './ui'

// exports
export const screenCmd = createFeature(({}) => {
  return {
    name: 'screenCmd',
    state: [screenCmdState],
    routes: [
      {
        type: routeActions(screenCmdState.actions),
        ui: ScreenCmdPage({ mutationCreators: screenCmdState.mutations }),
      },
    ],
  }
})
