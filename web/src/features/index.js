import { combineFeatures } from '@z1/lib-feature-box'

// ui
import SchemaForm from '../elements/form'
import * as primatives from '@z1/lib-ui-box-elements'

// features
import screenCmdFeature from './screen-cmd'

// main
export default combineFeatures([
  screenCmdFeature({
    ui: { SchemaForm, ...primatives },
  }),
])
