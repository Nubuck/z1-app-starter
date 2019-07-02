import { formSchema } from '@z1/lib-ui-schema'

// exports
export const changePasswordSchema = ({ disabled }) => formSchema(
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