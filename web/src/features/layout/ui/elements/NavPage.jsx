import React from 'react'
import { task, NavLink } from '@z1/lib-feature-box'

// elements
const PageItem = task(
  t => ({ ui: { HStack, Icon, Text, toCss } }) => ({
    title,
    icon,
    path,
    brand,
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
          padding: { x: 5 },
          bgColor: [null, { hover: brand.nav.body.bgHover }],
          color: [brand.nav.body.color, { hover: brand.nav.body.colorHover }],
          flexDirection: ['col', { lg: 'row' }],
          justifyContent: ['center', { lg: 'start' }],
          flexWrap: false,
        }}
        activeClassName={toCss({
          bgColor: brand.nav.body.bgActive,
        })}
        exact={t.isNil(exact) ? false : exact}
      >
        {t.isNil(icon) ? null : (
          <Icon
            name={icon}
            size={t.isNil(size) ? '2xl' : size}
            color={t.isNil(color) ? brand.nav.body.color : color}
            box={{
              alignSelf: 'center',
              margin: [null, { lg: { right: 2 } }],
            }}
          />
        )}
        <Text
          size={['sm', { lg: 'xl' }]}
          x="center"
          color={t.isNil(color) ? brand.nav.body.color : color}
          family={brand.fontFamily}
          box={{
            whitespace: 'no-wrap',
            padding: [null, { lg: { right: t.isNil(icon) ? 0 : 2 } }],
          }}
        >
          {title}
        </Text>
      </HStack>
    )
  }
)

const PageAction = task(
  t => ({ ui: { HStack, Icon } }) => ({
    icon,
    action,
    to,
    onAction,
    borderWidth,
    brand,
  }) => {
    const color = [brand.nav.body.color, { hover: brand.nav.body.colorHover }]
    const actionProps = t.and(t.isNil(action), t.not(t.isNil(to)))
      ? { as: NavLink, to }
      : {
          onClick() {
            if (
              t.and(t.isType(onAction, 'Function'), t.isType(action, 'Object'))
            ) {
              onAction(action)
            }
          },
        }
    return (
      <HStack
        x="center"
        y="left"
        box={{
          padding: { right: 4, left: 2 },
          cursor: 'pointer',
        }}
        {...actionProps}
      >
        <Icon
          name={icon}
          size="3xl"
          box={{
            color,
            padding: 2,
            borderWidth: t.isNil(borderWidth) ? 0 : borderWidth,
            borderColor: color,
            borderRadius: 'full',
            bgColor: [null, { hover: brand.nav.body.bgHover }],
          }}
        />
      </HStack>
    )
  }
)

const NavPageSecondaryItem = task(
  t => ({ ui: { HStack, Icon, Spacer, Text, toCss } }) => ({
    title,
    icon,
    path,
    brand,
    alert,
    exact,
    size,
  }) => {
    return (
      <HStack
        as={NavLink}
        to={path || '/'}
        x="center"
        y="left"
        box={{
          color: [brand.nav.page.color, { hover: brand.nav.page.colorHover }],
          padding: { y: 5, x: 4 },
          bgColor: [null, { hover: brand.nav.page.bgHover }],
          fontWeight: 'semibold',
        }}
        activeClassName={toCss({
          bgColor: brand.nav.page.bgActive,
          color: brand.nav.page.colorActive,
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

// main
export const NavPage = task(
  t => ({ ui: { Box, VStack, HStack, Icon, Spacer, Text, toCss } }) => {
    const NavPageItem = PageItem({
      ui: { HStack, Icon, Text, toCss },
    })
    const NavPageAction = PageAction({
      ui: { HStack, Icon, Text },
    })
    return ({
      left,
      height,
      items,
      actions,
      brand,
      showPageMenu,
      dispatch,
    }) => {
      return (
        <HStack
          x="center"
          y="left"
          box={{
            position: 'fixed',
            pin: [
              { bottom: true, right: true },
              { lg: { top: true, right: true } },
            ],
            bgColor: brand.nav.body.bg,
            zIndex: 30,
            padding: showPageMenu ? [{ right: 20 }, { lg: 0 }] : null,
          }}
          style={{ left, height }}
        >
          <HStack
            x="center"
            y="left"
            box={{
              overflowX: 'auto',
              overflowY: 'hidden',
            }}
            className="scroll-hide"
            stretch
          >
            {t.mapIndexed(
              (item, index) => (
                <NavPageItem key={index} brand={brand} {...item} />
              ),
              items || []
            )}
            {t.isZeroLen(actions || []) ? null : <Spacer />}
            {t.mapIndexed(
              (actionItem, index) => (
                <NavPageAction
                  key={index}
                  brand={brand}
                  onAction={action => dispatch(action)}
                  {...actionItem}
                />
              ),
              actions || []
            )}
          </HStack>
        </HStack>
      )
    }
  }
)

export const NavPageSecondary = task(
  t => ({ ui: { VStack, HStack, Icon, Spacer, Text, toCss } }) => {
    const SecondaryItem = NavPageSecondaryItem({
      ui: { HStack, Icon, Spacer, Text, toCss },
    })
    return ({ left, top, bottom, width, brand, items }) => {
      return (
        <VStack
          box={{
            bgColor: brand.nav.page.bg,
            position: 'fixed',
            zIndex: 20,
            // padding: { y: 4 },
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
          className="scroll-hide"
          style={{
            width,
            top,
            left,
            bottom,
          }}
        >
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

export const NavPageToggle = ({ ui: { HStack, Icon } }) => ({
  open,
  brand,
  actAsPrimary,
  onClick,
}) => {
  return (
    <HStack
      x="center"
      y="center"
      box={{
        display: ['flex', { lg: 'hidden' }],
        position: 'fixed',
        zIndex: 40,
        padding: [{ bottom: 0 }, { bottom: 0 }],
      }}
      style={{ bottom: 6, right: 14 }}
      onClick={() => onClick && onClick()}
    >
      <Icon
        name={
          actAsPrimary
            ? open
              ? 'close-outline'
              : 'menu-outline'
            : open
            ? 'more-vertical-outline'
            : 'more-horizontal-outline'
        }
        size="3xl"
        color={[brand.screen.color, { hover: brand.primary }]}
        box={{
          padding: 3,
          borderRadius: 'full',
          bgColor: [null, { hover: 'gray-900' }],
        }}
      />
    </HStack>
  )
}
