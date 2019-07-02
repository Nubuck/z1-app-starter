import { combineViews } from '@z1/lib-feature-macros'

// views
import { changePassword } from './change-password'
import { notAuthorized } from './not-authorized'
import { resetPassword } from './reset-password'
import { signIn } from './sign-in'
import { signUp } from './sign-up'
import { verify } from './verify'

// main
export const views = combineViews([
  changePassword,
  notAuthorized,
  resetPassword,
  signIn,
  signUp,
  // verify,
])
