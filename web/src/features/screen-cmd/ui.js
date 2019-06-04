import React from 'react'
import { task } from '@z1/lib-feature-box'
import { toCss } from '@z1/lib-ui-box-tailwind'

// main
export const ScreenCmdPage = task(t => (/* options */) => (/* props */) => {
  return (
    <div
      className={toCss({
        position: 'relative',
        display: 'flex',
        flexDirection: 'col',
        padding: 3,
      })}
    >
      <h1
        className={toCss({
          color: 'gray-700',
          fontSize: '2xl',
          fontFamily: 'mono',
        })}
      >
        Z1 GANG SCREEN CMD
      </h1>
      <div
        className={toCss({
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          flexWrap: true,
        })}
      >
        <div
          className={toCss({
            display: 'flex',
            flexDirection: 'col',
            flex: 1,
            width: ['full', { sm: '1/2' }],
          })}
        >
          <h2>Col 1</h2>
        </div>
        <div
          className={toCss({
            display: 'flex',
            flexDirection: 'col',
            flex: 1,
            width: ['full', { sm: '1/2' }],
          })}
        >
          <h2>Col 2</h2>
        </div>
      </div>
    </div>
  )
})
