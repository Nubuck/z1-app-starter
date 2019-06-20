import { createFeature } from '@z1/lib-feature-box'

// state
import { screenCmdState, routeActions } from './state'

// ui
import { ScreenCmdPage } from './ui'

// exports
export default createFeature(({}) => {
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
