import React from 'react'
import { task, Link } from '@z1/lib-feature-box'

// main
export const elements = task(
  t => ({ Box, Button, VStack, HStack, Icon, Spinner, Text, SchemaForm }) => ({
    ViewContainer({ children, box }) {
      return (
        <VStack
          x="center"
          y="top"
          box={t.merge(
            {
              padding: { x: 3, top: 6, bottom: 4 },
              width: [
                'full',
                { sm: '8/12', md: '5/12', lg: '4/12', xl: '3/12' },
              ],
              margin: { x: 'auto' },
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
    ViewHeading({ title, text, icon, box }) {
      return (
        <VStack box={t.merge({ padding: { bottom: 4 } }, box || {})}>
          <HStack x="center" y="center">
            {t.isNil(icon) ? null : <Icon name={icon} />}
            <Text size={['3xl', { lg: '4xl' }]} lineHeight="tight" x="center">
              {title}
            </Text>
          </HStack>
          <HStack x="center" y="center" box={{ padding: { top: 3 } }}>
            <Text x="center" letterSpacing="tight" size={['lg', { lg: 'xl' }]}>
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
            width: 'full',
            color: 'white',
            padding: { top: 3 },
          }}
          className="form-dark"
          {...props}
        />
      )
    },
    ViewButton({
      type,
      text,
      children,
      icon,
      onClick,
      loading,
      to,
      box,
      ...props
    }) {
      const buttonProps = t.isNil(onClick)
        ? t.isNil(to)
          ? { type }
          : { type, as: Link, to }
        : { type, onClick }
      return (
        <Button
          {...buttonProps}
          bg={[null, { hover: 'yellow-500' }]}
          size="lg"
          color={['yellow-500', { hover: 'gray-900' }]}
          radius="lg"
          border={['yellow-500', { hover: 'yellow-500' }]}
          borderWidth={2}
          box={t.merge({ width: 'full' }, box || {})}
          style={{ minHeight: 55 }}
          disabled={loading}
          {...props}
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
    ViewLink({ to, text, children, icon, box, textBox }) {
      return (
        <HStack box={box}>
          {t.isNil(icon) ? null : <Icon name={icon} />}
          <Text
            as={Link}
            to={to}
            x='center'
            box={t.merge(
              {
                fontWeight: 'bold',
                color: ['green-500', { hover: 'white' }],
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'col',
                alignSelf: 'stretch',
                padding: { x: 3 },
              },
              textBox || {}
            )}
          >
            {text || children}
          </Text>
        </HStack>
      )
    },
    ViewAlert({ text, children, color, bgColor, icon, box }) {
      return (
        <HStack
          x="center"
          y="left"
          box={{
            padding: { x: 3, y: 3 },
            margin: { y: 2 },
            color,
            bgColor,
            ...box,
          }}
        >
          {t.isNil(icon) ? null : (
            <Icon
              name={icon}
              as="div"
              size="2xl"
              box={{ margin: { right: 2 } }}
            />
          )}
          {t.isNil(text) ? null : (
            <Text size="lg" weight="semibold">
              {text}
            </Text>
          )}
          {children}
        </HStack>
      )
    },
  })
)
