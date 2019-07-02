import React from 'react'
import { task, connectState } from '@z1/lib-feature-box'
import { renderView } from '@z1/lib-feature-macros'

// views
import { views } from '../views'

// elements
import { elements } from './elements'

// state
const stateQuery = ({ account, brand }) => ({ brand, state: account })

// main
export const AccountPage = task(
  t => ({ ui: { VStack, ...ui }, mutationCreators }) => {
    const Elements = elements({ ui: { VStack, ...ui } })
    const Views = views.ui({ ui: { VStack, ...ui, ...Elements } })
    console.log('VIEWS', Views)
    return connectState(stateQuery, mutationCreators)(
      ({ brand, state, mutations }) => {
        return (
          <VStack
            x="center"
            y="center"
            box={{ color: brand.secondary, height: 'full' }}
          >
            {renderView(Views, state, mutations)}
          </VStack>
        )
      }
    )
  }
)
