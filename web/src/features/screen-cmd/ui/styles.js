import { toCss } from '@z1/lib-ui-box-tailwind'

// main
export const css = {
  page: toCss({
    position: 'relative',
    display: 'flex',
    flexDirection: 'col',
    padding: 3,
  }),
  title: toCss({
    color: 'gray-700',
    fontSize: '2xl',
    fontFamily: 'mono',
  }),
}
