import React from 'react'

// main
export const LandingPage = ({
  ui: { VStack, HStack, Text, Icon },
}) => props => {
  return (
    <VStack x="center" y="center" box={{ color: 'green-500', height: 'full' }}>
      <HStack x="center" y="center">
        <Icon name="flash-outline" size="5xl" box={{ margin: { right: 4 } }} />
        <Text size="6xl" family="mono">
          Z1 App Starter
        </Text>
      </HStack>
      <Text size="6xl" color="green-500" family="mono">
        Welcome
      </Text>
    </VStack>
  )
}
