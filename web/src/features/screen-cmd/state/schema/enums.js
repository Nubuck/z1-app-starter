import { task } from '@z1/lib-feature-box'

// common
const colorNames = [
  'transparent',
  'black',
  'white',
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'indigo',
  'purple',
  'pink',
  'pink',
]
const colorRange = [100, 200, 300, 400, 500, 600, 700, 800, 900]
const colors = task(t =>
  t.flatten(
    t.map(color => t.map(range => `${color}-${range}`, colorRange), colorNames)
  )
)
// layout
const overflows = ['auto', 'hidden', 'visible', 'scroll']
const display = [
  'hidden',
  'block',
  'inline-block',
  'flex',
  'inline-flex',
  'inline',
  'table',
  'table-row',
  'table-cell',
]
const float = ['none', 'left', 'right']
const objectFit = ['none', 'contain', 'cover', 'fill', 'scale-down']
const objectPosition = [
  'bottom',
  'center',
  'left',
  'left-bottom',
  'left-top',
  'right',
  'right-bottom',
  'right-top',
  'top',
]
const scrolling = ['auto', 'touch']
const position = ['static', 'fixed', 'absolute', 'relative', 'sticky']
const zIndex = ['auto', 0, 10, 20, 30, 40, 50]
// borders
const borderSizes = [0, 1, 2, 4, 8]
const borderRadius = ['none', 'sm', 'lg', 'full']
const borderStyle = ['solid', 'dashed', 'dotted', 'none']
// sizing
const sizes = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  8,
  10,
  12,
  16,
  20,
  24,
  32,
  40,
  48,
  56,
  64,
  'auto',
  'px',
  '1/2',
  '1/3',
  '2/3',
  '1/4',
  '2/4',
  '3/4',
  '1/5',
  '2/5',
  '3/5',
  '4/5',
  '1/6',
  '2/6',
  '3/6',
  '4/6',
  '5/6',
  '1/12',
  '2/12',
  '3/12',
  '4/12',
  '5/12',
  '6/12',
  '7/12',
  '8/12',
  '9/12',
  '10/12',
  '11/12',
  'full',
  'screen',
]
const minWidth = [0, 'full']
const maxWidth = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  'full',
]
const minHeight = [0, 'full', 'screen']
const maxHeight = ['full', 'screen']
// typography
const fontFamily = ['sans', 'serif', 'mono']
const fontSize = [
  'base',
  'xs',
  'sm',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
]
const fontSmoothing = ['antialiased', ' subpixel-antialiased']
const fontStyle = ['normal', 'italic']
const fontWeight = [
  'hairline',
  'thin',
  'light',
  'normal',
  'medium',
  'semi',
  'bold',
  'extra',
  'black',
]
const letterSpacing = ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest']
const lineHeight = ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose']
const listType = ['none', 'disc', 'decimal']
const listPosition = ['inside', 'outside']
const textAlignX = ['left', 'center', 'right', 'justify']
const textAlignY = [
  'baseline',
  'top',
  'middle',
  'bottom',
  'text-top',
  'text-bottom',
]
const textDecoration = ['none', 'line-through', 'underline']
const textTransform = ['uppercase', 'lowercase', 'capitalize', 'normal']
const whitespace = ['normal', 'no-wrap', 'pre', 'pre-line', 'pre-wrap']
const wordBreak = ['normal', 'words', 'all', 'truncate']
// flex
const flexPos = ['start', 'center', 'end', 'between', 'around']
const flex = [1, 'auto', 'initial', 'none']
const flexDirection = ['row', 'row-reverse', 'col', 'col-reverse']
const flexWrap = ['wrap', 'reverse']
const alignItems = ['stretch', 'start', 'center', 'end', 'baseline']
const alignSelf = ['auto', 'start', 'center', 'end', 'stretch']
const flexOrder = [
  'first',
  'last',
  'none',
  12,
  11,
  10,
  9,
  8,
  7,
  6,
  5,
  4,
  3,
  2,
  1,
]
// tables
const tableCollapse = ['collapse', 'separate']
const tableLayout = ['auto', 'fixed']
// backgrounds
const bgAttachment = ['fixed', 'local', 'scroll']
const bgPosition = [
  'bottom',
  'center',
  'left',
  'left-bottom',
  'left-top',
  'right',
  'right-bottom',
  'right-top',
  'top',
]
const bgRepeat = ['repeat', 'no-repeat', 'x', 'y', 'round', 'space']
const bgSize = ['auto', 'cover', 'contain']
// spacing
const padding = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  8,
  10,
  12,
  16,
  20,
  24,
  32,
  40,
  48,
  56,
  64,
  'px',
]
const margin = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  8,
  10,
  12,
  16,
  20,
  24,
  32,
  40,
  48,
  56,
  64,
  'auto',
  'px',
]
// interactivity
const appearance = ['none']
const cursor = [
  'auto',
  'default',
  'pointer',
  'wait',
  'text',
  'move',
  'not-allowed',
]
const outline = ['none']
const pointerEvents = ['none', 'auto']
const resize = ['x', 'y']
const userSelect = ['none', 'text', 'all', 'auto']

// main
export const uiBoxEnums = {
  colors,
  display,
  overflows,
  float,
  objectFit,
  objectPosition,
  scrolling,
  position,
  zIndex,
  borderSizes,
  borderRadius,
  borderStyle,
  sizes,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  fontFamily,
  fontSize,
  fontSmoothing,
  fontStyle,
  fontWeight,
  letterSpacing,
  lineHeight,
  listType,
  listPosition,
  textAlignX,
  textAlignY,
  textDecoration,
  textTransform,
  whitespace,
  wordBreak,
  flexPos,
  flex,
  flexDirection,
  flexWrap,
  alignItems,
  alignSelf,
  flexOrder,
  tableCollapse,
  tableLayout,
  bgAttachment,
  bgPosition,
  bgRepeat,
  bgSize,
  padding,
  margin,
  appearance,
  cursor,
  outline,
  pointerEvents,
  resize,
  userSelect,
}
