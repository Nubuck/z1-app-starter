import { task } from '@z1/lib-feature-box'

// tasks
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

// main
export const formDataToBox = task(t => (payload = {}) =>
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
