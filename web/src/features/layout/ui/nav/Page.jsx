import React from 'react'
import { task, NavLink } from '@z1/lib-feature-box'

// main
export const NavPageItem = ({
    ui: { Box, VStack, HStack, Icon, Spacer, Text },
  }) => props => {
    return (
      <HStack
        x="center"
        y="left"
        box={{
          padding: { x: 4 },
          bgColor: [null, { hover: 'gray-900' }],
        }}
      >
        <Icon
          name="code-outline"
          size="2xl"
          color="white"
          box={{
            alignSelf: 'center',
            margin: { right: 2 },
          }}
        />
        <Text
          size="xl"
          color="white"
          family="mono"
          box={{ visible: [false, { sm: true }] }}
        >
          Page Item
        </Text>
      </HStack>
    )
  }
  export const NavPageAction = ({
    ui: { Box, VStack, HStack, Icon, Spacer, Text },
  }) => props => {
    //   <HStack
    //   x="center"
    //   y="left"
    //   box={{
    //     padding: { x: 2 },
    //   }}
    // >
    //   <Icon
    //     name="search-outline"
    //     size="3xl"
    //     color="white"
    //     box={{
    //       padding: 2,
    //       borderRadius: 'full',
    //       bgColor: [null, { hover: 'gray-900' }],
    //     }}
    //   />
    // </HStack>
    return (
      <HStack
        x="center"
        y="left"
        box={{
          padding: { right: 4, left: 2 },
        }}
      >
        <Icon
          name="settings-outline"
          size="3xl"
          color="white"
          box={{
            padding: 1,
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 'full',
            bgColor: [null, { hover: 'gray-900' }],
          }}
        />
      </HStack>
    )
  }
  export const NavPage = ({
    ui: { Box, VStack, HStack, Icon, Spacer, Text },
  }) => ({ secondaryWidth, primaryWidth }) => {
    return (
      <HStack
        x="center"
        y="left"
        box={{
          position: 'fixed',
          pin: { top: true, right: true },
          height: 20,
          bgColor: 'gray-800',
          zIndex: 20,
          shadow: true,
          margin: [{ left: -64 }, { sm: 0 }],
        }}
        style={{ left: primaryWidth + secondaryWidth }}
      >
        {/* items */}
        <Spacer />
        {/* actions */}
      </HStack>
    )
  }
  