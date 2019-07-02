import { formSchema } from '@z1/lib-ui-schema'

// exports
export const resetPasswordSchema = ({ disabled }) =>
  formSchema((f, T) =>
    f(
      'resetPassword',
      {
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
      ]
    )
  )
