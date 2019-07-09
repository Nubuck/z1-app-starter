import { navSchema } from '@z1/lib-ui-schema'

// public
export const secureNav = navSchema(n => [
  n('/service-cmd', {
    target: 'nav',
    icon: 'cubes',
    title: 'Service Cmd',
  }),
])
