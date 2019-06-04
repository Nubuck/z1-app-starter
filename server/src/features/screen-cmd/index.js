import { createFeature } from '@z1/lib-feature-box-server-nedb'

// api
import { screenCmdApi } from './api'

// main
export default createFeature((
  {
    /* instance props*/
  }
) => {
  return {
    name: 'screenCmd',
    api: [screenCmdApi],
  }
})
