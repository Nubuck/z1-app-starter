// globals
// import 'eva-icons/style/eva-icons.css'
import 'react-virtualized/styles.css'
import './app.css'
// packages
import React from 'react'
import { render } from 'react-dom'
import { createStateStore, reloadStateStore } from '@z1/lib-feature-box'
import { Provider } from 'react-redux'
import { createApiClient } from '@z1/lib-api-box-client'
// hot code
import App from './App'
import features from './features'
// api
const api = createApiClient({
  path: process.env.NODE_ENV === 'development' ? 'http://localhost:3035' : '/',
})
// state
const store = createStateStore({
  boxes: features.state,
  context: {
    api,
    storage: api.get('storage'),
  },
})
// ui
const load = () => {
  render(
    <Provider store={store}>
      <App routes={features.routes} />
    </Provider>,
    document.getElementById('root')
  )
}
// reload
if (module.hot) {
  module.hot.accept(['./App', './features'], () => {
    reloadStateStore(store, features.state)
    load()
  })
}
// run
load()
