import { createFeature } from '@z1/lib-feature-box'

// state
import { screenCmdState } from './state'

// ui
import { ScreenCmdPage } from './ui'

// exports
export default createFeature(({}) => {
  return {
    name: 'screenCmd',
    state: [screenCmdState],
    routes: [
      {
        type: [screenCmdState.actions.routeHome],
        ui: ScreenCmdPage({ mutations: screenCmdState.mutations }),
      },
    ],
  }
})
