import { NOT_FOUND, createFeature } from '@z1/lib-feature-box'

// ui
import { Screen, PageNotFound } from './ui'

// state
import { brandState, navState, screenState } from './state'

// exports
export const layout = createFeature(
  ({ ui, brand }) => {
    return {
      name: 'layout',
      state: [brandState(brand), screenState, navState],
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
  },
  { brand: {} }
)
