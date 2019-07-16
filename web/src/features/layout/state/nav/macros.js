import { task } from '@z1/lib-feature-box'

// main
export const macroNavActiveState = task(t => (name, { anon, secure }) => {
  const anonPaths = t.map(n => n.path, anon || [])
  const securePaths = t.map(n => n.path, secure || [])
  console.log('SCHEMAS', anonPaths, securePaths)

  return {
    initial: {
      activeNav: 'anon',
    },
    mutations(m) {
      return m('activeNavChange', (state, action) => {
        return t.merge(state, {
          activeNav: action.payload,
        })
      })
    },
    effects(fx, { mutations }) {
      return [
        fx(
          ['account/AUTHENTICATE_SUCCESS'],
          async ({ getState }, dispatch, done) => {
            const state = getState()
            if (t.not(t.isNil(state.account.user))) {
              if (t.not(t.isZeroLen(anonPaths))) {
                dispatch({
                  type: 'nav/NAV_SCHEMA_REMOVE',
                  payload: {
                    schema: anonPaths,
                  },
                })
              }
              if (t.not(t.isZeroLen(securePaths))) {
                dispatch({
                  type: 'nav/NAV_SCHEMA_ADD',
                  payload: {
                    schema: secure,
                  },
                })
              }
              dispatch(mutations.activeNavChange('secure'))
            }
            done()
          }
        ),
        fx(
          ['account/AUTHENTICATE_FAIL', 'account/SIGN_OUT_COMPLETE'],
          async ({ getState }, dispatch, done) => {
            const state = getState()
            if (t.eq(t.path([name, 'activeNav'], state), 'secure')) {
              dispatch(mutations.activeNavChange('anon'))
            }
            if (t.not(t.isZeroLen(securePaths))) {
              dispatch({
                type: 'nav/NAV_SCHEMA_REMOVE',
                payload: {
                  schema: securePaths,
                },
              })
            }
            if (t.not(t.isZeroLen(anonPaths))) {
              dispatch({
                type: 'nav/NAV_SCHEMA_ADD',
                payload: {
                  schema: anon,
                },
              })
            }

            done()
          }
        ),
      ]
    },
  }
})
