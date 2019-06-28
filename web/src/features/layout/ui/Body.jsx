import React from 'react'
import { task } from '@z1/lib-feature-box'

// main
export const Body = ({ ui: { VStack } }) => ({ left, children }) => {
  return (
    <VStack x="left" y="top" style={{ paddingLeft:left }}>
      {children}
    </VStack>
  )
}
