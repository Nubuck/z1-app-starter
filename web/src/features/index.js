import { combineFeatures } from '@z1/lib-feature-box'

// ui
import * as Primatives from '@z1/lib-ui-box-elements'
import SchemaForm from '../elements/form'

// features
import layoutFeature from './layout'
import screenCmdFeature from './screen-cmd'

// main
export default combineFeatures([
  layoutFeature({ ui: { ...Primatives } }),
  screenCmdFeature({
    ui: { SchemaForm, ...Primatives },
  }),
])
