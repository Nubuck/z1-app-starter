import React from 'react'

// main
export const PageNotFound = ({ ui: { VStack, Text } }) => props => {
  return (
    <VStack x="center" y="center" box={{ padding: { left: 64, top: 20 } }}>
      <Text size="2xl" color="red-500" family="mono">
        Not Found
      </Text>
    </VStack>
  )
}
