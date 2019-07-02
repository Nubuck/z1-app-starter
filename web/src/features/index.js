import { combineFeatures } from '@z1/lib-feature-box'

// ui
import * as elements from '@z1/lib-ui-box-elements'
import { toCss } from '@z1/lib-ui-box-tailwind'
import SchemaForm from '../elements/form'

// features
import accountFeature from './account'
import layoutFeature from './layout'
import landingFeaturee from './landing'

// main
export default combineFeatures([
  accountFeature({ ui: { ...elements, SchemaForm } }),
  layoutFeature({ ui: { ...elements, toCss }, brand: { title: 'Z1 App' } }),
  landingFeaturee({ ui: { ...elements } }),
])
