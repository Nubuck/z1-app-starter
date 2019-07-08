import { combineViews } from '@z1/lib-feature-macros'

// views
import { home } from './home'
import { detail } from './detail'

// main
export const views = combineViews([home, detail])
