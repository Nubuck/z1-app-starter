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
            as="div"
            name="flash-outline"
            size="6xl"
            box={{
              margin: { right: 4 },
              display: 'flex',
              flexDirection: 'col',
            }}
            style={{ transform: 'scaleX(-1) rotate(55deg)' }}
          />
          <Text
            size={['4xl', { md: '5xl' }]}
            family={brand.fontFamily}
            space="no-wrap"
            box={{ padding: { bottom: 2 } }}
          >
            Z1 App Starter
          </Text>
        </HStack>
        <Text size="6xl" family={brand.fontFamily} x="center">
          Welcome
        </Text>
      </VStack>
    )
  })
