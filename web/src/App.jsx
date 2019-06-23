import React from 'react'
import { connectState, renderRoute } from '@z1/lib-feature-box'
import { toCss } from '@z1/lib-ui-box-elements'

// state
const stateQuery = ({ location }) => ({
  location,
})

// styles
const css = {
  screen: toCss({
    position: 'relative',
    display: 'flex',
    flex: 1,
    flexDirection: 'col',
    width: 'full',
    height: 'screen',
    overflowY: 'scroll',
  }),
}

// main
const App = connectState(stateQuery)(({ routes, location }) => {
  return <div className={css.screen}>{renderRoute(location.type, routes)}</div>
})

export default App
