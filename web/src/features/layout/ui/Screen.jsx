import React from 'react'
import { task, connectState } from '@z1/lib-feature-box'

// state
const stateQuery = ({ nav, brand, location, account }) => ({
  nav,
  brand,
  location,
  account,
})

// elements
import { elements } from './elements'

// main
export const Screen = task(
  t => ({ ui: { Box, VStack, Spinner, ...ui }, makeMutations }) => {
    const {
      Body,
      NavPrimary,
      NavToggle,
      NavSecondary,
      NavPage,
      NavPageSecondary,
      NavPageToggle,
    } = elements({ ui: { Box, VStack, Spinner, ...ui } })
    const renderChildren = (children, type) =>
      t.isNil(children)
        ? null
        : t.isType(children, 'Function')
        ? children({ type })
        : children
    return connectState(stateQuery, makeMutations)(
      ({ nav, brand, location, account, children, mutations, dispatch }) => {
        const accountStatus = t.pathOr(null, ['status'], account || {})
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
            {t.or(
              t.eq(accountStatus, 'init'),
              t.eq(accountStatus, 'auth-waiting')
            ) ? (
              <VStack x="center" y="center">
                <Spinner size="xl" />
              </VStack>
            ) : (
              <React.Fragment>
                {t.and(
                  t.isZeroLen(nav.primary.items),
                  t.isZeroLen(nav.primary.actions)
                ) ? null : (
                  <NavPrimary
                    {...nav.primary}
                    brand={brand}
                    dispatch={dispatch}
                  />
                )}
                {t.isZeroLen(nav.secondary.items) ? null : (
                  <NavSecondary
                    {...nav.secondary}
                    brand={brand}
                    title={nav.title}
                    icon={t.pathOr(null, ['matched', 'icon'], nav)}
                  />
                )}
                {t.and(
                  t.isZeroLen(nav.body.items),
                  t.isZeroLen(nav.body.actions)
                ) ? null : (
                  <NavPage
                    {...nav.body}
                    brand={brand}
                    dispatch={dispatch}
                    left={nav.body.navLeft}
                    actAsPrimary={t.eq(nav.mode, 'page')}
                    showPageMenu={t.not(t.isZeroLen(nav.page.items))}
                  />
                )}
                {t.isZeroLen(nav.page.items) ? null : (
                  <NavPageSecondary {...nav.page} brand={brand} />
                )}
                <Body
                  left={nav.body.left}
                  top={nav.body.top}
                  bottom={nav.body.bottom}
                >
                  {renderChildren(children, location.type)}
                </Body>
                {t.eq(nav.mode, 'page') ? null : (
                  <NavToggle
                    brand={brand}
                    pageNav={t.not(t.isZeroLen(nav.body.items))}
                    open={t.eq(nav.status, 'open')}
                    onClick={() => mutations.navToggleStatus()}
                  />
                )}
                {t.isZeroLen(nav.page.items) ? null : (
                  <NavPageToggle
                    brand={brand}
                    actAsPrimary={t.eq(nav.mode, 'page')}
                    open={t.eq(nav.page.status, 'open')}
                    onClick={() =>
                      mutations.navToggleStatus({ target: 'page' })
                    }
                  />
                )}
              </React.Fragment>
            )}
          </Box>
        )
      }
    )
  }
)
