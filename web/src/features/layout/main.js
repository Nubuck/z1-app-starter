import { NOT_FOUND, createFeature } from '@z1/lib-feature-box'

// ui
import { Screen, PageNotFound } from './ui'

// state
import { navState, screenState } from './state'

// exports
export const layout = createFeature(({ ui }) => {
  return {
    name: 'layout',
    state: [screenState, navState],
    ui: {
      Screen: Screen({ ui, makeMutations: navState.mutations }),
    },
    routes: [
      {
        type: [NOT_FOUND],
        ui: PageNotFound({ ui }),
      },
    ],
  }
})
