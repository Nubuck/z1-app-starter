import { NOT_FOUND, createFeature } from '@z1/lib-feature-box'

// ui
import { Screen, PageNotFound } from './ui'

// state

// exports
export const layout = createFeature(({ ui }) => {
  return {
    name: 'layout',
    state: [],
    ui: {
      Screen: Screen({ ui }),
    },
    routes: [
      {
        type: [NOT_FOUND],
        ui: PageNotFound({ ui }),
      },
    ],
  }
})
