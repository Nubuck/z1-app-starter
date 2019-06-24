import { task } from '@z1/lib-feature-box'

export const isPathInTopSchema = task(
  t => (path, schema) => t.gt(
    t.findIndex(
      schemaItem => t.eq(schemaItem.path, path),
      schema || [],
    ),
    -1,
  ),
)

export const topSchemaWithoutPath = task(
  t => (pathOrPaths, schema) => t.isType(pathOrPaths, 'Array')
    ? t.filter(
      schemaItem => t.eq(
        t.findIndex(
          path => t.eq(path, schemaItem.path),
          pathOrPaths,
        ),
        -1,
      ),
      schema || [],
    )
    : t.filter(
      schemaItem => t.not(t.eq(schemaItem.path, pathOrPaths)),
      schema || [],
    ),
)

export const updateSchemaInPlace = task(
  t => (nextSchema, schema) => {
    const nextIndexed = t.map(
      schemaItem => (
        {
          index: t.findIndex(
            item => t.eq(item.path, schemaItem.path),
            schema || [],
          ),
          item: schemaItem,
        }
      ),
      nextSchema || [],
    )
    return t.mapIndexed((item, index) => {
      const found = t.find(
        indexedItem => t.eq(indexedItem.index, index),
        nextIndexed,
      )
      return t.not(found)
        ? item
        : found.item
    }, schema || [])
  },
)