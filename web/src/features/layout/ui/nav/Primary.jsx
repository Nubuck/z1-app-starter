import React from 'react'
import { task, NavLink } from '@z1/lib-feature-box'

// main
export const NavLogoItem = ({ ui: { HStack, Icon } }) => ({ path, brand }) => {
  return (
    <HStack
      as={NavLink}
      to={path || '/'}
      x="center"
      y="center"
      box={{
        padding: { top: 4, bottom: 6 },
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
  brand,
}) => {
  return (
    <HStack
      as={NavLink}
      to={path || '/'}
      x="center"
      y="center"
      box={{
        padding: { y: 4 },
        bgColor: [null, { hover: brand.nav.primary.bgHover }],
        color: [
          brand.nav.primary.color,
          { hover: brand.nav.primary.colorHover },
        ],
      }}
      activeClassName={toCss({
        bgColor: brand.nav.primary.bgActive,
        color: brand.nav.primary.colorActive,
      })}
    >
      <Icon name={icon} size="4xl" />
    </HStack>
  )
}
export const NavPrimaryAction = task(
  t => ({ ui: { HStack, Icon } }) => ({
    icon,
    action,
    onAction,
    borderWidth,
    brand,
  }) => {
    const color = [
      brand.nav.primary.color,
      { hover: brand.nav.primary.colorHover },
    ]
    return (
      <HStack
        x="center"
        y="center"
        box={{
          padding: { top: 2, bottom: 4 },
          cursor: 'pointer',
        }}
        onClick={() => {
          if (
            t.and(t.isType(onAction, 'Function'), t.isType(action, 'Object'))
          ) {
            onAction(action)
          }
        }}
      >
        <Icon
          name={icon}
          size="4xl"
          box={{
            padding: 1,
            borderWidth: t.isNil(borderWidth) ? 2 : borderWidth,
            borderColor: color,
            borderRadius: 'full',
            color,
          }}
        />
      </HStack>
    )
  }
)
export const NavPrimary = task(
  t => ({ ui: { VStack, HStack, Icon, Spacer, toCss } }) => {
    const LogoItem = NavLogoItem({ ui: { HStack, Icon, toCss } })
    const PrimaryItem = NavPrimaryItem({ ui: { HStack, Icon, toCss } })
    const PrimaryAction = NavPrimaryAction({ ui: { HStack, Icon, toCss } })
    return ({ left, width, items, actions, brand, dispatch }) => {
      return (
        <VStack
          x="left"
          y="top"
          box={{
            position: 'fixed',
            pin: { top: true, bottom: true, left: true },
            bgColor: brand.nav.primary.bg,
            zIndex: 30,
          }}
          style={{ width: width, left }}
        >
          <LogoItem brand={brand} />
          {t.mapIndexed(
            (item, index) => (
              <PrimaryItem key={index} brand={brand} {...item} />
            ),
            items || []
          )}
          {t.isZeroLen(actions || []) ? null : <Spacer />}
          {t.mapIndexed(
            (actionItem, index) => (
              <PrimaryAction
                key={index}
                brand={brand}
                onAction={action => dispatch(action)}
                {...actionItem}
              />
            ),
            actions || []
          )}
        </VStack>
      )
    }
  }
)

export const NavToggle = ({
  ui: { Box, VStack, HStack, Icon, Spacer, Text },
}) => ({ open, brand, onClick }) => {
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
      y="center"
      box={{
        display: ['flex', { lg: 'hidden' }],
        position: 'fixed',
        zIndex: 40,
      }}
      style={{ bottom: 20, right: 20 }}
      onClick={() => onClick && onClick()}
    >
      <Icon
        name={open ? 'close-outline' : 'menu-outline'}
        size="3xl"
        color={[brand.screen.color, { hover: brand.primary }]}
        box={{
          padding: 2,
          borderWidth: 2,
          borderColor: [brand.screen.color, { hover: brand.primary }],
          borderRadius: 'full',
          bgColor: [null, { hover: 'gray-900' }],
        }}
      />
    </HStack>
  )
}
