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
        <svg viewBox="0 0 550 500" width="240px" height="240px">
          <g>
            <ellipse
              vectorEffect="non-scaling-stroke"
              cx="279.0000000000001"
              cy="254.49044585987258"
              rx="231.00000000000006"
              ry="230.50955414012736"
              fill="rgb(47,133,90)"
            />
            <ellipse
              vectorEffect="non-scaling-stroke"
              cx="280.37161964466725"
              cy="254.08139865606384"
              rx="213.3716196446676"
              ry="212.91860134393582"
              fill="rgb(28,70,50)"
            />
            <g>
              <path
                d=" M 201.219 388.457 L 458.227 213.635 L 445.743 161.592 L 129.89 365.702 L 201.219 388.457"
                fill="rgb(47,133,90)"
              />
            </g>
            <g>
              <path
                d=" M 487.743 479.861 L 195.679 386.689 C 253.689 348.277 261.123 343.534 303.01 315.913"
                fill="rgb(47,133,90)"
              />
            </g>
            <g>
              <path
                d=" M 310.307 322.719 C 319.601 330.95 378.747 383.33 487.743 479.861"
                fill="rgb(47,133,90)"
              />
            </g>
            <g>
              <path
                d=" M 368.407 128.995 L 111.464 299.467 L 123.743 357.592 L 438.536 151.367 L 368.407 128.995"
                fill="rgb(72,187,120)"
              />
            </g>
            <g>
              <path
                d=" M 81.884 37.592 L 370.287 129.595 C 312.541 168.976 305.347 173.199 263.783 201.108"
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
