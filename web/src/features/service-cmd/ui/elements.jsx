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
              padding: [{ x: 2, bottom: 12 }, { md: { x: 6, bottom: 8 } }],
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
    ViewMetric({ icon, label, text, color, size, textBox, ...props }) {
      const sizes = t.getMatch(size || 'md')({
        sm: {
          icon: '3xl',
          label: ['sm', { md: 'lg' }],
          text: ['md', { xl: 'xl' }],
        },
        md: {
          icon: ['2xl', { lg: '3xl' }],
          label: ['sm', { md: 'lg' }],
          text: ['xl', { xl: '2xl' }],
        },
        lg: {
          icon: ['4xl', { lg: '5xl' }],
          label: ['md', { md: 'xl' }],
          text: ['xl', { xl: '4xl' }],
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
              box={t.merge(
                { padding: [{ right: 2, top: 0 }, { lg: { top: 3 } }] },
                textBox || {}
              )}
            >
              {text}
            </Text>
          </When>
        </Col>
      )
    },
    ViewIconLabel({
      icon,
      text,
      color,
      size,
      iconSize,
      weight,
      letterSpacing,
      busy,
      textBox,
      ...props
    }) {
      return (
        <HStack y="center" {...props}>
          <Icon
            name={icon}
            size={iconSize || size}
            color={color}
            box={{
              margin: {
                right: 2,
                top: 1,
              },
            }}
          />
          <Text
            size={size}
            weight={weight}
            color={color}
            box={{
              margin: {
                right: 2,
              },
              ...textBox,
            }}
            letterSpacing={letterSpacing}
          >
            {text}
          </Text>
        </HStack>
      )
    },
    TransportButton({ status, busy, onStart, onStop }) {
      const buttonProps = {
        radius: 'full',
        size: 'sm',
        borderWidth: 2,
        box: {
          padding: 2,
          margin: { x: 2 },
          opacity: busy ? 50 : null,
          cursor: busy ? 'wait' : 'pointer',
          outline: 'none',
        },
        disabled: busy,
      }
      const iconProps = {
        size: '3xl',
        style: {
          paddingLeft: 1.8,
          paddingTop: 1.5,
        },
      }
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
                    {...buttonProps}
                    color={busy ? 'red-500' : ['red-500', { hover: 'white' }]}
                    bg={busy ? null : [null, { hover: 'red-500' }]}
                    border="red-500"
                    onClick={() => onStart && onStop()}
                  >
                    <Icon {...iconProps} name="stop" />
                  </Button>
                ),
                _: (
                  <Button
                    {...buttonProps}
                    color={
                      busy ? 'green-500' : ['green-500', { hover: 'white' }]
                    }
                    bg={busy ? null : [null, { hover: 'green-500' }]}
                    border="green-500"
                    onClick={() => onStart && onStart()}
                  >
                    <Icon {...iconProps} name="play" />
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
