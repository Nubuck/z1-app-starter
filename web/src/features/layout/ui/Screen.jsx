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
  t => ({
    ui: { Box, VStack, Spinner, Match, When, ...ui },
    makeMutations,
  }) => {
    const {
      Body,
      NavPrimary,
      NavToggle,
      NavSecondary,
      NavPage,
      NavPageSecondary,
      NavPageToggle,
    } = elements({ ui: { Box, VStack, Spinner, Match, When, ...ui } })
    const renderChildren = (children, type) =>
      t.isNil(children)
        ? null
        : t.isType(children, 'Function')
        ? children({ type })
        : children
    return connectState(stateQuery, makeMutations)(
      ({ nav, brand, location, account, children, mutations, dispatch }) => {
        const accountStatus = t.pathOr(null, ['status'], account || {})
        const screenContent = t.or(
          t.eq(accountStatus, 'init'),
          t.eq(accountStatus, 'auth-waiting')
        )
          ? 'waiting'
          : 'view'
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
            <Match
              value={screenContent}
              when={{
                waiting: (
                  <VStack x="center" y="center">
                    <Spinner size="xl" />
                  </VStack>
                ),
                view: (
                  <React.Fragment>
                    <When
                      is={t.or(
                        t.not(t.isZeroLen(nav.primary.items)),
                        t.not(t.isZeroLen(nav.primary.actions))
                      )}
                    >
                      <NavPrimary
                        {...nav.primary}
                        brand={brand}
                        dispatch={dispatch}
                      />
                    </When>
                    <When is={t.not(t.isZeroLen(nav.secondary.items))}>
                      <NavSecondary
                        {...nav.secondary}
                        brand={brand}
                        title={nav.title}
                        icon={t.pathOr(null, ['matched', 'icon'], nav)}
                      />
                    </When>
                    <When
                      is={t.or(
                        t.not(t.isZeroLen(nav.body.items)),
                        t.not(t.isZeroLen(nav.body.actions))
                      )}
                    >
                      <NavPage
                        {...nav.body}
                        brand={brand}
                        dispatch={dispatch}
                        left={nav.body.navLeft}
                        actAsPrimary={t.eq(nav.mode, 'page')}
                        showPageMenu={t.not(t.isZeroLen(nav.page.items))}
                      />
                    </When>
                    <When is={t.not(t.isZeroLen(nav.page.items))}>
                      <NavPageSecondary {...nav.page} brand={brand} />
                    </When>
                    <Body
                      left={nav.body.left}
                      top={nav.body.top}
                      bottom={nav.body.bottom}
                    >
                      {renderChildren(children, location.type)}
                    </Body>
                    <When is={t.not(t.eq(nav.mode, 'page'))}>
                      <NavToggle
                        brand={brand}
                        pageNav={t.not(t.isZeroLen(nav.body.items))}
                        open={t.eq(nav.status, 'open')}
                        onClick={() => mutations.navToggleStatus()}
                      />
                    </When>
                    <When is={t.not(t.isZeroLen(nav.page.items))}>
                      <NavPageToggle
                        brand={brand}
                        actAsPrimary={t.eq(nav.mode, 'page')}
                        open={t.eq(nav.page.status, 'open')}
                        onClick={() =>
                          mutations.navToggleStatus({ target: 'page' })
                        }
                      />
                    </When>
                  </React.Fragment>
                ),
              }}
            />
          </Box>
        )
      }
    )
  }
)
