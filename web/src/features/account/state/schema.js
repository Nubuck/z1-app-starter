import { navSchema } from '@z1/lib-ui-schema'

// public
export const authNav = navSchema(n => [
  n('/account/sign-up', {
    target: 'body-action',
    title: 'Sign-up',
    icon: 'user',
  }),
  n('/account/sign-in', {
    target: 'body-action',
    title: 'Sign-in',
    icon: 'unlock-alt',
  }),
])

export const secureNav = navSchema(n => [
  n('/#sign-out', {
    target: 'primary-action',
    // borderWidth: 2,
    icon: 'sign-out',
    title: 'Sign-out',
    action: {
      type: 'account/SIGN_OUT',
      payload: null,
    },
  }),
])