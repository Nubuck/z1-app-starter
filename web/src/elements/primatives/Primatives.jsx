import React from 'react'
import { task } from '@z1/lib-feature-box'
import { uiBox } from '@z1/lib-ui-box-tailwind'

// Box
export const Box = task(t => props => {
  const Element = t.pathOr('div', ['as'], props)
  const box = t.pathOr(null, ['box'], props)
  const className = t.pathOr('', ['className'], props)
  return React.createElement(
    Element,
    t.merge(t.omit(['as', 'box', 'children', 'className'], props), {
      className: t.isNil(box)
        ? className
        : uiBox(box)
            .next({ className })
            .toCss(),
    }),
    t.pathOr([], ['children'], props)
  )
})

// Stack
const Stack = task(t => direction => props => {
  const stackProps = {
    flexDirection: t.eq(direction, 'vertical') ? 'col' : 'row',
  }
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

// Grid
export const Row = task(t => props =>
  React.createElement(
    HStack,
    t.merge(t.omit(['children', 'box'], props), {
      box: t.merge({ flexWrap: true }, t.pathOr({}, ['box'], props)),
    }),
    t.pathOr([], ['children'], props)
  )
)

const colWidth = task(t => width =>
  t.isNil(width) ? width : width >= 12 ? 'full' : `${width}/12`
)
export const Col = task(t => props =>
  React.createElement(
    VStack,
    t.merge(t.omit(['children', 'box'], props), {
      box: t.merge(
        {
          flex: 'none',
          width: [
            colWidth(t.pathOr(null, ['xs'], props)),
            {
              sm: colWidth(t.pathOr(null, ['sm'], props)),
              md: colWidth(t.pathOr(null, ['md'], props)),
              lg: colWidth(t.pathOr(null, ['lg'], props)),
              xl: colWidth(t.pathOr(null, ['xl'], props)),
            },
          ],
        },
        t.pathOr({}, ['box'], props)
      ),
    }),
    t.pathOr([], ['children'], props)
  )
)

// Spacer
export const Spacer = task(t => props =>
  React.createElement(
    Box,
    t.merge(t.omit(['box'], props), {
      box: t.merge({ flex: 1 }, t.pathOr({}, ['box'], props)),
    })
  )
)

// Icon
export const Icon = task(t => props => {
  const as = t.pathOr('i', ['as'], props)
  const prefix = t.pathOr('eva', ['prefix'], props)
  const icon = t.pathOr('', ['name'], props)
  const className = t.pathOr(null, ['className'], props)
  return React.createElement(
    Box,
    t.merge(t.omit(['as', 'prefix', 'className', 'name'], props), {
      as,
      className: `${prefix} ${prefix}-${icon}${
        t.isNil(className) ? '' : ` ${className}`
      }`,
    })
  )
})
