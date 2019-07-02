import { formSchema } from '@z1/lib-ui-schema'

// exports
export const signInSchema = ({ disabled }) => formSchema(
  (f, T) => f('signIn', {
      type: T.OBJECT,
    },
    [
      f('email', {
        title: 'Email address',
        type: T.STRING,
        format: T.FORMAT.EMAIL,
        required: true,
        ui: {
          [T.UI.WIDGET]: T.WIDGET.EMAIL,
          [T.UI.PLACEHOLDER]: 'Your email address',
          [T.UI.DISABLED]: disabled,
        },
      }),
      f('password', {
        title: 'Password',
        type: T.STRING,
        required: true,
        ui: {
          [T.UI.WIDGET]: T.WIDGET.PASSWORD,
          [T.UI.PLACEHOLDER]: 'Your password',
          [T.UI.DISABLED]: disabled,
        },
      }),
    ],
  ),
)

export const signUpSchema = ({ disabled }) => formSchema(
  (f, T) => f('signUp', {
      type: T.OBJECT,
    },
    [
      f('name', {
        title: 'First name',
        type: T.STRING,
        required: true,
        ui: {
          [T.UI.PLACEHOLDER]: 'Your first name',
          [T.UI.DISABLED]: disabled,
        },
      }),
      f('surname', {
        title: 'Surname',
        type: T.STRING,
        required: true,
        ui: {
          [T.UI.PLACEHOLDER]: 'Your surname',
          [T.UI.DISABLED]: disabled,
        },
      }),
      f('email', {
        title: 'Email address',
        type: T.STRING,
        format: T.FORMAT.EMAIL,
        required: true,
        ui: {
          [T.UI.WIDGET]: T.WIDGET.EMAIL,
          [T.UI.PLACEHOLDER]: 'Your email address',
          [T.UI.DISABLED]: disabled,
        },
      }),
      f('password', {
        title: 'Password',
        type: T.STRING,
        required: true,
        ui: {
          [T.UI.WIDGET]: T.WIDGET.PASSWORD,
          [T.UI.PLACEHOLDER]: 'Your password',
          [T.UI.DISABLED]: disabled,
        },
      }),
    ],
  ),
)

export const resetPasswordSchema = ({ disabled }) => formSchema(
  (f, T) => f('resetPassword', {
      type: T.OBJECT,
    },
    [
      f('email', {
        title: 'Email address',
        type: T.STRING,
        format: T.FORMAT.EMAIL,
        required: true,
        ui: {
          [T.UI.WIDGET]: T.WIDGET.EMAIL,
          [T.UI.PLACEHOLDER]: 'Your email address',
          [T.UI.DISABLED]: disabled,
        },
      }),
    ],
  ),
)

export const confirmResetPasswordSchema = ({ disabled }) => formSchema(
  (f, T) => f('resetPassword', {
      type: T.OBJECT,
    },
    [
      f('password', {
        title: 'New Password',
        type: T.STRING,
        required: true,
        ui: {
          [T.UI.WIDGET]: T.WIDGET.PASSWORD,
          [T.UI.PLACEHOLDER]: 'Your password',
          [T.UI.DISABLED]: disabled,
        },
      }),
      f('confirmPassword', {
        title: 'Confirm New Password',
        type: T.STRING,
        required: true,
        ui: {
          [T.UI.WIDGET]: T.WIDGET.PASSWORD,
          [T.UI.PLACEHOLDER]: 'Your password',
          [T.UI.DISABLED]: disabled,
        },
      }),
    ],
  ),
)