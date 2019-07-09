import React from 'react'
import { task, connectState } from '@z1/lib-feature-box'
import { renderView } from '@z1/lib-feature-macros'

// views
import { views } from '../views'

// elements
import { elements } from './elements'

// state
const stateQuery = ({ serviceCmd, brand }) => ({ brand, state: serviceCmd })

// main
export const ServiceCmdPage = task(
  t => ({ ui: { VStack, ...ui }, mutationCreators }) => {
    const Elements = elements({ VStack, ...ui })
    const Views = views.ui({ VStack, ...ui, ...Elements })
    return connectState(stateQuery, mutationCreators)(
      ({ brand, state, mutations }) => {
        return (
          <VStack
            x="left"
            y="top"
            box={{ color: brand.screen.color, height: 'full' }}
          >
            {renderView(Views, t.merge(state, { brand }), mutations)}
          </VStack>
        )
      }
    )
  }
)
