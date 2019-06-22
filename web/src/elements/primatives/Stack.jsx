import React from 'react'
import { task } from '@z1/lib-feature-box'

// ui
import { Box } from './Box'

// main
const Stack = task(t => direction => props => {
  const stackProps = t.eq(direction, 'vertical')
    ? {
        flex: 1,
        flexDirection: 'col',
      }
    : { flexDirection: 'row' }
  const alignX = t.pathOr(null, ['x'], props)
  const alignY = t.pathOr(null, ['y'], props)
  const alignProps = t.isNil(alignX)
    ? {}
    : t.eq(direction, 'vertical')
    ? {
        alignItems: t.getMatch(alignX)({
          left: 'start',
          center: 'center',
          right: 'end',
        }),
      }
    : {
        alignItems: t.getMatch(alignX)({
          top: 'start',
          center: 'center',
          bottom: 'end',
        }),
      }
  const justifyProps = t.isNil(alignY)
    ? {}
    : t.eq(direction, 'vertical')
    ? {
        justifyContent: t.getMatch(alignY)({
          top: 'start',
          center: 'center',
          bottom: 'end',
        }),
      }
    : {
        justifyContent: t.getMatch(alignY)({
          left: 'start',
          center: 'center',
          right: 'end',
        }),
      }

  return React.createElement(
    Box,
    t.merge(t.omit(['children', 'box'], props), {
      box: t.mergeAll([
        {
          display: 'flex',
          alignSelf: 'stretch',
        },
        stackProps,
        alignProps,
        justifyProps,
        t.pathOr({}, ['box'], props),
      ]),
    }),
    t.pathOr([], ['children'], props)
  )
})

export const VStack = Stack('vertical')
export const HStack = Stack('horizontal')
export const Spacer = task(t => props =>
  React.createElement(
    Box,
    t.merge(t.omit(['box'], props), {
      box: t.merge({ flex: 1 }, t.pathOr({}, ['box'], props)),
    })
  )
)
