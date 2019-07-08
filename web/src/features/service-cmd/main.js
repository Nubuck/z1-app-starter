import { createFeature } from '@z1/lib-feature-box'
import { routeActions } from '@z1/lib-feature-macros'

// state
import { serviceCmdState } from './state'

// ui
import { ServiceCmdPage } from './ui'

// exports
export const serviceCmd = createFeature(({ ui }) => {
  return {
    name: 'account',
    state: [serviceCmdState],
    routes: [
      {
        type: routeActions(serviceCmdState.actions),
        ui: ServiceCmdPage({ ui, mutationCreators: serviceCmdState.mutations }),
      },
    ],
  }
})
