import { task } from '@z1/lib-feature-box'

// ctx
import { NAV_SIZE } from './ctx'

// schema
export const isPathInTopSchema = task(t => (path, schema) =>
  t.gt(t.findIndex(schemaItem => t.eq(schemaItem.path, path), schema || []), -1)
)

export const topSchemaWithoutPath = task(t => (pathOrPaths, schema) =>
  t.isType(pathOrPaths, 'Array')
    ? t.filter(
        schemaItem =>
          t.eq(
            t.findIndex(path => t.eq(path, schemaItem.path), pathOrPaths),
            -1
          ),
        schema || []
      )
    : t.filter(
        schemaItem => t.not(t.eq(schemaItem.path, pathOrPaths)),
        schema || []
      )
)

export const updateSchemaInPlace = task(t => (nextSchema, schema) => {
  const nextIndexed = t.map(
    schemaItem => ({
      index: t.findIndex(
        item => t.eq(item.path, schemaItem.path),
        schema || []
      ),
      item: schemaItem,
    }),
    nextSchema || []
  )
  return t.mapIndexed((item, index) => {
    const found = t.find(
      indexedItem => t.eq(indexedItem.index, index),
      nextIndexed
    )
    return t.not(found) ? item : found.item
  }, schema || [])
})

// sizing
export const calcPrimaryLeft = task(t => (status, primaryItems = []) =>
  t.or(t.eq(status, 'closed'), t.isZeroLen(primaryItems))
    ? 0 - NAV_SIZE.PRIMARY
    : 0
)
export const calcSecondaryLeft = task(t => (status, secondaryItems) =>
  t.or(t.eq(status, 'closed'), t.isZeroLen(secondaryItems))
    ? 0 - (NAV_SIZE.SECONDARY + NAV_SIZE.PRIMARY)
    : NAV_SIZE.PRIMARY
)
export const calcBodyLeft = task(t => (status, size, width, pageNav = false) =>
  t.not(t.or(t.eq(size, 'lg'), t.eq(size, 'xl')))
    ? 0
    : t.eq(status, 'closed')
    ? 0
    : pageNav
    ? width + NAV_SIZE.PAGE
    : width
)
export const calcBodySpacing = task(t => (key, items, size, height) =>
  t.isZeroLen(items)
    ? 0
    : t.contains(size, ['lg', 'xl'])
    ? t.eq(key, 'top')
      ? height
      : 0
    : t.eq(key, 'bottom')
    ? height
    : 0
)
export const calcPageLeft = task(t => (status, size, width, pageStatus) =>
  t.and(
    t.not(t.or(t.eq(size, 'lg'), t.eq(size, 'xl'))),
    t.and(t.eq(status, 'closed'), t.eq(pageStatus, 'closed'))
  )
    ? -(width + NAV_SIZE.PAGE)
    : t.not(t.or(t.eq(size, 'lg'), t.eq(size, 'xl')))
    ? 0
    : width
)
