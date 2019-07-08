import React from 'react'

// main
export const PageNotFound = ({
  ui: { VStack, HStack, Text, Icon },
}) => props => {
  return (
    <VStack x="center" y="center" box={{ color: 'red-500', height: 'full' }}>
      <HStack x="center" y="center">
        <Icon
          name="alert-triangle-outline"
          size="5xl"
          box={{ margin: { right: 4 } }}
        />
        <Text size="6xl">
          404
        </Text>
      </HStack>
      <Text size="6xl" color="red-500" alignX='center'>
        Page Not Found
      </Text>
    </VStack>
  )
}
