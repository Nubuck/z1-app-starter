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
      ]
    )
  )
)
