import { composeStateBox } from '@z1/lib-feature-box'
import { macroRouteViewState } from '@z1/lib-feature-macros'

// views
import { views } from '../views'

// parts
import { auth } from './auth'

// schema
import { authNav, secureNav } from './schema'

// main
const name = 'account'
export const accountState = ({ macroNavActiveState }) =>
  composeStateBox({ name }, [
    auth,
    macroRouteViewState(name, { path: '/account', views: views.state }),
    macroNavActiveState(name, { anon: authNav, secure: secureNav }),
  ])
