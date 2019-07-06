import { combineFeatures } from '@z1/lib-feature-box-server-nedb'

// kits
import accountFeature from '@z1/kit-account-server-nedb'

// features
import serviceCmd from './service-cmd'

// exports
export default combineFeatures([accountFeature({}), serviceCmd({})])
