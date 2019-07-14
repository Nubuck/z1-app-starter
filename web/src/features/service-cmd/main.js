import { createFeature } from '@z1/lib-feature-box'
import { routeActions } from '@z1/lib-feature-macros'

// state
import { serviceCmdState } from './state'

// ui
import { ServiceCmdPage } from './ui'

// exports
export const serviceCmd = createFeature(({ ui, macroNavActiveState }) => {
  const state = serviceCmdState({ macroNavActiveState })
  return {
    name: 'serviceCmd',
    state: [state],
    routes: [
      {
        type: routeActions(state.actions),
        ui: ServiceCmdPage({ ui, mutationCreators: state.mutations }),
      },
    ],
  }
})
