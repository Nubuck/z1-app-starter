import { combineViews } from '../macros'

// views
import { home } from './home'
import { boxEditor } from './box-editor'
import { viewEditor } from './view-editor'

// main
export const views = combineViews([home, boxEditor, viewEditor])
