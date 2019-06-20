import { composeStateBox } from '@z1/lib-feature-box'
import { macroRouteViewState } from '@z1/lib-feature-macros'

// views
import { views } from './views'

// main
const name = 'screenCmd'
export const screenCmdState = composeStateBox({ name }, [
  macroRouteViewState(name, { path: '/', views: views.state }),
])
