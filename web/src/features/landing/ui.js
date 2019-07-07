import React from 'react'
import { connectState } from '@z1/lib-feature-box'

// state
const stateQuery = ({ brand }) => ({ brand })

// main
export const LandingPage = ({ ui: { VStack, HStack, Text, Icon } }) =>
  connectState(stateQuery)(({ brand }) => {
    return (
      <VStack
        x="center"
        y="center"
        box={{ color: brand.secondary, height: 'full' }}
      >
         <svg viewBox="0 0 627 500" width="200px" height="200px">
        <g>
          <g>
            <path
              d=" M 125 475.859 L 603.992 115.86 L 14 23 L 601 23 L 5 475.859 L 125 475.859"
              fill="rgb(56,161,105)"
            />
            <g>
              <path
                d=" M 486.202 22 L 365.431 113.492 L 11 381.998 L 602 473 L 12.008 470.859 L 605 22 L 486.202 22"
                fill="rgb(72,187,120)"
              />
            </g>
          </g>
          <g>
            <path d=" M 602 473 L 2 476 L 137 377" fill="rgb(56,161,105)" />
            <path d=" M 9 22 L 604 22 L 469 124" fill="rgb(72,187,120)" />
          </g>
        </g>
      </svg>
        <Text
          size={['4xl', { md: '5xl' }]}
          family={brand.fontFamily}
          space="no-wrap"
          box={{ padding: { bottom: 2 } }}
        >
          Z1 App Starter
        </Text>
        <Text size="6xl" family={brand.fontFamily} x="center">
          Welcome
        </Text>
      </VStack>
    )
  })
