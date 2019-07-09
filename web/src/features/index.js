import { combineFeatures } from '@z1/lib-feature-box'

// ui
import * as elements from '@z1/lib-ui-box-elements'
import { toCss } from '@z1/lib-ui-box-tailwind'
import SchemaForm from '../elements/form'
import SelectNext from 'react-select'
import { AutoSizer, List } from 'react-virtualized'

// features
import accountFeature from './account'
import layoutFeature from './layout'
import landingFeature from './landing'
import serviceCmdFeature from './service-cmd'

// main
export default combineFeatures([
  accountFeature({ ui: { ...elements, SchemaForm } }),
  layoutFeature({ ui: { ...elements, toCss }, brand: { title: 'Z1 App' } }),
  landingFeature({ ui: { ...elements } }),
  serviceCmdFeature({
    ui: { ...elements, SchemaForm, AutoSizer, List, SelectNext },
  }),
])
