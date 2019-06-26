import { task, createStateBox } from '@z1/lib-feature-box'

// main
export const brandState = task((t, a) => (brand = {}) =>
  createStateBox({
    name: 'brand',
    initial: t.mergeDeepRight(
      {
        title: 'Z1 App Starter',
        fontFamily: 'sans',
        primary: 'yellow-500',
        secondary: 'green-500',
        danger: 'red-500',
        warning: 'orange-500',
        info: 'blue-500',
        screen: {
          bg: 'gray-900',
          color: 'white',
        },
        nav: {
          primary: {
            bg: 'gray-900',
            bgHover: 'gray-800',
            bgActive: 'gray-900',
            color: 'white',
            colorHover: 'yellow-500',
            colorActive: 'yellow-500',
          },
          secondary: {
            bg: 'gray-800',
            bgHover: 'gray-900',
            bgActive: 'gray-900',
            color: 'white',
            colorHover: 'yellow-500',
            colorActive: 'yellow-500',
            headerColor: 'yellow-500',
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
