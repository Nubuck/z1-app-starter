import { Body } from './Body'
import { NavLogo } from './NavLogo'
import { NavPage, NavPageSecondary, NavPageToggle } from './NavPage'
import { NavSecondary } from './NavSecondary'
import { NavPrimary, NavToggle } from './NavPrimary'

// main
export const elements = ui => {
  const NavLogoItem = NavLogo(ui)
  return {
    Body: Body(ui),
    NavPrimary: NavPrimary({ ...ui, NavLogoItem }),
    NavToggle: NavToggle(ui),
    NavSecondary: NavSecondary(ui),
    NavPage: NavPage({ ...ui, NavLogoItem }),
    NavPageSecondary: NavPageSecondary(ui),
    NavPageToggle: NavPageToggle(ui),
  }
}
