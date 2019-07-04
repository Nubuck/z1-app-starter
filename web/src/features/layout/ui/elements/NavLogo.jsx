import React from 'react'
import { NavLink } from '@z1/lib-feature-box'

// elements
export const NavLogo = ({ ui: { HStack, Icon } }) => ({
  path,
  brand,
  align,
}) => {
  return (
    <HStack
      as={NavLink}
      to={path || '/'}
      x="center"
      y="center"
      box={{
        padding: align === 'x' ? { x: 4 } : { top: 4, bottom: 6 },
      }}
      exact={true}
    >
      <Icon
        name="flash-outline"
        size="5xl"
        style={{ transform: 'scaleX(-1) rotate(55deg)' }}
      />
    </HStack>
  )
}
