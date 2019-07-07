import React from 'react'
import { NavLink } from '@z1/lib-feature-box'

// elements
export const NavLogo = ({ ui: { HStack, Box } }) => ({
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
      <svg viewBox="0 0 400 400" width="50px" height="50px">
        <g>
          <g>
            <path
              d=" M 135.552 330.553 L 361.327 153.019 L 355.324 79.634 L 62.254 315.291 L 135.552 330.553"
              fill="rgb(47,133,90)"
            />
          </g>

          <g>
            <path
              d=" M 386.738 382.007 L 129.859 329.367 C 183.589 285.166 189.933 275.864 228.383 241.619"
              fill="rgb(47,133,90)"
            />
          </g>
          <g>
            <path
              d=" M 237.338 253.966 C 247.43 261.196 311.655 307.207 430.013 392"
              fill="rgb(47,133,90)"
            />
          </g>
          <g>
            <path
              d=" M 275.179 55.289 L 48.217 239.578 L 55.357 307.866 L 347.239 70.32 L 275.179 55.289"
              fill="rgb(72,187,120)"
            />
          </g>
          <g>
            <path
              d=" M 8.807 7.24 L 277.111 55.692 C 223.727 100.811 214.169 108.181 173.883 141.777"
              fill="rgb(72,187,120)"
            />
          </g>
        </g>
      </svg>
    </HStack>
  )
}
