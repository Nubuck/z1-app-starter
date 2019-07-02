import React from 'react'
import { renderRoute } from '@z1/lib-feature-box'

// hot
import features from './features'
const { Screen } = features.ui.layout

// main
const App = ({ routes }) => {
  return <Screen>{({ type }) => renderRoute(type, routes)}</Screen>
}

export default App
