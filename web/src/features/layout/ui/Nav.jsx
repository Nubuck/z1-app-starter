import React from 'react'
import { task, NavLink } from '@z1/lib-feature-box'

// primary
export const NavLogoItem = ({ ui: { HStack, Icon } }) => ({ path }) => {
  return (
    <HStack
      as={NavLink}
      to={path || '/'}
      x="center"
      y="center"
      box={{
        padding: { top: 4, bottom: 6 },
        bgColor: [null, { hover: 'gray-800' }],
        color: ['white', { hover: 'yellow-500' }],
      }}
      exact={true}
    >
      <Icon
        name="flash-outline"
        size="5xl"
        style={{ transform: 'scaleX(-1)' }}
      />
    </HStack>
  )
}
export const NavPrimaryItem = ({ ui: { HStack, Icon, toCss } }) => ({
  icon,
  path,
}) => {
  return (
    <HStack
      as={NavLink}
      to={path || '/'}
      x="center"
      y="center"
      box={{
        padding: { y: 3 },
        bgColor: [null, { hover: 'gray-800' }],
        color: ['white', { hover: 'yellow-500' }],
      }}
      activeClassName={toCss({
        color: 'yellow-500',
      })}
    >
      <Icon name={icon} size="4xl" />
    </HStack>
  )
}
export const NavPrimaryAction = ({ ui: { HStack, Icon } }) => ({
  icon,
  action,
}) => {
  return (
    <HStack x="center" y="center" box={{ padding: { top: 2, bottom: 4 } }}>
      <Icon
        name={icon}
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
  )
}
export const NavPrimary = task(
  t => ({ ui: { VStack, HStack, Icon, Spacer, toCss } }) => {
    const LogoItem = NavLogoItem({ ui: { HStack, Icon, toCss } })
    const PrimaryItem = NavPrimaryItem({ ui: { HStack, Icon, toCss } })
    const PrimaryAction = NavPrimaryAction({ ui: { HStack, Icon, toCss } })
    return ({ left, width, items, actions }) => {
      return (
        <VStack
          x="left"
          y="top"
          box={{
            position: 'fixed',
            pin: { top: true, bottom: true, left: true },
            bgColor: 'gray-900',
            zIndex: 30,
          }}
          style={{ width: width, left }}
        >
          <LogoItem />
          {t.mapIndexed(
            (item, index) => (
              <PrimaryItem key={index} {...item} />
            ),
            items || []
          )}
          {t.isZeroLen(actions || []) ? null : <Spacer />}
          {t.mapIndexed(
            (actions, index) => (
              <PrimaryAction key={index} {...actions} />
            ),
            actions || []
          )}
        </VStack>
      )
    }
  }
)

// secondary
export const NavSecondaryHeader = task(
  t => ({ ui: { Box, VStack, HStack, Icon, Spacer, Text } }) => ({
    title,
    icon,
  }) => {
    return (
      <HStack
        x="center"
        y="left"
        box={{ padding: { top: 4, left: 3, right: 2, bottom: 5 } }}
      >
        {t.isNil(icon) ? null : (
          <Icon
            name={icon}
            size="3xl"
            color="yellow-500"
            box={{ alignSelf: 'center', margin: { right: 3 } }}
          />
        )}
        <Text size="2xl" color="yellow-500" family="mono" lineHeight="tight">
          {title}
        </Text>
      </HStack>
    )
  }
)
export const NavSecondaryItem = task(
  t => ({ ui: { HStack, Icon, Spacer, Text, toCss } }) => ({
    title,
    icon,
    path,
  }) => {
    return (
      <HStack
        as={NavLink}
        to={path || '/'}
        x="center"
        y="left"
        box={{
          color: 'white',
          padding: { y: 4, x: 4 },
          bgColor: [null, { hover: 'gray-900' }],
        }}
        activeClassName={toCss({
          bgColor: 'gray-900',
        })}
      >
        {t.isNil(icon) ? null : (
          <Icon
            name={icon}
            size="2xl"
            box={{ alignSelf: 'center', margin: { right: 3 } }}
          />
        )}
        <Text size="xl" family="mono">
          {title}
        </Text>
        {/* <Spacer />
      <Icon
        name="bell-outline"
        size="xl"
        color="red-500"
        box={{ alignSelf: 'center', margin: { left: 2 } }}
      /> */}
      </HStack>
    )
  }
)
export const NavSecondary = task(
  t => ({ ui: { VStack, HStack, Icon, Spacer, Text, toCss } }) => {
    const SecondaryHeader = NavSecondaryHeader({
      ui: { HStack, Icon, Spacer, Text },
    })
    const SecondaryItem = NavSecondaryItem({
      ui: { HStack, Icon, Spacer, Text, toCss },
    })
    return ({ title, icon, width, left, items }) => {
      return (
        <VStack
          x="left"
          y="top"
          box={{
            position: 'fixed',
            pin: { top: true, bottom: true },
            bgColor: 'gray-800',
            zIndex: 30,
          }}
          style={{ width, left }}
        >
          <SecondaryHeader title={title} icon={icon} />
          {t.mapIndexed(
            (item, index) => (
              <SecondaryItem key={index} {...item} />
            ),
            items || []
          )}
        </VStack>
      )
    }
  }
)

// xs screen
export const NavToggle = ({
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

// page
export const NavBodyItem = ({
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
export const NavBodyAction = ({
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
export const NavBody = ({
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
