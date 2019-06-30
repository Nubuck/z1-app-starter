import React from 'react'
import { task } from '@z1/lib-feature-box'

// main
export const Body = ({ ui: { VStack } }) => ({
  left,
  bottom,
  top,
  children,
}) => {
  return (
    <VStack
      x="left"
      y="top"
      style={{ paddingLeft: left, paddingTop: top, paddingBottom: bottom }}
    >
      {children}
    </VStack>
  )
}
