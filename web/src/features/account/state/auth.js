import { task, VIEW_STATUS } from '@z1/lib-feature-box'

// ctx
export const ACCOUNT_STATUS = {
  INIT: 'init',
  AUTH_WAITING: 'auth-waiting',
  AUTH_LOADING: 'auth-loading',
  AUTH_SUCCESS: 'auth-success',
  AUTH_FAIL: 'auth-fail',
}

// schema
import { authNav, secureNav } from './schema'

// main
export const auth = task((t, a) => ({
  initial: {
    status: ACCOUNT_STATUS.INIT,
    user: null,
    error: null,
    redirectBackTo: null,
    hash: null,
    navRegistered: false,
  },
  mutations(m) {
    return [
      m('authenticate', state => {
        return t.merge(state, {
          status: ACCOUNT_STATUS.AUTH_WAITING,
          error: null,
        })
      }),
      m('authenticateSuccess', (state, action) => {
        return t.merge(state, {
          error: null,
          status: ACCOUNT_STATUS.AUTH_SUCCESS,
          user: t.path(['payload', 'user'], action),
        })
      }),
      m('authenticateFail', (state, action) => {
        return t.merge(state, {
          error: t.path(['payload', 'error'], action),
          status: ACCOUNT_STATUS.AUTH_FAIL,
          user: null,
        })
      }),
      m('signOut', state => {
        return t.merge(state, {
          status: ACCOUNT_STATUS.AUTH_FAIL,
          error: null,
          redirectBackTo: null,
          hash: null,
        })
      }),
      m('signOutComplete', state => {
        return t.merge(state, {
          user: null,
        })
      }),
      m('navRegistered', (state, action) => {
        return t.merge(state, {
          navRegistered: action.payload,
        })
      }),
      m('redirectBackToChange', (state, action) => {
        return t.merge(state, {
          redirectBackTo: action.payload,
        })
      }),
    ]
  },
  guards(g, { actions, mutations }) {
    return [
      g(
        [t.globrex('*/ROUTE_*').regex],
        async ({ getState, action, redirect }, allow, reject) => {
          // location:
          const state = getState()
          const routesMap = t.path(['location', 'routesMap'], state)
          const routeMeta = t.path(['meta', 'location', 'current'], action)
          // skip if location invalid
          if (t.or(t.not(routesMap), t.not(routeMeta))) {
            allow(action)
          } else {
            // route:
            const route = t.path([action.type], routesMap)
            // skip if route invalid
            if (t.not(route)) {
              allow(action)
            } else if (
              t.and(t.not(route.authenticate), t.not(route.restrictToRoles))
            ) {
              // skip if route is public
              allow(action)
            } else {
              // account:
              const accountStatus = t.path(['account', 'status'], state)
              const user = t.path(['account', 'user'], state)
              // authenticated
              const authenticated = t.and(
                user,
                t.eq(ACCOUNT_STATUS.AUTH_SUCCESS, accountStatus)
              )
              // skip if route only requires authentication
              // + account is valid
              if (t.and(t.not(route.restrictToRoles), authenticated)) {
                allow(action)
              } else if (t.not(authenticated)) {
                // reject invalid account -> redirect to login
                reject(
                  redirect(
                    mutations.routeView({
                      view: 'sign-in',
                      redirectBackTo: t.omit(['meta'], action),
                    })
                  )
                )
              } else {
                // roles:
                const restrictToRoles = t.eq(
                  'Array',
                  t.type(route.restrictToRoles)
                )
                  ? route.restrictToRoles
                  : [route.restrictToRoles]
                const hasRole = t.gt(
                  t.findIndex(role => t.eq(role, user.role), restrictToRoles),
                  -1
                )
                // skip if user in routes declared roles
                if (hasRole) {
                  allow(action)
                } else {
                  // reject invalid role -> redirect 401
                  reject(
                    redirect(
                      mutations.routeView({
                        view: '401',
                        redirectBackTo: t.omit(['meta'], action),
                      })
                    )
                  )
                }
              }
            }
          }
        }
      ),
      g(
        [actions.routeView],
        async ({ getState, action, redirect }, allow, reject) => {
          const state = getState()
          const accountStatus = t.path(['account', 'status'], state)
          const user = t.path(['account', 'user'], state)
          if (t.and(user, t.eq(ACCOUNT_STATUS.AUTH_SUCCESS, accountStatus))) {
            reject(
              redirect({
                type: 'landing/ROUTE_HOME',
                payload: {},
              })
            )
          } else {
            allow(action)
          }
        }
      ),
    ]
  },
  effects(fx, { actions, mutations }) {
    return [
      fx(
        [actions.authenticate],
        async ({ api, getState, redirect }, dispatch, done) => {
          // check stored sign-in
          const [error, result] = await a.of(api.authenticate())
          // auth failed
          if (error) {
            dispatch(mutations.authenticateFail({ error }))
            done()
          } else {
            // auth succeeded -> verify token
            const token = t.path(['accessToken'], result)
            // token failed
            if (t.not(token)) {
              dispatch(
                mutations.authenticateFail({
                  error: new Error('Access Token not found'),
                })
              )
              done()
            } else {
              // verify user by token
              const [verifyError, verifyResult] = await a.of(
                api.passport.verifyJWT(token)
              )
              // verify failed
              if (verifyError) {
                dispatch(
                  mutations.authenticateFail({
                    error: verifyError,
                  })
                )
                done()
              } else {
                // verify succeeded -> get user
                const [userError, user] = await a.of(
                  api.service('users').get(verifyResult.userId)
                )
                // get user failed
                if (userError) {
                  dispatch(
                    mutations.authenticateFail({
                      error: userError,
                    })
                  )
                  done()
                } else {
                  // get user success
                  dispatch(mutations.authenticateSuccess({ user }))
                  const state = getState()
                  if (state.account.redirectBackTo) {
                    dispatch(redirect(state.account.redirectBackTo))
                    done()
                  } else {
                    dispatch(
                      redirect({
                        type: 'landing/ROUTE_HOME',
                        payload: {},
                      })
                    )
                    done()
                  }
                }
              }
            }
          }
        }
      ),
      fx(
        [actions.authenticateSuccess],
        task((t, a) => async ({ getState, api }, dispatch, done) => {
          const state = getState()
          if (t.not(state.account.user)) {
            done()
          } else {
            const [error] = await a.of(
              api
                .service('users')
                .patch(state.account.user._id, { status: 'online' })
            )
            if (error) {
              console.log('ERROR PATCHING USER STATUS', error)
            }
            dispatch({
              type: 'nav/NAV_SCHEMA_REMOVE',
              payload: {
                schema: ['/account/sign-up', '/account/sign-in'],
              },
            })
            dispatch({
              type: 'nav/NAV_SCHEMA_ADD',
              payload: {
                schema: secureNav,
              },
            })
            dispatch(mutations.navRegistered(true))
            // dispatch(mutations.navRegistered(false))
            done()
          }
        })
      ),
      fx(
        [actions.authenticateFail, actions.signOutComplete],
        async ({ getState }, dispatch, done) => {
          const state = getState()
          if (t.not(state.account.navRegistered)) {
            dispatch({
              type: 'nav/NAV_SCHEMA_REMOVE',
              payload: {
                schema: ['/#sign-out'],
              },
            })
            dispatch({
              type: 'nav/NAV_SCHEMA_ADD',
              payload: {
                schema: authNav,
              },
            })
            dispatch(mutations.navRegistered(true))
          }
          done()
        }
      ),
      fx(
        [actions.signOut],
        async ({ api, getState, redirect }, dispatch, done) => {
          const state = getState()
          if (state.account.user) {
            const [error] = await a.of(
              api
                .service('users')
                .patch(state.account.user._id, { status: 'offline' })
            )
            if (error) {
              console.log('ERROR PATCHING USER STATUS', error)
            }
            api.logout()
            dispatch(mutations.navRegistered(false))
            dispatch(mutations.signOutComplete({}))
            // dispatch(redirect(mutations.routeSignIn({})))
            done()
          } else {
            api.logout()
            dispatch(mutations.navRegistered(false))
            // dispatch(redirect(mutations.routeSignIn({})))
            done()
          }
        }
      ),
    ]
  },
  onInit({ dispatch, mutations }) {
    dispatch(mutations.authenticate())
  },
}))
