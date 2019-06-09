import { task } from '@z1/lib-feature-box'
import { formSchema } from './formSchema'

import { uiBoxTypes } from './types'

// main
export const uiBoxSchema = task(t =>
  formSchema((f, T) =>
    f(
      'uiBox',
      {
        type: T.OBJECT,
        title: 'UI Box',
      },
      [
        f(
          'uiBoxList',
          {
            type: T.ARRAY,
            title: 'Box Props',
          },
          [
            f(
              'dynoProp',
              { type: T.OBJECT, title: 'Select Prop', childKey: 'oneOf' },
              [
                f('container', { title: 'container', type: T.OBJECT }, [
                  f('all', { type: T.BOOL }),
                  f('sm', { type: T.BOOL }),
                ]),
                f('clearfix', { title: 'clearfix', type: T.OBJECT }, [
                  f('all', { type: T.BOOL }),
                  f('sm', { type: T.BOOL }),
                ]),
                f('float', { title: 'float', type: T.OBJECT }, [
                  f('all', { type: T.BOOL }),
                  f('sm', { type: T.BOOL }),
                ]),
              ]
            ),
          ]
        ),
      ]
    )
  )
)
