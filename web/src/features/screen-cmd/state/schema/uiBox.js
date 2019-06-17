import { task } from '@z1/lib-feature-box'
import { formSchema } from './formSchema'
import { uiBoxEnums } from './enums'
// main
export const uiBoxSchema = task(t =>
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
            ui: {
              classNames: 'baz-0',
            },
          },
          [
            f('all', {
              type: T.BOOL,
              ui: {
                classNames: 'baz-1',
              },
            }),
            f('sm', {
              type: T.BOOL,
              ui: {
                classNames: 'baz-1',
              },
            }),
            f('md', {
              type: T.BOOL,
              ui: {
                classNames: 'baz-1',
              },
            }),
            f('lg', {
              type: T.BOOL,
              ui: {
                classNames: 'baz-1',
              },
            }),
            f('xl', {
              type: T.BOOL,
              ui: {
                classNames: 'baz-1',
              },
            }),
          ]
        ),
        f(
          'display',
          {
            type: T.OBJECT,
            title: 'display',
            ui: {
              classNames: 'baz-0',
            },
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.display,
              ui: {
                classNames: 'baz-1',
              },
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.display,
              ui: {
                classNames: 'baz-1',
              },
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.display,
              ui: {
                classNames: 'baz-1',
              },
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.display,
              ui: {
                classNames: 'baz-1',
              },
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.display,
              ui: {
                classNames: 'baz-1',
              },
            }),
          ]
        ),
        f(
          'clearfix',
          {
            type: T.OBJECT,
            title: 'clearfix',
            ui: {
              classNames: 'baz-0',
            },
          },
          [
            f('all', {
              type: T.BOOL,
              ui: {
                classNames: 'baz-1',
              },
            }),
            f('sm', {
              type: T.BOOL,
              ui: {
                classNames: 'baz-1',
              },
            }),
            f('md', {
              type: T.BOOL,
              ui: {
                classNames: 'baz-1',
              },
            }),
            f('lg', {
              type: T.BOOL,
              ui: {
                classNames: 'baz-1',
              },
            }),
            f('xl', {
              type: T.BOOL,
               ui: {
                classNames: 'baz-1',
              },
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
              enum: uiBoxEnums.float,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.float,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.float,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.float,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.float,
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
              enum: uiBoxEnums.objectFit,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.objectFit,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.objectFit,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.objectFit,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.objectFit,
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
              enum: uiBoxEnums.objectPosition,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.objectPosition,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.objectPosition,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.objectPosition,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.objectPosition,
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
              enum: uiBoxEnums.overflows,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.overflows,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.overflows,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.overflows,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.overflows,
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
              enum: uiBoxEnums.overflows,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.overflows,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.overflows,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.overflows,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.overflows,
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
              enum: uiBoxEnums.overflows,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.overflows,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.overflows,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.overflows,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.overflows,
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
              enum: uiBoxEnums.scrolling,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.scrolling,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.scrolling,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.scrolling,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.scrolling,
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
              enum: uiBoxEnums.position,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.position,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.position,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.position,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.position,
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
              enum: uiBoxEnums.zIndex,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.zIndex,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.zIndex,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.zIndex,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.zIndex,
            }),
          ]
        ),
        f(
          'pin',
          {
            type: T.OBJECT,
            title: 'pin',
          },
          [
            f(
              'all',
              {
                type: T.OBJECT,
              },
              [
                f('top', {
                  type: T.BOOL,
                }),
                f('right', {
                  type: T.BOOL,
                }),
                f('bottom', {
                  type: T.BOOL,
                }),
                f('left', {
                  type: T.BOOL,
                }),
              ]
            ),
            f(
              'sm',
              {
                type: T.OBJECT,
              },
              [
                f('top', {
                  type: T.BOOL,
                }),
                f('right', {
                  type: T.BOOL,
                }),
                f('bottom', {
                  type: T.BOOL,
                }),
                f('left', {
                  type: T.BOOL,
                }),
              ]
            ),
            f(
              'md',
              {
                type: T.OBJECT,
              },
              [
                f('top', {
                  type: T.BOOL,
                }),
                f('right', {
                  type: T.BOOL,
                }),
                f('bottom', {
                  type: T.BOOL,
                }),
                f('left', {
                  type: T.BOOL,
                }),
              ]
            ),
            f(
              'lg',
              {
                type: T.OBJECT,
              },
              [
                f('top', {
                  type: T.BOOL,
                }),
                f('right', {
                  type: T.BOOL,
                }),
                f('bottom', {
                  type: T.BOOL,
                }),
                f('left', {
                  type: T.BOOL,
                }),
              ]
            ),
            f(
              'xl',
              {
                type: T.OBJECT,
              },
              [
                f('top', {
                  type: T.BOOL,
                }),
                f('right', {
                  type: T.BOOL,
                }),
                f('bottom', {
                  type: T.BOOL,
                }),
                f('left', {
                  type: T.BOOL,
                }),
              ]
            ),
          ]
        ),
        // end
      ]
    )
  )
)
