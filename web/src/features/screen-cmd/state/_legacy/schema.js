import { task } from '@z1/lib-feature-box'
import { formSchema } from '@z1/lib-ui-schema'

// types
const display = [
  'hidden',
  'block',
  'inline-block',
  'flex',
  'inline-flex',
  'inline',
  'table',
  'table-row',
  'table-cell',
]
const float = ['none', 'left', 'right']
const objectFit = ['none', 'contain', 'cover', 'fill', 'scale-down']
const objectPosition = [
  'bottom',
  'center',
  'left',
  'left-bottom',
  'left-top',
  'right',
  'right-bottom',
  'right-top',
  'top',
]
const overflows = ['auto', 'hidden', 'visible', 'scroll']
const scrolling = ['auto', 'touch']
const position = ['static', 'fixed', 'absolute', 'relative', 'sticky']
const zIndex = ['auto', 0, 10, 20, 30, 40, 50]
// main
export const uiBoxSchema = task(t => props =>
  formSchema((f, T) =>
    f(
      'uiBox',
      {
        type: T.OBJECT,
        title: 'UI Box Editor',
      },
      [
        // layout
        f(
          'container',
          {
            type: T.OBJECT,
            title: 'container',
          },
          [
            f('all', {
              type: T.BOOL,
            }),
            f('sm', {
              type: T.BOOL,
            }),
            f('md', {
              type: T.BOOL,
            }),
            f('lg', {
              type: T.BOOL,
            }),
            f('xl', {
              type: T.BOOL,
            }),
          ]
        ),
        f(
          'display',
          {
            type: T.OBJECT,
            title: 'display',
          },
          [
            f('all', {
              type: T.STRING,
              enum: display,
            }),
            f('sm', {
              type: T.STRING,
              enum: display,
            }),
            f('md', {
              type: T.STRING,
              enum: display,
            }),
            f('lg', {
              type: T.STRING,
              enum: display,
            }),
            f('xl', {
              type: T.STRING,
              enum: display,
            }),
          ]
        ),
        f(
          'clearfix',
          {
            type: T.OBJECT,
            title: 'clearfix',
          },
          [
            f('all', {
              type: T.BOOL,
            }),
            f('sm', {
              type: T.BOOL,
            }),
            f('md', {
              type: T.BOOL,
            }),
            f('lg', {
              type: T.BOOL,
            }),
            f('xl', {
              type: T.BOOL,
            }),
          ]
        ),
        f(
          'float',
          {
            type: T.OBJECT,
            title: 'float',
          },
          [
            f('all', {
              type: T.STRING,
              enum: float,
            }),
            f('sm', {
              type: T.STRING,
              enum: float,
            }),
            f('md', {
              type: T.STRING,
              enum: float,
            }),
            f('lg', {
              type: T.STRING,
              enum: float,
            }),
            f('xl', {
              type: T.STRING,
              enum: float,
            }),
          ]
        ),
        f(
          'objectFit',
          {
            type: T.OBJECT,
            title: 'object fit',
          },
          [
            f('all', {
              type: T.STRING,
              enum: objectFit,
            }),
            f('sm', {
              type: T.STRING,
              enum: objectFit,
            }),
            f('md', {
              type: T.STRING,
              enum: objectFit,
            }),
            f('lg', {
              type: T.STRING,
              enum: objectFit,
            }),
            f('xl', {
              type: T.STRING,
              enum: objectFit,
            }),
          ]
        ),
        f(
          'objectPosition',
          {
            type: T.OBJECT,
            title: 'object position',
          },
          [
            f('all', {
              type: T.STRING,
              enum: objectPosition,
            }),
            f('sm', {
              type: T.STRING,
              enum: objectPosition,
            }),
            f('md', {
              type: T.STRING,
              enum: objectPosition,
            }),
            f('lg', {
              type: T.STRING,
              enum: objectPosition,
            }),
            f('xl', {
              type: T.STRING,
              enum: objectPosition,
            }),
          ]
        ),
        f(
          'overflow',
          {
            type: T.OBJECT,
            title: 'overflow',
          },
          [
            f('all', {
              type: T.STRING,
              enum: overflows,
            }),
            f('sm', {
              type: T.STRING,
              enum: overflows,
            }),
            f('md', {
              type: T.STRING,
              enum: overflows,
            }),
            f('lg', {
              type: T.STRING,
              enum: overflows,
            }),
            f('xl', {
              type: T.STRING,
              enum: overflows,
            }),
          ]
        ),
        f(
          'overflowX',
          {
            type: T.OBJECT,
            title: 'overflow X',
          },
          [
            f('all', {
              type: T.STRING,
              enum: overflows,
            }),
            f('sm', {
              type: T.STRING,
              enum: overflows,
            }),
            f('md', {
              type: T.STRING,
              enum: overflows,
            }),
            f('lg', {
              type: T.STRING,
              enum: overflows,
            }),
            f('xl', {
              type: T.STRING,
              enum: overflows,
            }),
          ]
        ),
        f(
          'overflowY',
          {
            type: T.OBJECT,
            title: 'overflow Y',
          },
          [
            f('all', {
              type: T.STRING,
              enum: overflows,
            }),
            f('sm', {
              type: T.STRING,
              enum: overflows,
            }),
            f('md', {
              type: T.STRING,
              enum: overflows,
            }),
            f('lg', {
              type: T.STRING,
              enum: overflows,
            }),
            f('xl', {
              type: T.STRING,
              enum: overflows,
            }),
          ]
        ),
        f(
          'scrolling',
          {
            type: T.OBJECT,
            title: 'scrolling',
          },
          [
            f('all', {
              type: T.STRING,
              enum: scrolling,
            }),
            f('sm', {
              type: T.STRING,
              enum: scrolling,
            }),
            f('md', {
              type: T.STRING,
              enum: scrolling,
            }),
            f('lg', {
              type: T.STRING,
              enum: scrolling,
            }),
            f('xl', {
              type: T.STRING,
              enum: scrolling,
            }),
          ]
        ),
        f(
          'position',
          {
            type: T.OBJECT,
            title: 'position',
          },
          [
            f('all', {
              type: T.STRING,
              enum: position,
            }),
            f('sm', {
              type: T.STRING,
              enum: position,
            }),
            f('md', {
              type: T.STRING,
              enum: position,
            }),
            f('lg', {
              type: T.STRING,
              enum: position,
            }),
            f('xl', {
              type: T.STRING,
              enum: position,
            }),
          ]
        ),
        f(
          'inset',
          {
            type: T.OBJECT,
            title: 'inset',
          },
          [
            f('all', {
              type: T.BOOL,
            }),
            f('sm', {
              type: T.BOOL,
            }),
            f('md', {
              type: T.BOOL,
            }),
            f('lg', {
              type: T.BOOL,
            }),
            f('xl', {
              type: T.BOOL,
            }),
          ]
        ),
        f(
          'insetX',
          {
            type: T.OBJECT,
            title: 'inset X',
          },
          [
            f('all', {
              type: T.BOOL,
            }),
            f('sm', {
              type: T.BOOL,
            }),
            f('md', {
              type: T.BOOL,
            }),
            f('lg', {
              type: T.BOOL,
            }),
            f('xl', {
              type: T.BOOL,
            }),
          ]
        ),
        f(
          'insetY',
          {
            type: T.OBJECT,
            title: 'inset Y',
          },
          [
            f('all', {
              type: T.BOOL,
            }),
            f('sm', {
              type: T.BOOL,
            }),
            f('md', {
              type: T.BOOL,
            }),
            f('lg', {
              type: T.BOOL,
            }),
            f('xl', {
              type: T.BOOL,
            }),
          ]
        ),
        f(
          'visible',
          {
            type: T.OBJECT,
            title: 'visible',
          },
          [
            f('all', {
              type: T.BOOL,
            }),
            f('sm', {
              type: T.BOOL,
            }),
            f('md', {
              type: T.BOOL,
            }),
            f('lg', {
              type: T.BOOL,
            }),
            f('xl', {
              type: T.BOOL,
            }),
          ]
        ),
        f(
          'zIndex',
          {
            type: T.OBJECT,
            title: 'zIndex',
          },
          [
            f('all', {
              type: T.STRING,
              enum: zIndex,
            }),
            f('sm', {
              type: T.STRING,
              enum: zIndex,
            }),
            f('md', {
              type: T.STRING,
              enum: zIndex,
            }),
            f('lg', {
              type: T.STRING,
              enum: zIndex,
            }),
            f('xl', {
              type: T.STRING,
              enum: zIndex,
            }),
          ]
        ),
        // f(
        //   'pin',
        //   {
        //     type: T.OBJECT,
        //     title: 'pin',
        //   },
        //   [
        //     f(
        //       'all',
        //       {
        //         type: T.OBJECT,
        //       },
        //       [
        //         f('top', {
        //           type: T.BOOL,
        //         }),
        //         f('right', {
        //           type: T.BOOL,
        //         }),
        //         f('bottom', {
        //           type: T.BOOL,
        //         }),
        //         f('left', {
        //           type: T.BOOL,
        //         }),
        //       ]
        //     ),
        //     f(
        //       'sm',
        //       {
        //         type: T.OBJECT,
        //       },
        //       [
        //         f('top', {
        //           type: T.BOOL,
        //         }),
        //         f('right', {
        //           type: T.BOOL,
        //         }),
        //         f('bottom', {
        //           type: T.BOOL,
        //         }),
        //         f('left', {
        //           type: T.BOOL,
        //         }),
        //       ]
        //     ),
        //     f(
        //       'md',
        //       {
        //         type: T.OBJECT,
        //       },
        //       [
        //         f('top', {
        //           type: T.BOOL,
        //         }),
        //         f('right', {
        //           type: T.BOOL,
        //         }),
        //         f('bottom', {
        //           type: T.BOOL,
        //         }),
        //         f('left', {
        //           type: T.BOOL,
        //         }),
        //       ]
        //     ),
        //     f(
        //       'lg',
        //       {
        //         type: T.OBJECT,
        //       },
        //       [
        //         f('top', {
        //           type: T.BOOL,
        //         }),
        //         f('right', {
        //           type: T.BOOL,
        //         }),
        //         f('bottom', {
        //           type: T.BOOL,
        //         }),
        //         f('left', {
        //           type: T.BOOL,
        //         }),
        //       ]
        //     ),
        //     f(
        //       'xl',
        //       {
        //         type: T.OBJECT,
        //       },
        //       [
        //         f('top', {
        //           type: T.BOOL,
        //         }),
        //         f('right', {
        //           type: T.BOOL,
        //         }),
        //         f('bottom', {
        //           type: T.BOOL,
        //         }),
        //         f('left', {
        //           type: T.BOOL,
        //         }),
        //       ]
        //     ),
        //   ]
        // ),
        // end
      ]
    )
  )
)
