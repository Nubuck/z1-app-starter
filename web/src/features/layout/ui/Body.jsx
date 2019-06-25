import React from 'react'
import { task } from '@z1/lib-feature-box'

// main
export const Body = ({ ui: { Box, VStack, HStack, Icon, Spacer, Text } }) => ({
  primaryWidth,
  secondaryWidth,
  children,
}) => {
  return (
    <VStack
      x="left"
      y="top"
      box={{ padding: { top: 20 }, margin: [{ left: -64 }, { sm: 0 }] }}
      style={{ paddingLeft: primaryWidth + secondaryWidth }}
    >
      {children}
    </VStack>
  )
}
