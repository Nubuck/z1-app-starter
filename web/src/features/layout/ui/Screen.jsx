import React from 'react'

// main
export const Screen = ({ ui: { Box, VStack, HStack } }) => props => {
  return (
    <Box
      box={{
        position: 'relative',
        display: 'flex',
        flex: 1,
        flexDirection: 'col',
        width: 'full',
        height: 'screen',
        overflowY: 'auto',
        overflowX: 'hidden',
        zIndex: 0,
      }}
    >
      {/* <VStack
        x="left"
        y="top"
        box={{
          position: 'fixed',
          pin: { top: true, bottom: true, left: true },
          width: 24,
          bgColor: 'blue-200',
          zIndex: 30,
        }}
      >
        Primary
      </VStack>
      <VStack
        x="left"
        y="top"
        box={{
          position: 'fixed',
          pin: { top: true, bottom: true },
          width: 40,
          bgColor: 'blue-300',
          zIndex: 30,
        }}
        style={{ left: '6rem' }}
      >
        Secondary
      </VStack>
      <HStack
        x="center"
        y="left"
        box={{
          position: 'fixed',
          pin: { top: true, right: true },
          height: 20,
          bgColor: 'blue-400',
          zIndex: 20,
          shadow: true,
        }}
        style={{ left: '16rem' }}
      >
        Page
      </HStack> */}
      {props.children}
    </Box>
  )
}
