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
              'boxProps',
              { type: T.OBJECT, title: 'Select Prop', childKey: 'anyOf' },
              [
                f('container', { title: 'container', type: T.OBJECT }, [
                  f('key', {
                    type: T.STRING,
                    default: 'container',
                    ui: { [T.UI.WIDGET]: T.WIDGET.HIDDEN },
                  }),
                  f('all', { type: T.BOOL }),
                  f('sm', { type: T.BOOL }),
                  f('md', { type: T.BOOL }),
                  f('lg', { type: T.BOOL }),
                  f('xl', { type: T.BOOL }),
                ]),
                f('display', { title: 'display', type: T.OBJECT }, [
                  f('all', { type: T.STRING, enum: uiBoxEnums.display }),
                  f('sm', { type: T.STRING, enum: uiBoxEnums.display }),
                  f('md', { type: T.STRING, enum: uiBoxEnums.display }),
                  f('lg', { type: T.STRING, enum: uiBoxEnums.display }),
                  f('xl', { type: T.STRING, enum: uiBoxEnums.display }),
                ]),
                f('clearfix', { title: 'clearfix', type: T.OBJECT }, [
                  f('all', { type: T.BOOL }),
                  f('sm', { type: T.BOOL }),
                  f('md', { type: T.BOOL }),
                  f('lg', { type: T.BOOL }),
                  f('xl', { type: T.BOOL }),
                ]),
                f('float', { title: 'float', type: T.OBJECT }, [
                  f('all', { type: T.STRING, enum: uiBoxEnums.float }),
                  f('sm', { type: T.STRING, enum: uiBoxEnums.float }),
                  f('md', { type: T.STRING, enum: uiBoxEnums.float }),
                  f('lg', { type: T.STRING, enum: uiBoxEnums.float }),
                  f('xl', { type: T.STRING, enum: uiBoxEnums.float }),
                ]),
              ]
            ),
          ]
        ),
      ]
    )
  )
)
