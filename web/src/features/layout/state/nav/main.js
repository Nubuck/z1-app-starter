import { createStateBox } from '@z1/lib-feature-box'

// ctx
import { NAV_SIZE, NAV_MODE, NAV_STATUS } from './ctx'

// parts
import { mutations } from './mutations'
import { effects } from './effects'

// main
export const navState = createStateBox({
  name: 'nav',
  initial: {
    title: '',
    status: NAV_STATUS.INIT,
    mode: NAV_MODE.PRIMARY,
    schema: [],
    matched: null,
    width: 0,
    size: 'xs',
    primary: {
      width: NAV_SIZE.PRIMARY,
      items: [],
      actions: [],
      left: 0,
      bottom: 0,
    },
    secondary: {
      width: NAV_SIZE.SECONDARY,
      items: [],
      left: 0,
      bottom: 0,
    },
    body: {
      height: NAV_SIZE.BODY,
      items: [],
      actions: [],
      left: 0,
      navLeft: 0,
      top: 0,
      bottom: 0,
    },
    page: {
      status: NAV_STATUS.CLOSED,
      width: NAV_SIZE.PAGE,
      items: [],
      left: 0,
      top: 0,
      bottom: 0,
    },
  },
  mutations,
  effects,
})
