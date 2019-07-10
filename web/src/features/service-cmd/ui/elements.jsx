import React from 'react'
import { task, Link } from '@z1/lib-feature-box'

// main
export const elements = task(
  t => ({
    Box,
    Button,
    VStack,
    HStack,
    Row,
    Col,
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
              padding: { x: 6, bottom: 8 },
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
        <VStack x="center" y="center">
          <Spinner size="lg" />
          <When is={t.not(t.isNil(text))}>
            <Text>{text}</Text>
          </When>
        </VStack>
      )
    },
    ViewHeader({ title, text, icon, highlight, size }) {
      const textSize =
        t.getMatch(size)({
          sm: 'xl',
          lg: '4xl',
        }) || '3xl'
      return (
        <HStack x="left" y="center">
          <When is={icon}>
            <Icon name={icon} size={textSize} box={{ padding: { right: 2 } }} />
          </When>
          <Text weight="medium" size={textSize} box={{ padding: { right: 2 } }}>
            {title}
          </Text>
          <Text
            weight="medium"
            size={textSize}
            color={highlight || 'yellow-500'}
          >
            {text}
          </Text>
        </HStack>
      )
    },
  })
)
