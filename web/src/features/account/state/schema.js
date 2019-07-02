import { navSchema } from '@z1/lib-ui-schema'

// public
export const authNav = navSchema(n => [
  n('/account/sign-up', {
    target: 'body-action',
    title: 'Sign-up',
    icon: 'person-outline',
  }),
  n('/account/sign-in', {
    target: 'body-action',
    title: 'Sign-in',
    icon: 'unlock-outline',
  }),
])
