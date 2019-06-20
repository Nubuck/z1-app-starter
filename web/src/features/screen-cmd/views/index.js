import { combineViews } from '@z1/lib-feature-macros'

// views
import { home } from './home'
import { boxEditor } from './box-editor'
import { viewEditor } from './view-editor'

// main
export const views = combineViews([home, boxEditor, viewEditor])
