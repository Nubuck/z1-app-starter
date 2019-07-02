import { Body } from './Body'
import { NavPage, NavPageSecondary, NavPageToggle } from './NavPage'
import { NavSecondary } from './NavSecondary'
import { NavPrimary, NavToggle } from './NavPrimary'

// main
export const elements = ({ ui }) => ({
  Body: Body({ ui }),
  NavPrimary: NavPrimary({ ui }),
  NavToggle: NavToggle({ ui }),
  NavSecondary: NavSecondary({ ui }),
  NavPage: NavPage({ ui }),
  NavPageSecondary: NavPageSecondary({ ui }),
  NavPageToggle: NavPageToggle({ ui }),
})
