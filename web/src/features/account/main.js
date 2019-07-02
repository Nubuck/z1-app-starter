import { createFeature } from '@z1/lib-feature-box'
import { routeActions } from '@z1/lib-feature-macros'

// state
import { accountState } from './state'

// ui
import { AccountPage } from './ui'

// exports
export const account = createFeature(({ ui }) => {
  return {
    name: 'account',
    state: [accountState],
    routes: [
      {
        type: routeActions(accountState.actions),
        ui: AccountPage({ ui, mutationCreators: accountState.mutations }),
      },
    ],
  }
})
