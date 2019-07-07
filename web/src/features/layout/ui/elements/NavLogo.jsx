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
      <svg viewBox="0 0 627 500" width="50px" height="50px">
        <g>
          <g>
            <path
              d=" M 125 475.859 L 603.992 115.86 L 14 23 L 601 23 L 5 475.859 L 125 475.859"
              fill="rgb(80,161,77)"
            />

            <g>
              <path
                d=" M 486.202 22 L 365.431 113.492 L 11 381.998 L 602 473 L 12.008 470.859 L 605 22 L 486.202 22"
                fill="rgb(113,182,89)"
              />
            </g>
          </g>
          <g>
            <path d=" M 602 473 L 2 476 L 137 377" fill="rgb(80,161,77)" />
            <path d=" M 9 22 L 604 22 L 469 124" fill="rgb(113,182,89)" />
          </g>
        </g>
      </svg>
    </HStack>
  )
}
