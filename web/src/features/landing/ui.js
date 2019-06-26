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
        <HStack x="center" y="center">
          <Icon
            name="flash-outline"
            size="5xl"
            box={{ margin: { right: 4 } }}
          />
          <Text size="6xl" family={brand.fontFamily}>
            Z1 App Starter
          </Text>
        </HStack>
        <Text size="6xl" family={brand.fontFamily}>
          Welcome
        </Text>
      </VStack>
    )
  })
