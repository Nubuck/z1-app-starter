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
      >
      <svg viewBox="0 0 600 500" width="50px" height="50px">
          <g>
            <path
              d=" M 120 470.859 L 598.992 110.86 L 0 22 L 598.992 22 L 0 470.859 L 120 470.859"
              fill="rgb(0,255,0)"
            />
            <path
              d=" M 480 22 L 1.008 381.998 L 600 470.859 L 1.008 470.859 L 600 22 L 480 22"
              fill="rgb(19,204,19)"
            />
            <path d=" M 588 472 L 2 472 L 128 370" fill="rgb(19,204,19)" />
            <path d=" M 8 22 L 594 22 L 468 124" fill="rgb(0,255,0)" />
          </g>
        </svg>
    </HStack>
  )
}
