import { createFeature } from '@z1/lib-feature-box'

// ui
import { LandingPage } from './ui'

// state
import { landingState } from './state'

// exports
export const landing = createFeature(({ ui }) => {
  return {
    name: 'landing',
    state: [landingState],
    routes: [
      {
        type: [landingState.actions.routeHome, landingState.actions.routeView],
        ui: LandingPage({ ui }),
      },
    ],
  }
})
