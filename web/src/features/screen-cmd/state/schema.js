import { task } from '@z1/lib-feature-box'
import { formSchema } from '@z1/lib-ui-schema'

// main
export const uiBoxSchema = task(t => props =>
  formSchema((f, T) =>
    f(
      'uiBox',
      {
        type: T.OBJECT,
      },
      [
        // layout
        f(
          'container',
          {
            type: T.OBJECT,
          },
          []
        ),
        f(
          'display',
          {
            type: T.OBJECT,
          },
          []
        ),
      ]
    )
  )
)
