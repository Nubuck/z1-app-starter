import { navSchema } from '@z1/lib-ui-schema'

// public
export const secureNav = navSchema(n => [
  n('/service-cmd', {
    target: 'nav',
    icon: 'settings-2-outline',
    title: 'Service Cmd',
  }),
])
