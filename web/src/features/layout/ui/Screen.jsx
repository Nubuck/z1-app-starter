import React from 'react'

// main
export const Screen = ({
  ui: { Box, VStack, HStack, Icon, Spacer, Text },
}) => props => {
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
        bgColor: 'gray-900',
      }}
    >
      {/* NavPrimary */}
      {/* NavSecondary */}
      {/* Body */}
    </Box>
  )
}
