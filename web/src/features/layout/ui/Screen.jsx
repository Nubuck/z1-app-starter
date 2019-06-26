import React from 'react'
import { task, connectState } from '@z1/lib-feature-box'

// state
const stateQuery = ({ nav, brand }) => ({ nav, brand })

// ui
import { NavPrimary, NavSecondary, NavToggle } from './nav'
import { Body } from './Body'

// main
export const Screen = task(
  t => ({
    ui: { Box, VStack, HStack, Icon, Spacer, Text, toCss },
    makeMutations,
  }) => {
    const ScreenBody = Body({ ui: { VStack } })
    const ScreenNavPrimary = NavPrimary({
      ui: { VStack, HStack, Icon, Spacer, toCss },
    })
    const ScreenNavToggle = NavToggle({
      ui: { VStack, HStack, Icon, Spacer, toCss },
    })
    const ScreenNavSecondary = NavSecondary({
      ui: { VStack, HStack, Icon, Spacer, Text, toCss },
    })
    return connectState(stateQuery, makeMutations)(
      ({ nav, brand, children, mutations }) => {
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
              bgColor: brand.screen.bg,
              color: brand.screen.color,
            }}
          >
            <ScreenNavPrimary
              brand={brand}
              {...nav.primary}
              left={t.eq(nav.status, 'closed') ? 0 - nav.primary.width : 0}
            />
            <ScreenNavSecondary
              brand={brand}
              title={nav.title}
              icon={t.pathOr(null, ['matched', 'icon'], nav)}
              {...nav.secondary}
              left={
                t.or(
                  t.eq(nav.status, 'closed'),
                  t.isZeroLen(nav.secondary.items)
                )
                  ? 0 - (nav.secondary.width + nav.primary.width)
                  : nav.primary.width
              }
            />
            <ScreenBody
              paddingLeft={
                t.or(t.eq(nav.size, 'sm'), t.eq(nav.size, 'xs')) ? 0 : nav.width
              }
            >
              {children}
            </ScreenBody>
            <ScreenNavToggle
              brand={brand}
              open={t.eq(nav.status, 'open')}
              onClick={() => {
                console.log('CLick')
                mutations.navChange({
                  status: t.eq(nav.status, 'open') ? 'closed' : 'open',
                })
              }}
            />
          </Box>
        )
      }
    )
  }
)
