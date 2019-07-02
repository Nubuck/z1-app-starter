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

