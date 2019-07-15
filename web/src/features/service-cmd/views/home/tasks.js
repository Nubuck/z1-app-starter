import { task } from '@z1/lib-feature-box'

// main
export const computeCounts = task(t => list =>
  t.reduce(
    (counts, item) =>
      t.merge(counts, {
        online: t.eq(item.status, 'online') ? counts.online + 1 : counts.online,
        stopped: t.or(
          t.isNil(item.status),
          t.or(t.eq(item.status, 'stopped'), t.eq(item.status, 'init'))
        )
          ? counts.stopped + 1
          : counts.stopped,
      }),
    { online: 0, stopped: 0 },
    list
  )
)

export const updateServiceInList = task(t => (item, list) =>
  t.map(service => (t.eq(service._id, item._id) ? item : service), list || [])
)

export const itemMetricProps = task(t => (status, color) => ({
  xs: 6,
  sm: 3,
  md: 4,
  xl: 2,
  size: 'md',
  textBox: {
    padding: [{ right: 2, top: 0 }, { xl: { top: 3 } }],
  },
  color: t.eq(status, 'online') ? color : null,
}))
export const viewMetricProps = color => ({
  xs: 6,
  sm: 3,
  lg: 2,
  size: 'md',
  box: {
    padding: [{ left: 4, right: 4, bottom: 4 }, { md: { left: 0 } }],
    color,
  },
})
