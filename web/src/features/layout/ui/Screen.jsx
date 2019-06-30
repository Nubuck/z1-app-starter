import React from 'react'
import { task, connectState } from '@z1/lib-feature-box'

// state
const stateQuery = ({ nav, brand }) => ({ nav, brand })

// ui
import {
  NavPrimary,
  NavSecondary,
  NavToggle,
  NavPage,
  NavPageSecondary,
  NavPageToggle,
} from './nav'
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
    const ScreenNavPage = NavPage({
      ui: { VStack, HStack, Icon, Spacer, Text, toCss },
    })
    const ScreenNavPageSecondary = NavPageSecondary({
      ui: { VStack, HStack, Icon, Spacer, Text, toCss },
    })
    const ScreenNavPageToggle = NavPageToggle({
      ui: { VStack, HStack, Icon, Spacer, toCss },
    })
    return connectState(stateQuery, makeMutations)(
      ({ nav, brand, children, mutations, dispatch }) => {
        return (
          <Box
            box={{
              position: 'relative',
              display: 'flex',
              flex: 1,
              flexDirection: 'col',
              width: 'full',
              minHeight: 'screen',
              overflowY: 'auto',
              overflowX: 'hidden',
              zIndex: 0,
              bgColor: brand.screen.bg,
              color: brand.screen.color,
              fontFamily: brand.fontFamily,
            }}
          >
            <ScreenNavPrimary
              brand={brand}
              dispatch={dispatch}
              {...nav.primary}
            />
            <ScreenNavSecondary
              brand={brand}
              title={nav.title}
              icon={t.pathOr(null, ['matched', 'icon'], nav)}
              {...nav.secondary}
            />
            {t.isZeroLen(nav.body.items) ? null : (
              <ScreenNavPage
                brand={brand}
                {...nav.body}
                left={nav.body.navLeft}
                showPageMenu={t.not(t.isZeroLen(nav.page.items))}
              />
            )}
            {t.isZeroLen(nav.page.items) ? null : (
              <ScreenNavPageSecondary brand={brand} {...nav.page} />
            )}
            <ScreenBody
              left={nav.body.left}
              top={nav.body.top}
              bottom={nav.body.bottom}
            >
              {children}
            </ScreenBody>
            <ScreenNavToggle
              brand={brand}
              pageNav={t.not(t.isZeroLen(nav.body.items))}
              open={t.eq(nav.status, 'open')}
              onClick={() => mutations.navToggleStatus()}
            />
            {t.isZeroLen(nav.page.items) ? null : (
              <ScreenNavPageToggle
                brand={brand}
                open={t.eq(nav.page.status, 'open')}
                onClick={() => mutations.navToggleStatus({ target: 'page' })}
              />
            )}
          </Box>
        )
      }
    )
  }
)
