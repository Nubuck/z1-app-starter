import React from 'react'
import { connectState, renderRoute } from '@z1/lib-feature-box'
import { toCss } from '@z1/lib-ui-box-tailwind'

// state
const stateQuery = ({ location }) => ({
  location,
})

// main
const App = connectState(stateQuery)(({ routes, location }) => {
  return (
    <div
      className={toCss({
        position: 'relative',
        display: 'flex',
        flex: 1,
        flexDirection: 'col',
        width: 'full',
        height: 'screen',
        overflowY: 'scroll',
      })}
    >
      {renderRoute(location.type, routes)}
    </div>
  )
})

export default App
