import React from 'react'
import { connectState } from '@z1/lib-feature-box'

// state
const stateQuery = ({ brand }) => ({ brand })

// main
export const LandingPage = ({ ui: { VStack, HStack, Text, Icon } }) =>
  connectState(stateQuery)(({ brand }) => {
    return (
      <VStack
        x="center"
        y="center"
        box={{ color: brand.secondary, height: 'full' }}
      >
        {/* <svg viewBox="0 0 627 500" width="200px" height="200px">
        <g>
          <g>
            <path
              d=" M 125 475.859 L 603.992 115.86 L 14 23 L 601 23 L 5 475.859 L 125 475.859"
              fill="rgb(56,161,105)"
            />
            <g>
              <path
                d=" M 486.202 22 L 365.431 113.492 L 11 381.998 L 602 473 L 12.008 470.859 L 605 22 L 486.202 22"
                fill="rgb(72,187,120)"
              />
            </g>
          </g>
          <g>
            <path d=" M 602 473 L 2 476 L 137 377" fill="rgb(56,161,105)" />
            <path d=" M 9 22 L 604 22 L 469 124" fill="rgb(72,187,120)" />
          </g>
        </g>
      </svg> */}
        {/* <svg viewBox="0 0 627 500" width="200px" height="200px">
          <g>
            <g>
              <path
                d=" M 127.798 488 L 603 128.002 L 479 128.002 L 9 488 L 127.798 488 M 605 488 L 138 488 C 204.405 438.137 212.998 431.904 261 396 M 261 396 C 279.019 400.819 393.685 431.486 605 488"
                fillRule="evenodd"
                fill="rgb(47,133,90)"
                vectorEffect="non-scaling-stroke"
                strokeWidth="0"
                stroke="rgb(255,255,255)"
                strokeLinejoin="miter"
                strokeLinecap="square"
                strokeMiterlimit="2"
              />
            </g>

            <g>
              <path
                d=" M 486.202 22 L 11 381.998 L 127.798 385 L 603 22 L 486.202 22 M 9 22 L 476 22 C 409.595 71.863 361.397 109.197 355 114 M 355 114 L 11 22"
                fillRule="evenodd"
                fill="rgb(72,187,120)"
                vectorEffect="non-scaling-stroke"
                strokeWidth="0"
                stroke="rgb(255,255,255)"
                strokeLinejoin="miter"
                strokeLinecap="square"
                strokeMiterlimit="2"
              />
            </g>
          </g>
        </svg> */}
        {/* <svg viewBox="0 0 627 500" width="200px" height="200px">
          <g>
            <g>
              <path
                d=" M 127.798 488 L 538 173 L 450 152 L 9 488 L 127.798 488 M 605 488 L 138 488 C 204.405 438.137 212.998 431.904 261 396 M 261 396 C 279.019 400.819 393.685 431.486 605 488"
                fillRule="evenodd"
                fill="rgb(47,133,90)"
              />
            </g>

            <g>
              <path
                d=" M 486.202 22 L 55 341 L 151 365 L 603 22 L 486.202 22 M 9 22 L 476 22 C 409.595 71.863 401.002 77.486 353 113 M 11 22"
                fillRule="evenodd"
                fill="rgb(72,187,120)"
              />
            </g>
          </g>
        </svg> */}
        {/* <svg viewBox="0 0 550 500" width="200px" height="200px">
        <g>
          <g>
            <path
              d=" M 196.476 370.865 L 453.484 196.043 L 392.841 176.697 L 125.147 348.11 L 196.476 370.865 M 483 462.269 L 202.602 372.819 C 258.25 336.081 265.382 331.545 305.564 305.127 M 305.564 305.127 C 314.858 313.358 374.004 365.739 483 462.269"
              fillRule="evenodd"
              fill="rgb(47,133,90)"
            />
          </g>

          <g>
            <path
              d=" M 363.664 111.404 L 106.721 281.875 L 176.37 304.094 L 433.792 133.775 L 363.664 111.404 M 77.14 20 L 357.539 109.45 C 301.89 146.188 294.951 150.119 254.893 176.15 M 78.341 20.383"
              fillRule="evenodd"
              fill="rgb(72,187,120)"
            />
          </g>
        </g>
      </svg> */}
        {/* <svg viewBox="0 0 550 500" width="200px" height="200px">
          <g>
            <g>
              <path
                d=" M 196.476 370.865 L 453.484 196.043 L 392.841 176.697 L 125.147 348.11 L 196.476 370.865"
                fill="rgb(47,133,90)"
              />
            </g>
            <g>
              <path
                d=" M 483 462.269 L 190.935 369.098 C 248.945 330.685 256.379 325.942 298.267 298.321"
                fill="rgb(47,133,90)"
              />
            </g>
            <g>
              <path
                d=" M 305.564 305.127 C 314.858 313.358 374.004 365.739 483 462.269"
                fill="rgb(47,133,90)"
              />
            </g>
            <g>
              <path
                d=" M 363.664 111.404 L 106.721 281.875 L 176.37 304.094 L 433.792 133.775 L 363.664 111.404"
                fill="rgb(72,187,120)"
              />
            </g>
            <g>
              <path
                d=" M 77.14 20 L 365.544 112.003 C 307.798 151.385 300.604 155.608 259.039 183.517"
                fill="rgb(72,187,120)"
              />
            </g>
          </g>
        </svg> */}
        <svg viewBox="0 0 550 500" width="200px" height="200px">
          <g>
            <g>
              <path
                d=" M 196.476 370.865 L 453.484 196.043 L 441 144 L 125.147 348.11 L 196.476 370.865"
                fill="rgb(47,133,90)"
              />
            </g>

            <g>
              <path
                d=" M 483 462.269 L 190.935 369.098 C 248.945 330.685 256.379 325.942 298.267 298.321"
                fill="rgb(47,133,90)"
              />
            </g>

            <g>
              <path
                d=" M 305.564 305.127 C 314.858 313.358 374.004 365.739 483 462.269"
                fill="rgb(47,133,90)"
              />
            </g>

            <g>
              <path
                d=" M 363.664 111.404 L 106.721 281.875 L 119 340 L 433.792 133.775 L 363.664 111.404"
                fill="rgb(72,187,120)"
              />
            </g>

            <g>
              <path
                d=" M 77.14 20 L 365.544 112.003 C 307.798 151.385 300.604 155.608 259.039 183.517"
                fill="rgb(72,187,120)"
              />
            </g>
          </g>
        </svg>
        <Text
          size={['4xl', { md: '5xl' }]}
          family={brand.fontFamily}
          space="no-wrap"
          box={{ padding: { bottom: 2 } }}
        >
          Z1 App Starter
        </Text>
        <Text size="6xl" family={brand.fontFamily} x="center">
          Welcome
        </Text>
      </VStack>
    )
  })
