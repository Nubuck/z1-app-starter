import React from 'react'
import { task, connectState } from '@z1/lib-feature-box'

// state
const stateQuery = ({ nav, brand }) => ({ nav, brand })

// ui
import { NavPrimary, NavSecondary } from './Nav'
import { Body } from './Body'

// main
export const Screen = task(
  t => ({
    ui: { Box, VStack, HStack, Icon, Spacer, Text },
    mutationMakers,
  }) => {
    const ScreenBody = Body({ ui: { VStack } })
    const ScreenNavPrimary = NavPrimary({
      ui: { VStack, HStack, Icon, Spacer },
    })
    const ScreenNavSecondary = NavSecondary({
      ui: { VStack, HStack, Icon, Spacer, Text },
    })
    return connectState(stateQuery, mutationMakers)(
      ({ nav, brand, children }) => {
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
            <ScreenNavPrimary
              {...nav.primary}
              left={t.eq(nav.status, 'closed') ? 0 - nav.primary.width : 0}
            />
            <ScreenNavSecondary
              title={nav.title}
              icon={t.pathOr(null, ['matched', 'icon'], nav)}
              {...nav.secondary}
              left={
                t.eq(nav.status, 'closed') ? 0 - nav.width : nav.primary.width
              }
            />
            <ScreenBody
              paddingLeft={
                t.eq(nav.status, 'closed')
                  ? 0
                  : t.and(t.eq(nav.status, 'open'), t.eq(nav.size, 'xs'))
                  ? 0
                  : nav.width
              }
            >
              {children}
            </ScreenBody>
          </Box>
        )
      }
    )
  }
)
