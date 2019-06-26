import { combineFeatures } from '@z1/lib-feature-box'

// ui
import * as Primatives from '@z1/lib-ui-box-elements'
import { toCss } from '@z1/lib-ui-box-tailwind'
// import SchemaForm from '../elements/form'

// features
import layoutFeature from './layout'
import landingFeaturee from './landing'
// import screenCmdFeature from './screen-cmd'

// main
export default combineFeatures([
  layoutFeature({ ui: { ...Primatives, toCss }, brand: { title: 'Z1 App' } }),
  landingFeaturee({ ui: { ...Primatives } }),
  // screenCmdFeature({
  //   ui: { SchemaForm, ...Primatives },
  // }),
])
