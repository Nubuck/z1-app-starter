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
              padding: { x: 6 },
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
    ServiceItem({
      _id,
      name,
      slug,
      status,
      instances,
      version,
      updatedAt,
      port,
      interpreter,
      autoStart,
      restarts,
      pmId,
      pid,
      mode,
      memory,
      cpu,
      ipAddress,
      folderStatus,
      action,
      actionStatus,
      icon,
      uptime,
    }) {
      return (
        <Row box={{ padding: { y: 4 } }}>
          <Col y="center" box={{ padding: { right: 4 } }}>
            <Icon name="cube" size="3xl" />
          </Col>
          <Col x="left" y="center" box={{ padding: { right: 4 } }}>
            <HStack y="center" x="center">
              <Text size="lg" box={{ padding: { right: 2 } }}>
                {name}
              </Text>
              <Text size="sm">{version}</Text>
            </HStack>
          </Col>

          <Col y="center" box={{ padding: { right: 4 } }}>
            <Text size="md" weight="light">
              {interpreter}
            </Text>
          </Col>
          <Col y="center" box={{ padding: { right: 4 } }}>
            <Text size="md" weight="light">
              pid {pid}
            </Text>
          </Col>
          <Col y="center" box={{ padding: { right: 4 } }}>
            <Text size="lg" weight="light">
              {`${instances || '0'}`} instance
            </Text>
          </Col>
          <Col y="center" box={{ padding: { right: 4 } }}>
            <Text size="lg" weight="light">
              {`${restarts || '0'}`} restart
            </Text>
          </Col>
          <Col y="center" box={{ padding: { right: 4 } }}>
            <Text size="lg" weight="light">
              port {`${port || '0'}`}
            </Text>
          </Col>
          <Col y="center" box={{ padding: { right: 4 } }}>
            <Text size="lg" weight="light">
              memory {`${memory || '0'}b`}
            </Text>
          </Col>
          <Col y="center" box={{ padding: { right: 4 } }}>
            <Text size="lg" weight="light">
              cpu {`${cpu || '0'}%`}
            </Text>
          </Col>
          <Col y="center" box={{ padding: { right: 4 } }}>
            <Text size="md" weight="semibold">
              {status || 'offline'}
            </Text>
          </Col>
          <Col y="center" box={{ padding: { right: 4 } }}>
            <HStack y="center">
              <Match
                value={status}
                when={{
                  online: (
                    <Button radius="full" size="sm">
                      <Icon name="stop" size="xl" />
                    </Button>
                  ),
                  _: (
                    <Button radius="full" size="sm">
                      <Icon name="play" size="xl" />
                    </Button>
                  ),
                }}
              />
              <Button radius="full" size="sm">
                <Icon name="rotate-right" size="xl" />
              </Button>
              <When
                is={t.or(
                  t.eq(actionStatus, 'launching'),
                  t.eq(actionStatus, 'stopping')
                )}
              >
                <VStack x="center" y="center" box={{ padding: { left: 6 } }}>
                  <Spinner />
                </VStack>
              </When>
            </HStack>
          </Col>
        </Row>
      )
    },
  })
)
