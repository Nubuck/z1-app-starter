import React from 'react'
import { task, Link } from '@z1/lib-feature-box'

// main
export const elements = task(
  t => ({ ui: { Button, VStack, HStack, Icon, Spinner, Text } }) => ({
    ViewSpinner({ text }) {
      return (
        <VStack>
          <Spinner />
          <Text>{text}</Text>
        </VStack>
      )
    },
    ViewHeading({ title, text, icon }) {
      return (
        <VStack>
          <HStack>
            {t.isNil(icon) ? null : <Icon name={icon} />}
            <Text>{title}</Text>
          </HStack>
          <HStack>
            <Text>{text}</Text>
          </HStack>
        </VStack>
      )
    },
    ViewButton({ type, text, icon, onClick }) {
      const buttonProps = t.isNil(onClick) ? { type } : { type, onClick }
      return (
        <Button {...buttonProps}>
          {t.isNil(icon) ? null : <Icon name={icon} />}
          <Text>{text}</Text>
        </Button>
      )
    },
    ViewLink({ to, text, icon }) {
      return (
        <HStack>
          {t.isNil(icon) ? null : <Icon name={icon} />}
          <Text as={Link} to={to}>
            {text}
          </Text>
        </HStack>
      )
    },
  })
)
