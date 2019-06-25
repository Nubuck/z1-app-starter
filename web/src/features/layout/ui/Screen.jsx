import React from 'react'

// main
export const Screen = ({
  ui: { Box, VStack, HStack, Icon, Spacer, Text },
}) => props => {
  const primaryWidth = 80
  const secondaryWidth = 240
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
        <Spacer />
        <HStack
          x="center"
          y="left"
          box={{
            padding: { x: 2 },
          }}
        >
          <Icon
            name="search-outline"
            size="3xl"
            color="white"
            box={{
              padding: 2,
              borderRadius: 'full',
              bgColor: [null, { hover: 'gray-900' }],
            }}
          />
        </HStack>
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
      </HStack>
      <VStack
        x="left"
        y="top"
        box={{ padding: { top: 20 }, margin: [{ left: -64 }, { sm: 0 }] }}
        style={{ paddingLeft: primaryWidth + secondaryWidth }}
      >
        {props.children}
      </VStack>
    </Box>
  )
}
