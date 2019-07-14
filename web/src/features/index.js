import { combineFeatures } from '@z1/lib-feature-box'

// ui
import * as elements from '@z1/lib-ui-box-elements'
import { toCss } from '@z1/lib-ui-box-tailwind'
import SchemaForm from '../elements/form'
import { AutoSizer, List } from 'react-virtualized'

// features
import accountFeature from './account'
import layoutFeature from './layout'
import landingFeature from './landing'
import serviceCmdFeature from './service-cmd'

// unpack
const layout = layoutFeature({
  ui: { ...elements, toCss },
  brand: { title: 'Z1 App' },
})
const { macroNavActiveState } = layout.tasks

// main
export default combineFeatures([
  layout,
  accountFeature({ ui: { ...elements, SchemaForm }, macroNavActiveState }),
  landingFeature({ ui: { ...elements }, macroNavActiveState }),
  serviceCmdFeature({
    ui: { ...elements, SchemaForm, AutoSizer, List },
    macroNavActiveState,
  }),
])
