import React from 'react'
import { task } from '@z1/lib-feature-box'
import { uiBox } from '@z1/lib-ui-box-tailwind'

// main
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

