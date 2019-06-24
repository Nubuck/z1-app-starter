import { task } from '@z1/lib-feature-box'

// matching tasks
const hasChildren = task(t => t.has('children'))
const safeChildren = item => (item && hasChildren(item) ? item.children : [])
const matchesPath = task(t => (path, item) => {
  return t.not(item)
    ? false
    : t.eq(path, '/')
    ? t.eq(item.path, path)
    : item.path.includes(decodeURI(path))
})
const itemByPath = task(t => (path, list) =>
  t.find(item => matchesPath(path, item), list)
)
const tailItems = task(t => (items, children) =>
  t.concat(t.tail(items), children)
)

// main
export const matchedNavItem = task(t =>
  t.trampoline(function search(path, list) {
    // list empty
    if (t.isZeroLen(list)) {
      return undefined
    }
    // list has single item
    if (t.eq(t.length(list), 1)) {
      // match head
      const singleItem = t.head(list)
      if (matchesPath(path, singleItem)) {
        return singleItem
      }
      // recurse breadth first
      return () => search(path, safeChildren(singleItem))
    }
    // match item in list
    const item = itemByPath(path, list)
    if (t.not(t.isNil(item))) {
      return item
    }
    // recurse breadth first
    return () =>
      search(path, tailItems(list, t.valPipe(list)(t.head, safeChildren)))
  })
)
