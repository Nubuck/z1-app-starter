import React from 'react'

// main
export const Body = ({ VStack }) => ({ left, bottom, top, children }) => {
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
