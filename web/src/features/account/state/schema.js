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

export const secureNav = navSchema(n => [
  n('/#sign-out', {
    target: 'primary-action',
    borderWidth: 2,
    icon: 'log-out-outline',
    title: 'Sign-out',
    action: {
      type: 'account/SIGN_OUT',
      payload: null,
    },
  }),
])