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
    ViewMetric({ icon, label, text, color, size, ...props }) {
      const sizes = t.getMatch(size || 'md')({
        sm: {
          icon: '3xl',
          label: ['sm', { md: 'lg' }],
          text: ['md', { md: 'xl' }],
        },
        md: {
          icon: ['3xl', { lg: '4xl' }],
          label: ['sm', { md: 'lg' }],
          text: ['lg', { md: '2xl' }],
        },
        lg: {
          icon: ['4xl', { lg: '5xl' }],
          label: ['md', { md: 'xl' }],
          text: ['xl', { md: '4xl' }],
        },
      })
      return (
        <Col y="top" box={{ padding: { x: 4, bottom: 4 } }} {...props}>
          <HStack y="center" x="left">
            <Icon
              name={icon}
              size={sizes.icon}
              box={{ margin: { right: 3 } }}
            />
            <Text size={sizes.label} weight="hairline" letterSpacing="wide">
              {label}
            </Text>
          </HStack>
          <When is={t.not(t.isNil(text))}>
            <Text
              color={color}
              weight="semibold"
              size={sizes.text}
              stretch
              box={{ padding: [{ right: 2, top: 0 }, { lg: { top: 3 } }] }}
            >
              {text}
            </Text>
          </When>
        </Col>
      )
    },
    ViewStatus({ icon, text, color, size, weight, ...props }) {
      return (
        <HStack {...props}>
          <Icon name={icon} />
          <Text>{text}</Text>
        </HStack>
      )
    },
    TransportButton({ status, busy, onStart, onStop }) {
      return (
        <HStack
          y="center"
          box={{
            padding: [{ y: 2 }, { md: { y: 0 }, lg: { y: 2 } }],
            width: 20,
            height: 20,
          }}
        >
          <When is={t.not(busy)}>
            <Match
              value={status}
              when={{
                online: (
                  <Button
                    radius="full"
                    size="sm"
                    color={busy ? 'red-500' : ['red-500', { hover: 'white' }]}
                    bg={busy ? null : [null, { hover: 'red-500' }]}
                    border="red-500"
                    borderWidth={2}
                    disabled={busy}
                    box={{
                      padding: 2,
                      margin: { x: 2 },
                      opacity: busy ? 50 : null,
                      cursor: busy ? 'wait' : 'pointer',
                      outline: 'none',
                    }}
                    onClick={() => onStart && onStop()}
                  >
                    <Icon
                      name="stop"
                      size="3xl"
                      style={{
                        paddingLeft: 1.8,
                        paddingTop: 1.5,
                      }}
                    />
                  </Button>
                ),
                _: (
                  <Button
                    radius="full"
                    size="sm"
                    color={
                      busy ? 'green-500' : ['green-500', { hover: 'white' }]
                    }
                    bg={busy ? null : [null, { hover: 'green-500' }]}
                    border="green-500"
                    borderWidth={2}
                    disabled={busy}
                    box={{
                      padding: 2,
                      margin: { x: 2 },
                      opacity: busy ? 50 : null,
                      cursor: busy ? 'wait' : 'pointer',
                      outline: 'none',
                    }}
                    onClick={() => onStart && onStart()}
                  >
                    <Icon
                      name="play"
                      size="3xl"
                      style={{
                        paddingLeft: 1.8,
                        paddingTop: 1.5,
                      }}
                    />
                  </Button>
                ),
              }}
            />
          </When>
          <When is={busy}>
            <Button
              as="div"
              radius="full"
              size="md"
              box={{ padding: 2, margin: { x: 2 } }}
            >
              <Spinner size="md" box={{ width: 8, height: 8 }} />
            </Button>
          </When>
        </HStack>
      )
    },
  })
)
