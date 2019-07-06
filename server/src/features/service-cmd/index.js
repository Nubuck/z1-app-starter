import { createFeature } from '@z1/lib-feature-box-server-nedb'

import { serviceCmdApi } from './main'

// exports
export default createFeature((
  {
    /* instance props*/
  }
) => {
  return {
    name: 'serviceCmd',
    api: [serviceCmdApi],
  }
})
