import { task, createStateBox } from '@z1/lib-feature-box'

// main
export const brandState = task((t, a) => (brand = {}) =>
  createStateBox({
    name: 'brand',
    initial: t.mergeDeepRight(
      {
        title: 'Z1 App Starter',
        fontFamily: '',
        screen: {
          bg: '',
          color: '',
        },
        nav: {
          primary: {
            bg: '',
            bgHover: '',
            color: '',
            colorHover: '',
          },
          secondary: {
            bg: '',
            bgHover: '',
            color: '',
            colorHover: '',
          },
        },
        buttons: {
          primary: {
            bg: '',
            bgHover: '',
            color: '',
            colorHover: '',
          },
          secondary: {
            bg: '',
            bgHover: '',
            color: '',
            colorHover: '',
          },
        },
        inputs: {
          bg: '',
          color: '',
          borderColor: '',
        },
      },
      brand
    ),
    mutations(m) {
      return [m('init', state => state)]
    },
  })
)
