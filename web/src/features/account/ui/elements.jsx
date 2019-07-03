import React from 'react'
import { task, Link } from '@z1/lib-feature-box'

// main
export const elements = task(
  t => ({
    ui: { Box, Button, VStack, HStack, Icon, Spinner, Text, SchemaForm },
  }) => ({
    ViewContainer({ children }) {
      return (
        <VStack
          x="center"
          y="top"
          box={{ padding: { x: 3, top: 5, bottom: 4 } }}
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
    ViewHeading({ title, text, icon }) {
      return (
        <VStack box={{ padding: { bottom: 4 } }}>
          <HStack x="center" y="center">
            {t.isNil(icon) ? null : <Icon name={icon} />}
            <Text size={['2xl', { lg: '5xl' }]} x="center">
              {title}
            </Text>
          </HStack>
          <HStack x="center" y="center">
            <Text x="center" size={['xl', { lg: '2xl' }]}>
              {text}
            </Text>
          </HStack>
        </VStack>
      )
    },
    ViewForm(props) {
      return (
        <Box
          as={SchemaForm}
          box={{
            display: 'block',
            width: 64,
            color: 'white',
            padding: { top: 3 },
          }}
          className="form-dark"
          {...props}
        />
      )
    },
    ViewButton({ type, text, children, icon, onClick, loading }) {
      const buttonProps = t.isNil(onClick) ? { type } : { type, onClick }
      return (
        <Button
          {...buttonProps}
          bg={[null, { hover: 'green-500' }]}
          size="lg"
          color={['green-500', { hover: 'white' }]}
          radius="lg"
          border={['green-500', { hover: 'green-500' }]}
          borderWidth={2}
          box={{ width: 'full' }}
          style={{ minHeight: 55 }}
        >
          {t.not(loading) ? (
            <React.Fragment>
              {t.isNil(icon) ? null : <Icon name={icon} />}
              {t.isNil(text) ? null : <Text>{text}</Text>}
              {children}
            </React.Fragment>
          ) : (
            <Spinner size="xs" box={{ height: 6, padding: { y: 1 } }} />
          )}
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
