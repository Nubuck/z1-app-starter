import { createStateBox, task, VIEW_STATUS } from '@z1/lib-feature-box'
// schema
import { uiBoxSchema } from './schema'
// main=>
const isResonsiveProp = task(t => (key, val) => {
  return t.and(
    t.contains(key, ['sm', 'md', 'lg', 'xl']),
    t.not(t.eq(val, undefined))
  )
})
const allKeysUndefined = task(t => obj => {
  const result = t.find(
    ([_, val]) => t.not(t.eq(val, undefined)),
    t.toPairs(obj)
  )
  console.log('RESULT', result)
  return t.not(result) ? true : false
})
const validProp = task(t => nextVal => {
  console.log('NEXT VAL', nextVal)
  if (t.isType(nextVal, 'Array')) {
    const [base, mod] = nextVal
    if (t.isZeroLen(t.keys(mod), 0)) {
      console.log('NO MOD')
      return t.isType(base, 'Object')
        ? t.and(t.gt(t.length(t.keys(base)), 0), t.not(allKeysUndefined(base)))
        : t.and(t.not(t.eq(base, null)), t.not(t.eq(base, undefined)))
    }
  }
  return t.and(t.not(t.eq(nextVal, null)), t.not(t.eq(nextVal, undefined)))
})
const formDataToBox = task(t => (payload = {}) =>
  t.fromPairs(
    t.filter(
      ([_, nextVal]) => validProp(nextVal),
      t.map(([key, val]) => {
        const nextVal = t.gt(
          t.findIndex(([k, v]) => isResonsiveProp(k, v), t.toPairs(val)),
          -1
        )
          ? [
              t.eq(val.all, undefined) ? null : val.all,
              t.fromPairs(
                t.filter(([_, nextVal]) => {
                  return t.isType(nextVal, 'Object')
                    ? t.gt(t.keys(nextVal), 0)
                    : t.and(
                        t.and(
                          t.not(t.eq(nextVal, undefined)),
                          t.not(t.eq(nextVal, null))
                        ),
                        t.not(t.eq(nextVal, false))
                      )
                }, t.toPairs(t.omit(['all'], val)))
              ),
            ]
          : t.isType(val.all, 'Object')
          ? t.eq(t.keys(val.all), 0)
            ? null
            : val.all
          : t.eq(val.all, undefined)
          ? null
          : val.all
        return [key, nextVal]
      }, t.toPairs(payload))
    )
  )
)
export const screenCmdState = task((t, a) =>
  createStateBox({
    name: 'screenCmd',
    initial: {
      status: VIEW_STATUS.INIT,
      cmd: null,
      form: uiBoxSchema({}),
      data: {},
      current: {},
    },
    mutations(m) {
      return [
        m(['routeHome'], (state, action) => {
          return t.merge(state, {
            status: VIEW_STATUS.LOADING,
          })
        }),
        m(['init'], (state, action) => {
          return t.merge(state, {
            status: VIEW_STATUS.READY,
            cmd: action.payload,
          })
        }),
        m(['formChange'], (state, action) => {
          return t.merge(state, {
            current: action.payload,
            data: formDataToBox(action.payload),
          })
        }),
        m(['formSubmit'], (state, action) => {
          return t.merge(state, {
            data: action.payload,
          })
        }),
      ]
    },
    routes(r, actions) {
      return [
        r(actions.routeHome, '/', {
          authenticate: false,
        }),
      ]
    },
    guards(g, box) {
      return [
        g(
          [box.actions.routeHome],
          async ({ getState, action }, allow, reject) => {
            const state = getState()
            console.log('GUARD STATE: ', state)
            allow(action)
          }
        ),
      ]
    },
    effects(fx, box) {
      return [
        fx(
          [box.actions.routeHome],
          async ({ getState, api }, dispatch, done) => {
            const state = getState()
            console.log('FX STATE: ', state)
            const [screenCmdErr, screenCmdResult] = await a.of(
              api.service('screen-cmd').find()
            )
            if (screenCmdErr) {
              console.log('FX STATE ERR', screenCmdErr)
            } else {
              dispatch(box.mutations.init(screenCmdResult.data))
            }
            done()
          }
        ),
      ]
    },
  })
)
