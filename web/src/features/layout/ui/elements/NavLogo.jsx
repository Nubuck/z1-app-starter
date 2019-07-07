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
        padding: align === 'x' ? { x: 2 } : { top: 4, bottom: 6 },
      }}
      exact={true}
    >
       <svg viewBox="0 0 550 500" width="60px" height="55px">
          <g>
            <ellipse
              vectorEffect="non-scaling-stroke"
              cx="279.0000000000001"
              cy="254.49044585987258"
              rx="231.00000000000006"
              ry="230.50955414012736"
              fill="#a0aec0"
            />
            <ellipse
              vectorEffect="non-scaling-stroke"
              cx="280.37161964466725"
              cy="254.08139865606384"
              rx="213.3716196446676"
              ry="212.91860134393582"
              fill="#2d3748"
            />
            <g>
              <path
                d=" M 201.219 388.457 L 458.227 213.635 L 445.743 161.592 L 129.89 365.702 L 201.219 388.457"
                fill="#a0aec0"
              />
            </g>
            <g>
              <path
                d=" M 487.743 479.861 L 195.679 386.689 C 253.689 348.277 261.123 343.534 303.01 315.913"
                fill="#a0aec0"
              />
            </g>
            <g>
              <path
                d=" M 310.307 322.719 C 319.601 330.95 378.747 383.33 487.743 479.861"
                fill="#e2e8f0"
              />
            </g>
            <g>
              <path
                d=" M 368.407 128.995 L 111.464 299.467 L 123.743 357.592 L 438.536 151.367 L 368.407 128.995"
                fill="#e2e8f0"
              />
            </g>
            <g>
              <path
                d=" M 81.884 37.592 L 370.287 129.595 C 312.541 168.976 305.347 173.199 263.783 201.108"
                fill="#e2e8f0"
              />
            </g>
          </g>
        </svg>
    </HStack>
  )
}
