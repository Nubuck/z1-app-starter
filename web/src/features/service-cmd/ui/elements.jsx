import React from 'react'
import { task, Link } from '@z1/lib-feature-box'

// main
export const elements = task(
  t => ({
    Box,
    Button,
    VStack,
    HStack,
    Icon,
    Spinner,
    Text,
    SchemaForm,
    Match,
    When,
  }) => ({
    ViewContainer({ children, box, large, center }) {
      return (
        <VStack
          x="left"
          y={t.not(center) ? 'top' : 'center'}
          box={t.merge(
            {
              padding: 6,
              width: 'full',
            },
            box || {}
          )}
        >
          {children}
        </VStack>
      )
    },
    ViewSpinner({ text }) {
      return (
        <VStack>
          <Spinner />
          <Text>{text}</Text>
        </VStack>
      )
    },
  })
)
