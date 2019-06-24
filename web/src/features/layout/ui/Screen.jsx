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
      }}
    >
      <VStack
        x="left"
        y="top"
        box={{
          position: 'fixed',
          pin: { top: true, bottom: true, left: true },
          bgColor: 'gray-900',
          zIndex: 30,
          visible: [false, { sm: true }],
        }}
        style={{ width: primaryWidth }}
      >
        <HStack
          x="center"
          y="center"
          box={{
            padding: { top: 4, bottom: 6 },
            bgColor: [null, { hover: 'gray-800' }],
            color: ['white', { hover: 'yellow-500' }],
          }}
        >
          <Icon name="flash" size="5xl" />
        </HStack>
        <HStack
          x="center"
          y="center"
          box={{
            padding: { y: 3 },
            bgColor: [null, { hover: 'gray-800' }],
            color: ['white', { hover: 'yellow-500' }],
          }}
        >
          <Icon name="code-outline" size="4xl" />
        </HStack>
        <HStack
          x="center"
          y="center"
          box={{
            padding: { y: 3 },
            bgColor: [null, { hover: 'gray-800' }],
            color: ['white', { hover: 'yellow-500' }],
          }}
        >
          <Icon name="people-outline" size="4xl" />
        </HStack>
        <Spacer />
        <HStack x="center" y="center" box={{ padding: { top: 2, bottom: 4 } }}>
          <Icon
            name="person-outline"
            size="4xl"
            box={{
              padding: 1,
              borderWidth: 2,
              borderColor: ['white', { hover: 'yellow-500' }],
              borderRadius: 'full',
              color: ['white', { hover: 'yellow-500' }],
            }}
          />
        </HStack>
      </VStack>
      <VStack
        x="left"
        y="top"
        box={{
          position: 'fixed',
          pin: { top: true, bottom: true },
          bgColor: 'gray-800',
          zIndex: 30,
          visible: [false, { sm: true }],
        }}
        style={{ width: secondaryWidth, left: primaryWidth }}
      >
        <HStack
          x="center"
          y="left"
          box={{ padding: { top: 4, x: 3, bottom: 5 } }}
        >
          <Icon
            name="code-outline"
            size="4xl"
            color="yellow-500"
            box={{ alignSelf: 'center', margin: { right: 2 } }}
          />
          <Text size="3xl" color="yellow-500" family="mono">
            Heading
          </Text>
        </HStack>
        <HStack
          x="center"
          y="left"
          box={{
            padding: { y: 4, x: 4 },
            bgColor: [null, { hover: 'gray-900' }],
          }}
        >
          <Icon
            name="code-outline"
            size="2xl"
            color="white"
            box={{ alignSelf: 'center', margin: { right: 2 } }}
          />
          <Text size="lg" color="white" family="mono">
            Secondary Item
          </Text>
          <Spacer />
          <Icon
            name="bell-outline"
            size="xl"
            color="red-500"
            box={{ alignSelf: 'center', margin: { left: 2 } }}
          />
        </HStack>
        <HStack
          x="center"
          y="left"
          box={{
            padding: { y: 4, x: 4 },
            bgColor: [null, { hover: 'gray-900' }],
          }}
        >
          <Icon
            name="code-outline"
            size="2xl"
            color="white"
            box={{ alignSelf: 'center', margin: { right: 2 } }}
          />
          <Text size="lg" color="white" family="mono">
            Secondary Item
          </Text>
        </HStack>
        <HStack
          x="center"
          y="left"
          box={{
            padding: { y: 4, x: 4 },
            bgColor: [null, { hover: 'gray-900' }],
          }}
        >
          <Icon
            name="code-outline"
            size="2xl"
            color="white"
            box={{ alignSelf: 'center', margin: { right: 2 } }}
          />
          <Text size="lg" color="white" family="mono">
            Secondary Item
          </Text>
        </HStack>
        <HStack
          x="center"
          y="left"
          box={{
            padding: { y: 4, x: 4 },
            bgColor: [null, { hover: 'gray-900' }],
          }}
        >
          <Icon
            name="code-outline"
            size="2xl"
            color="white"
            box={{ alignSelf: 'center', margin: { right: 2 } }}
          />
          <Text size="lg" color="white" family="mono">
            Secondary Item
          </Text>
        </HStack>
        <HStack
          x="center"
          y="left"
          box={{
            padding: { y: 4, x: 4 },
            bgColor: [null, { hover: 'gray-900' }],
          }}
        >
          <Icon
            name="code-outline"
            size="2xl"
            color="white"
            box={{ alignSelf: 'center', margin: { right: 2 } }}
          />
          <Text size="lg" color="white" family="mono">
            Secondary Item
          </Text>
        </HStack>
      </VStack>
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
