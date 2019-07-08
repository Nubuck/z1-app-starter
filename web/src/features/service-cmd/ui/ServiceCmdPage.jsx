import React from 'react'
import { task, connectState } from '@z1/lib-feature-box'
import { renderView } from '@z1/lib-feature-macros'

// views
import { views } from '../views'

// elements
// import { elements } from './elements'

// state
const stateQuery = ({ serviceCmd, brand }) => ({ brand, state: serviceCmd })

// main
export const ServiceCmdPage = task(
  t => ({ ui: { VStack, ...ui }, mutationCreators }) => {
    // const Elements = elements({ VStack, ...ui })
    const Views = views.ui({ VStack, ...ui, })
    return connectState(stateQuery, mutationCreators)(
      ({ brand, state, mutations }) => {
        return (
          <VStack
            x="start"
            y="top"
            box={{ color: brand.secondary, height: 'full' }}
          >
            {renderView(Views, state, mutations)}
          </VStack>
        )
      }
    )
  }
)
