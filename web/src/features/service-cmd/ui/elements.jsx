import React from 'react'
import { task, Link } from '@z1/lib-feature-box'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

// main
export const elements = task(
  t => ({
    Button,
    VStack,
    HStack,
    Row,
    Col,
    Icon,
    Spinner,
    Text,
    Match,
    When,
    Spacer,
  }) => {
    const ViewIconLabel = ({
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
    }) => {
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
            }}
            next={ui => ui.next(textBox || {})}
            letterSpacing={letterSpacing}
          >
            {text}
          </Text>
        </HStack>
      )
    }
    return {
      ViewIconLabel,
      ViewContainer({ children, box, center }) {
        return (
          <VStack
            x="left"
            y={t.not(center) ? 'top' : 'center'}
            box={{
              padding: [{ x: 2, bottom: 12 }, { md: { x: 6, bottom: 8 } }],
              width: 'full',
            }}
            next={ui => ui.next(box || {})}
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
      ViewHeader({ title, text, icon, highlight, size, to, box }) {
        const textSize = t.getMatch(size)({
          sm: ['lg', { sm: 'xl' }],
          lg: ['3xl', { sm: '4xl' }],
        }) || ['2xl', { sm: '3xl' }]
        const headerProps = t.isNil(to)
          ? { container: {}, text: { color: highlight || 'yellow-500' } }
          : {
              container: { as: Link, to },
              text: {
                color: [highlight || 'yellow-500', { hover: 'white' }],
              },
            }
        return (
          <HStack
            x="left"
            y="center"
            box={{ flexWrap: true }}
            {...headerProps.container}
            next={ui => ui.next(box || {})}
          >
            <When is={icon}>
              <Icon
                name={icon}
                size={textSize}
                box={{ padding: { right: 3, top: 1 } }}
              />
            </When>
            <Text
              weight="medium"
              size={textSize}
              box={{ padding: { right: 3 } }}
            >
              {title}
            </Text>
            <Text
              weight="medium"
              size={textSize}
              box={{ padding: { right: 3 } }}
              {...headerProps.text}
            >
              {text}
            </Text>
          </HStack>
        )
      },
      ViewMetric({ icon, label, text, color, size, textBox, ...props }) {
        const sizes = t.getMatch(size || 'md')({
          sm: {
            icon: ['xl', { lg: '2xl' }],
            label: ['md', { md: 'lg' }],
            text: ['md', { xl: 'xl' }],
          },
          md: {
            icon: ['2xl', { lg: '3xl' }],
            label: ['md', { lg: 'lg' }],
            text: ['xl', { xl: '2xl' }],
          },
          lg: {
            icon: ['4xl', { lg: '5xl' }],
            label: ['lg', { md: 'xl' }],
            text: ['xl', { xl: '4xl' }],
          },
        })
        return (
          <Col y="top" box={{ padding: { x: 4, bottom: 3 } }} {...props}>
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
                box={{ padding: { right: 2, top: 0 } }}
                next={ui => ui.next(textBox || {})}
              >
                {text}
              </Text>
            </When>
          </Col>
        )
      },
      TransportButton({ status, busy, onStart, onStop, box, props }) {
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
          <VStack y="center" {...props}>
            <HStack
              y="center"
              box={{
                padding: [{ y: 2 }, { md: { y: 0 }, lg: { y: 2 } }],
                width: 20,
                height: 20,
              }}
              next={ui => ui.next(box || {})}
            >
              <When is={t.not(busy)}>
                <Match
                  value={status}
                  when={{
                    online: (
                      <Button
                        {...buttonProps}
                        color={
                          busy ? 'red-500' : ['red-500', { hover: 'white' }]
                        }
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
          </VStack>
        )
      },
      TransportItemRow({ status, busy, children }) {
        return (
          <Row
            y="center"
            box={{
              margin: [{ y: 2 }, { sm: { x: 4 } }],
              padding: [{ y: 3, x: 4 }, { sm: { y: 2,x: 6 } }],
              borderWidth: [{ bottom: 2 }, { sm: { left: 2, bottom: 0 } }],
              borderColor: busy
                ? 'orange-500'
                : t.not(t.eq(status, 'online'))
                ? 'red-500'
                : 'green-500',
            }}
          >
            {children}
          </Row>
        )
      },
      TransportItemMetricRow({ status, children }) {
        return (
          <Row
            box={{
              opacity: t.or(
                t.isNil(status),
                t.or(t.eq(status, 'stopped'), t.eq(status, 'init'))
              )
                ? 50
                : 100,
            }}
          >
            {children}
          </Row>
        )
      },
      TransportStatusIcon({ status, busy, action, spacing, ...props }) {
        return (
          <VStack
            y="top"
            box={{
              padding: { right: 4, left: 2 },
              display: ['hidden', { sm: 'flex' }],
              width: [12, { xl: 16 }],
            }}
            {...props}
          >
            <HStack y="center" x="center">
              <Icon
                name="cube"
                size={['3xl', { xl: '4xl' }]}
                color={
                  busy
                    ? 'orange-500'
                    : t.not(t.eq(status, 'online'))
                    ? 'red-500'
                    : 'green-500'
                }
                box={{
                  opacity: busy ? 50 : 100,
                  width: [8, { xl: 10 }],
                  textAlignX: 'center',
                }}
              />
            </HStack>
            <HStack y="center" x="center">
              <When is={busy}>
                <Text
                  size="sm"
                  color="orange-500"
                  weight="thin"
                  letterSpacing="wide"
                  box={{
                    padding: { top: t.not(spacing) ? 0 : 1 },
                  }}
                >
                  {action || 'busy'}
                </Text>
              </When>
              <When is={t.not(busy)}>
                <Text
                  size="sm"
                  weight="thin"
                  letterSpacing="wide"
                  box={{
                    padding: { top: t.not(spacing) ? 0 : 1 },
                  }}
                >
                  ready
                </Text>
              </When>
            </HStack>
          </VStack>
        )
      },
      TransportTitle({
        name,
        version,
        autoStart,
        status,
        busy,
        instances,
        to,
      }) {
        const titleProps = t.isNil(to)
          ? { container: {}, text: { color: 'yellow-500' } }
          : {
              container: { as: Link, to },
              text: {
                color: ['yellow-500', { hover: 'white' }],
              },
            }
        return (
          <VStack
            y="top"
            box={{
              position: 'relative',
              padding: [{ left: 0, right: 4 }, { lg: { left: 3 } }],
              flexWrap: true,
            }}
            {...titleProps.container}
          >
            <Text
              size={['xl', { xl: '2xl' }]}
              weight="semibold"
              {...titleProps.text}
            >
              {name}
            </Text>
            <HStack y="bottom">
              <Text size="sm" weight="thin" box={{ padding: { top: 1 } }}>
                v{version}
              </Text>
              <When is={autoStart}>
                <Spacer />
                <ViewIconLabel
                  icon="flag-checkered"
                  text="autostart"
                  color="blue-500"
                  iconSize="xl"
                  size="sm"
                  letterSpacing="wide"
                  box={{ padding: { left: 1 } }}
                  textBox={{ margin: 0 }}
                  y="bottom"
                />
              </When>
            </HStack>
            <VStack
              y="top"
              x="left"
              box={{
                position: 'absolute',
                pin: { top: true, right: true },
                margin: { top: -4, right: -4 },
                alignSelf: 'auto',
              }}
            >
              <Text
                weight="semibold"
                size="xl"
                color={
                  busy
                    ? 'orange-500'
                    : t.not(t.eq(status, 'online'))
                    ? 'gray-600'
                    : 'green-500'
                }
                box={{ margin: { right: 2 } }}
              >{`x${instances || '0'}`}</Text>
            </VStack>
          </VStack>
        )
      },
      TransportStatusLabel({ status, busy, uptime, box }) {
        return (
          <HStack
            y="center"
            box={{
              padding: [
                { bottom: 2, left: 2 },
                {
                  md: { right: 6, top: 1 },
                  lg: { x: 0 },
                },
              ],
              opacity: busy ? 50 : null,
            }}
            next={ui => ui.next(box || {})}
          >
            <ViewIconLabel
              icon={t.eq(status, 'online') ? 'play' : 'stop'}
              text={status || 'offline'}
              color={t.eq(status, 'online') ? 'green-500' : 'red-500'}
              size={['md', { md: 'xl' }]}
              busy={busy}
              box={{ margin: { right: 2 } }}
            />
            <When
              is={t.and(t.eq(status, 'online'), t.isType(uptime, 'String'))}
            >
              <ViewIconLabel
                size={['md', { md: 'xl' }]}
                icon="arrow-up"
                text={dayjs().from(dayjs(uptime), true)}
              />
            </When>
          </HStack>
        )
      },
      TimestampLabel({ updatedAt, ...props }) {
        return (
          <ViewIconLabel
            icon="calendar"
            size="sm"
            iconSize="lg"
            weight="thin"
            letterSpacing="wide"
            text={
              updatedAt
                ? `updated ${dayjs().from(dayjs(updatedAt), true)} ago`
                : ''
            }
            box={{
              opacity: 50,
              padding: [{ bottom: 4, left: 0, top: 0 }, { md: { left: 3 } }],
            }}
            {...props}
          />
        )
      },
      DateLabel({ label, date, ...props }) {
        return (
          <ViewIconLabel
            icon="calendar"
            size="sm"
            iconSize="lg"
            weight="thin"
            letterSpacing="wide"
            text={
              date ? `${label} ${dayjs(date).format('YYYY-MM-DD HH:mm a')}` : ''
            }
            box={{
              padding: { bottom: 4, left: 3, top: 0 },
            }}
            {...props}
          />
        )
      },
    }
  }
)
