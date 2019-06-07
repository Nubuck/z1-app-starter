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
  editor: toCss({
    display: 'flex',
    flexDirection: 'row',
  }),
  colLeft: toCss({
    display: 'flex',
    flexDirection: 'col',
    width: '2/3',
  }),
  colRight: toCss({
    display: 'flex',
    flexDirection: 'col',
    width: '1/3',
  }),
  row: toCss({
    display: 'flex',
    flexDirection: 'row',
    padding: { y: 4 },
  }),
}
