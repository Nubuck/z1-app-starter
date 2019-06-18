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
            title: 'Container',
            ui: {
              classNames: 'baz-0',
            },
          },
          [
            f('all', {
              type: T.BOOL,
              ui: {
                classNames: 's',
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
            title: 'Display',
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
            title: 'Clearfix',
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
            title: 'Float',
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
            title: 'Object Fit',
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
            title: 'Object Position',
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
            title: 'Overflow',
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
            title: 'Overflow Horizontal',
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
            title: 'Overflow Vertical',
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
            title: 'Scrolling',
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
            title: 'Position',
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
            title: 'Inset',
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
            title: 'Inset Horizontal',
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
            title: 'Inset Vertical',
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
            title: 'Visible',
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
            title: 'Z-index',
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
            title: 'Pin',
          },
          [
            f(
              'all',
              {
                type: T.OBJECT,
                ui: {
                  classNames: 'baz deep',
                },
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
        // borders
        f(
          'borderColor',
          {
            type: T.OBJECT,
            title: 'Border Color',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.colors,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.colors,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.colors,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.colors,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.colors,
            }),
            f('hover', {
              type: T.STRING,
              enum: uiBoxEnums.colors,
            }),
            f('focus', {
              type: T.STRING,
              enum: uiBoxEnums.colors,
            }),
          ]
        ),
        f(
          'borderStyle',
          {
            type: T.OBJECT,
            title: 'Border Style',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.borderStyle,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.borderStyle,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.borderStyle,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.borderStyle,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.borderStyle,
            }),
          ]
        ),
        f(
          'borderSize',
          {
            type: T.OBJECT,
            title: 'Border Size',
          },
          [
            f(
              'all',
              {
                type: T.OBJECT,
              },
              [
                f('top', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderSizes,
                }),
                f('right', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderSizes,
                }),
                f('bottom', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderSizes,
                }),
                f('left', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderSizes,
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
                  type: T.STRING,
                  enum: uiBoxEnums.borderSizes,
                }),
                f('right', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderSizes,
                }),
                f('bottom', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderSizes,
                }),
                f('left', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderSizes,
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
                  type: T.STRING,
                  enum: uiBoxEnums.borderSizes,
                }),
                f('right', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderSizes,
                }),
                f('bottom', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderSizes,
                }),
                f('left', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderSizes,
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
                  type: T.STRING,
                  enum: uiBoxEnums.borderSizes,
                }),
                f('right', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderSizes,
                }),
                f('bottom', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderSizes,
                }),
                f('left', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderSizes,
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
                  type: T.STRING,
                  enum: uiBoxEnums.borderSizes,
                }),
                f('right', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderSizes,
                }),
                f('bottom', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderSizes,
                }),
                f('left', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderSizes,
                }),
              ]
            ),
          ]
        ),
        f(
          'borderRadius',
          {
            type: T.OBJECT,
            title: 'Border Radius',
          },
          [
            f(
              'all',
              {
                type: T.OBJECT,
              },
              [
                f('top', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('right', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('bottom', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('left', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('topRight', {
                  title: 'Top Right',
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('topLeft', {
                  title: 'Top Left',
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('bottomRight', {
                  title: 'Bottom Right',
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('bottomLeft', {
                  title: 'Bottom Left',
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
              ]
            ),
            f(
              'alsml',
              {
                type: T.OBJECT,
              },
              [
                f('top', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('right', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('bottom', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('left', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('topRight', {
                  title: 'Top Right',
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('topLeft', {
                  title: 'Top Left',
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('bottomRight', {
                  title: 'Bottom Right',
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('bottomLeft', {
                  title: 'Bottom Left',
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
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
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('right', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('bottom', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('left', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('topRight', {
                  title: 'Top Right',
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('topLeft', {
                  title: 'Top Left',
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('bottomRight', {
                  title: 'Bottom Right',
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('bottomLeft', {
                  title: 'Bottom Left',
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
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
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('right', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('bottom', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('left', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('topRight', {
                  title: 'Top Right',
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('topLeft', {
                  title: 'Top Left',
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('bottomRight', {
                  title: 'Bottom Right',
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('bottomLeft', {
                  title: 'Bottom Left',
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
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
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('right', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('bottom', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('left', {
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('topRight', {
                  title: 'Top Right',
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('topLeft', {
                  title: 'Top Left',
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('bottomRight', {
                  title: 'Bottom Right',
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
                f('bottomLeft', {
                  title: 'Bottom Left',
                  type: T.STRING,
                  enum: uiBoxEnums.borderRadius,
                }),
              ]
            ),
          ]
        ),
        // sizes
        f(
          'width',
          {
            type: T.OBJECT,
            title: 'Width',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.sizes,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.sizes,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.sizes,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.sizes,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.sizes,
            }),
          ]
        ),
        f(
          'maxWidth',
          {
            type: T.OBJECT,
            title: 'Max Width',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.maxWidth,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.maxWidth,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.maxWidth,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.maxWidth,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.maxWidth,
            }),
          ]
        ),
        f(
          'height',
          {
            type: T.OBJECT,
            title: 'Height',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.sizes,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.sizes,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.sizes,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.sizes,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.sizes,
            }),
          ]
        ),
        f(
          'maxHeight',
          {
            type: T.OBJECT,
            title: 'Max Height',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.maxHeight,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.maxHeight,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.maxHeight,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.maxHeight,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.maxHeight,
            }),
          ]
        ),
        // typography
        f(
          'color',
          {
            type: T.OBJECT,
            title: 'Color',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.colors,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.colors,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.colors,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.colors,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.colors,
            }),
            f('hover', {
              type: T.STRING,
              enum: uiBoxEnums.colors,
            }),
            f('focus', {
              type: T.STRING,
              enum: uiBoxEnums.colors,
            }),
          ]
        ),
        f(
          'fontFamily',
          {
            type: T.OBJECT,
            title: 'Font Family',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.fontFamily,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.fontFamily,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.fontFamily,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.fontFamily,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.fontFamily,
            }),
          ]
        ),
        f(
          'fontSmoothing',
          {
            type: T.OBJECT,
            title: 'Font Smoothing',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.fontSmoothing,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.fontSmoothing,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.fontSmoothing,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.fontSmoothing,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.fontSmoothing,
            }),
          ]
        ),
        f(
          'fontStyle',
          {
            type: T.OBJECT,
            title: 'Font Style',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.fontStyle,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.fontStyle,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.fontStyle,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.fontStyle,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.fontStyle,
            }),
          ]
        ),
        f(
          'fontWeight',
          {
            type: T.OBJECT,
            title: 'Font Weight',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.fontWeight,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.fontWeight,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.fontWeight,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.fontWeight,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.fontWeight,
            }),
            f('hover', {
              type: T.STRING,
              enum: uiBoxEnums.fontWeight,
            }),
            f('focus', {
              type: T.STRING,
              enum: uiBoxEnums.fontWeight,
            }),
          ]
        ),
        f(
          'letterSpacing',
          {
            type: T.OBJECT,
            title: 'Letter Spacing',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.letterSpacing,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.letterSpacing,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.letterSpacing,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.letterSpacing,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.fontWeiletterSpacingght,
            }),
          ]
        ),
        f(
          'lineHeight',
          {
            type: T.OBJECT,
            title: 'Line Height',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.lineHeight,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.lineHeight,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.lineHeight,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.lineHeight,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.lineHeight,
            }),
          ]
        ),
        f(
          'listType',
          {
            type: T.OBJECT,
            title: 'List Type',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.listType,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.listType,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.listType,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.listType,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.listType,
            }),
          ]
        ),
        f(
          'listPosition',
          {
            type: T.OBJECT,
            title: 'List Position',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.listPosition,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.listPosition,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.listPosition,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.listPosition,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.listPosition,
            }),
          ]
        ),
        f(
          'textAlignX',
          {
            type: T.OBJECT,
            title: 'Text Align Horizontal',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.textAlignX,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.textAlignX,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.textAlignX,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.textAlignX,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.textAlignX,
            }),
          ]
        ),
        f(
          'textAlignY',
          {
            type: T.OBJECT,
            title: 'Text Align Vertical',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.textAlignY,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.textAlignY,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.textAlignY,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.textAlignY,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.textAlignY,
            }),
          ]
        ),
        f(
          'textDecoration',
          {
            type: T.OBJECT,
            title: 'Text Decoration',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.textDecoration,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.textDecoration,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.textDecoration,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.textDecoration,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.textDecoration,
            }),
          ]
        ),
        f(
          'textTransform',
          {
            type: T.OBJECT,
            title: 'Text Transform',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.textTransform,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.textTransform,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.textTransform,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.textTransform,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.textTransform,
            }),
          ]
        ),
        f(
          'whitespace',
          {
            type: T.OBJECT,
            title: 'Whitespace',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.whitespace,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.whitespace,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.whitespace,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.whitespace,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.whitespace,
            }),
          ]
        ),
        f(
          'wordBreak',
          {
            type: T.OBJECT,
            title: 'Word Break',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.wordBreak,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.wordBreak,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.wordBreak,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.wordBreak,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.wordBreak,
            }),
          ]
        ),
        // flex
        f(
          'flex',
          {
            type: T.OBJECT,
            title: 'Flex',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.flex,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.flex,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.flex,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.flex,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.flex,
            }),
          ]
        ),
        f(
          'flexDirection',
          {
            type: T.OBJECT,
            title: 'Flex Direction',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.flexDirection,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.flexDirection,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.flexDirection,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.flexDirection,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.flexDirection,
            }),
          ]
        ),
        f(
          'flexWrap',
          {
            type: T.OBJECT,
            title: 'Flex Wrap',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.flexWrap,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.flexWrap,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.flexWrap,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.flexWrap,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.flexWrap,
            }),
          ]
        ),
        f(
          'alignItems',
          {
            type: T.OBJECT,
            title: 'Align Items',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.alignItems,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.alignItems,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.alignItems,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.alignItems,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.alignItems,
            }),
          ]
        ),
        f(
          'alignContent',
          {
            type: T.OBJECT,
            title: 'Align Content',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.alignContent,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.alignContent,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.alignContent,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.alignContent,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.alignContent,
            }),
          ]
        ),
        f(
          'alignSelf',
          {
            type: T.OBJECT,
            title: 'Align Self',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.alignSelf,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.alignSelf,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.alignSelf,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.alignSelf,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.alignSelf,
            }),
          ]
        ),
        f(
          'justifyContent',
          {
            type: T.OBJECT,
            title: 'Justify Content',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.alignContent,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.alignContent,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.alignContent,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.alignContent,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.alignContent,
            }),
          ]
        ),
        f(
          'flexGrow',
          {
            type: T.OBJECT,
            title: 'Flex Grow',
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
          'flexShrink',
          {
            type: T.OBJECT,
            title: 'Flex Shrink',
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
          'flexOrder',
          {
            type: T.OBJECT,
            title: 'Flex Order',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.flexOrder,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.flexOrder,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.flexOrder,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.flexOrder,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.flexOrder,
            }),
          ]
        ),
        // tables
        f(
          'tableCollapse',
          {
            type: T.OBJECT,
            title: 'Table Collapse',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.tableCollapse,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.tableCollapse,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.tableCollapse,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.tableCollapse,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.tableCollapse,
            }),
          ]
        ),
        f(
          'tableLayout',
          {
            type: T.OBJECT,
            title: 'Table Layout',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.tableLayout,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.tableLayout,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.tableLayout,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.tableLayout,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.tableLayout,
            }),
          ]
        ),
        // backgrounds
        f(
          'bgAttachment',
          {
            type: T.OBJECT,
            title: 'Background Attachmemnt',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.bgAttachment,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.bgAttachment,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.bgAttachment,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.bgAttachment,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.bgAttachment,
            }),
          ]
        ),
        f(
          'bgColor',
          {
            type: T.OBJECT,
            title: 'Background Color',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.colors,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.colors,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.colors,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.colors,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.colors,
            }),
            f('hover', {
              type: T.STRING,
              enum: uiBoxEnums.colors,
            }),
            f('focus', {
              type: T.STRING,
              enum: uiBoxEnums.colors,
            }),
          ]
        ),
        f(
          'bgPosition',
          {
            type: T.OBJECT,
            title: 'Background Position',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.bgPosition,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.bgPosition,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.bgPosition,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.bgPosition,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.bgPosition,
            }),
          ]
        ),
        f(
          'bgRepeat',
          {
            type: T.OBJECT,
            title: 'Background Repeat',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.bgRepeat,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.bgRepeat,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.bgRepeat,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.bgRepeat,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.bgRepeat,
            }),
          ]
        ),
        f(
          'bgSize',
          {
            type: T.OBJECT,
            title: 'Background Size',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.bgSize,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.bgSize,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.bgSize,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.bgSize,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.bgSize,
            }),
          ]
        ),
        // spacing
        f(
          'padding',
          {
            type: T.OBJECT,
            title: 'Padding',
          },
          [
            f(
              'all',
              {
                type: T.OBJECT,
              },
              [
                f('top', {
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('right', {
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('bottom', {
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('left', {
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('x', {
                  title: 'X',
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('y', {
                  title: 'Y',
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
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
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('right', {
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('bottom', {
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('left', {
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('x', {
                  title: 'X',
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('y', {
                  title: 'Y',
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
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
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('right', {
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('bottom', {
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('left', {
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('x', {
                  title: 'X',
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('y', {
                  title: 'Y',
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
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
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('right', {
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('bottom', {
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('left', {
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('x', {
                  title: 'X',
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('y', {
                  title: 'Y',
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
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
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('right', {
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('bottom', {
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('left', {
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('x', {
                  title: 'X',
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
                f('y', {
                  title: 'Y',
                  type: T.STRING,
                  enum: uiBoxEnums.padding,
                }),
              ]
            ),
          ]
        ),
        f(
          'margin',
          {
            type: T.OBJECT,
            title: 'Padding',
          },
          [
            f(
              'all',
              {
                type: T.OBJECT,
              },
              [
                f('top', {
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('right', {
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('bottom', {
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('left', {
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('x', {
                  title: 'X',
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('y', {
                  title: 'Y',
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
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
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('right', {
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('bottom', {
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('left', {
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('x', {
                  title: 'X',
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('y', {
                  title: 'Y',
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
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
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('right', {
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('bottom', {
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('left', {
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('x', {
                  title: 'X',
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('y', {
                  title: 'Y',
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
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
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('right', {
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('bottom', {
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('left', {
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('x', {
                  title: 'X',
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('y', {
                  title: 'Y',
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
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
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('right', {
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('bottom', {
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('left', {
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('x', {
                  title: 'X',
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
                f('y', {
                  title: 'Y',
                  type: T.STRING,
                  enum: uiBoxEnums.margin,
                }),
              ]
            ),
          ]
        ),
        // other
        f(
          'appearance',
          {
            type: T.OBJECT,
            title: 'Appearance',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.appearance,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.appearance,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.appearance,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.appearance,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.appearance,
            }),
          ]
        ),
        f(
          'cursor',
          {
            type: T.OBJECT,
            title: 'Cursor',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.cursor,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.cursor,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.cursor,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.cursor,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.cursor,
            }),
          ]
        ),
        f(
          'outline',
          {
            type: T.OBJECT,
            title: 'Outline',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.outline,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.outline,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.outline,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.outline,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.outline,
            }),
            f('focus', {
              type: T.STRING,
              enum: uiBoxEnums.outline,
            }),
          ]
        ),
        f(
          'pointerEvents',
          {
            type: T.OBJECT,
            title: 'Pointer Events',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.pointerEvents,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.pointerEvents,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.pointerEvents,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.pointerEvents,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.pointerEvents,
            }),
          ]
        ),
        f(
          'resize',
          {
            type: T.OBJECT,
            title: 'Resize',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.resize,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.resize,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.resize,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.resize,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.resize,
            }),
          ]
        ),
        f(
          'userSelect',
          {
            type: T.OBJECT,
            title: 'User Select',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.userSelect,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.userSelect,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.userSelect,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.userSelect,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.userSelect,
            }),
          ]
        ),
        f(
          'shadow',
          {
            type: T.OBJECT,
            title: 'Shadow',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.shadow,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.shadow,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.shadow,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.shadow,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.shadow,
            }),
            f('hover', {
              type: T.STRING,
              enum: uiBoxEnums.shadow,
            }),
            f('focus', {
              type: T.STRING,
              enum: uiBoxEnums.shadow,
            }),
          ]
        ),
        f(
          'opacity',
          {
            type: T.OBJECT,
            title: 'Opacity',
          },
          [
            f('all', {
              type: T.STRING,
              enum: uiBoxEnums.opacity,
            }),
            f('sm', {
              type: T.STRING,
              enum: uiBoxEnums.opacity,
            }),
            f('md', {
              type: T.STRING,
              enum: uiBoxEnums.opacity,
            }),
            f('lg', {
              type: T.STRING,
              enum: uiBoxEnums.opacity,
            }),
            f('xl', {
              type: T.STRING,
              enum: uiBoxEnums.opacity,
            }),
          ]
        ),
        f(
          'fill',
          {
            type: T.OBJECT,
            title: 'Fill',
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
          'stroke',
          {
            type: T.OBJECT,
            title: 'Stroke',
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
        // end fields
      ]
    )
  )
)
