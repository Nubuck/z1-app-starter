import { task, createStateBox } from '@z1/lib-feature-box'

// tasks
export const GRID_SIZES = {
  XS: 0,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
}

export const screenSizeName = task(t => screenWidth => {
  const sizePairs = t.reverse(t.toPairs(GRID_SIZES))
  const foundSize = t.find(size => {
    const value = t.head(t.tail(size))
    return t.gte(screenWidth, value)
  }, sizePairs)
  if (foundSize) {
    return t.caseTo.lowerCase(t.head(foundSize))
  }
  return 'xs'
})

// main
export const screenState = task((t, a) =>
  createStateBox({
    name: 'screen',
    initial: {
      width: 0,
      height: 0,
      size: 'sm',
    },
    mutations(m) {
      return [m('resize', (state, action) => t.merge(state, action.payload))]
    },
    onInit({ dispatch, mutations }) {
      const handleResize = t.throttle((meta = {}) => {
        dispatch(
          mutations.resize(
            {
              width: window.innerWidth,
              height: window.innerHeight,
              size: screenSizeName(window.innerWidth),
            },
            meta
          )
        )
      }, 300)
      handleResize({ init: true })
      window.addEventListener('resize', handleResize)
      window.onbeforeunload = function() {
        window.removeEventListener('resize', handleResize)
        return undefined
      }
    },
  })
)
