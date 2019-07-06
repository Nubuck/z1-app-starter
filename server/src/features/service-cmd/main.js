import { createApiBox } from '@z1/lib-feature-box-server-nedb'

// parts
import { models, services, bootCmdService } from './parts'

// exports
export const serviceCmdApi = createApiBox({
  models,
  services,
  lifecycle: {
    onSync(app) {
      bootCmdService(app)
    },
  },
})
