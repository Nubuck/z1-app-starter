import { combineFeatures, task } from '@z1/lib-feature-box'

// features
import screenCmdFeature from './screen-cmd'

// main
export default combineFeatures([screenCmdFeature({})])
