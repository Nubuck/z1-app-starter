import React from 'react'
import { task, NavLink } from '@z1/lib-feature-box'

// main
export const NavSecondaryHeader = task(
  t => ({ ui: { HStack, Icon, Text } }) => ({ title, icon, brand }) => {
    return (
      <HStack
        x="center"
        y="left"
        box={{ padding: { top: 6, left: 3, right: 2, bottom: 6 } }}
      >
        {t.isNil(icon) ? null : (
          <Icon
            name={icon}
            size="3xl"
            color={brand.nav.secondary.headerColor}
            box={{ alignSelf: 'center', margin: { right: 3 } }}
          />
        )}
        <Text
          size="2xl"
          color={brand.nav.secondary.headerColor}
          family={brand.fontFamily}
          lineHeight="tight"
        >
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
    brand,
    alert,
    exact,
    size,
    color,
  }) => {
    return (
      <HStack
        as={NavLink}
        to={path || '/'}
        x="center"
        y="left"
        box={{
          color: t.isNil(color) ? brand.nav.secondary.color : color,
          padding: { y: 4, x: 4 },
          bgColor: [null, { hover: brand.nav.secondary.bgHover }],
        }}
        activeClassName={toCss({
          bgColor: brand.nav.secondary.bgActive,
        })}
        exact={t.isNil(exact) ? false : exact}
      >
        {t.isNil(icon) ? null : (
          <Icon
            name={icon}
            size={t.isNil(size) ? '2xl' : size}
            box={{ alignSelf: 'center', margin: { right: 3 } }}
          />
        )}
        <Text size={t.isNil(size) ? 'xl' : size} family={brand.fontFamily}>
          {title}
        </Text>
        {t.isNil(alert) ? null : (
          <React.Fragment>
            <Spacer />
            <Icon
              name={alert.icon}
              size="xl"
              color={alert.color || brand.secondary}
              box={{ alignSelf: 'center', margin: { left: 2 } }}
            />
          </React.Fragment>
        )}
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
    return ({ title, icon, width, left, items, brand }) => {
      return (
        <VStack
          x="left"
          y="top"
          box={{
            position: 'fixed',
            pin: { top: true, bottom: true },
            bgColor: brand.nav.secondary.bg,
            zIndex: 30,
            shadow: ['2xl', { lg: 'none' }],
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
          className="hide-scroll"
          style={{ width, left }}
        >
          <SecondaryHeader title={title} icon={icon} brand={brand} />
          {t.mapIndexed(
            (item, index) => (
              <SecondaryItem key={index} brand={brand} {...item} />
            ),
            items || []
          )}
        </VStack>
      )
    }
  }
)
