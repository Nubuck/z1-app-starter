import { BoxEditorView } from './BoxEditorView'
import { HomeView } from './HomeView'
import { LayoutEditorView } from './LayoutEditorView'

// ctx
import { VIEWS } from '../../ctx'

// main
export const makeViews = props => ({
  [VIEWS.HOME]: HomeView(props),
  [VIEWS.BOX_EDITOR]: BoxEditorView(props),
  [VIEWS.VIEW_EDITOR]: LayoutEditorView(props),
})
