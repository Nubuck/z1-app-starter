import { createFeature } from '@z1/lib-feature-box'
import { routeActions } from '@z1/lib-feature-macros'

// state
import { accountState } from './state'

// ui
import { AccountPage } from './ui'

// exports
export const account = createFeature(({ ui, macroNavActiveState }) => {
  const state = accountState({ macroNavActiveState })
  return {
    name: 'account',
    state: [state],
    routes: [
      {
        type: routeActions(state.actions),
        ui: AccountPage({ ui, mutationCreators: state.mutations }),
      },
    ],
  }
})
