import React from 'react'
import { connectState, renderRoute } from '@z1/lib-feature-box'

// state
const stateQuery = ({ location }) => ({
  location,
})

// hot
import features from './features'
const { Screen } = features.ui.layout

// main
const App = connectState(stateQuery)(({ routes, location }) => {
  return <Screen>{renderRoute(location.type, routes)}</Screen>
})

export default App
