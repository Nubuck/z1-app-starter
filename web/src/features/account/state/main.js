import { composeStateBox } from '@z1/lib-feature-box'
import { macroRouteViewState } from '@z1/lib-feature-macros'

// views
import { views } from '../views'

// parts
import { auth } from './auth'

// main
const name = 'account'
export const accountState = composeStateBox({ name }, [
  auth,
  macroRouteViewState(name, { path: '/account/', views: views.state }),
])
