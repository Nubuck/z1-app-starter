import React from 'react'
import { task } from '@z1/lib-feature-box'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

// main
export const elements = task(
  t => ({
    ViewHeader,
    When,
    MapIndexed,
    VStack,
    HStack,
    Select,
    Input,
    Text,
    Spacer,
    Icon,
    Button,
    Row,
    ViewIconLabel,
  }) => ({
    ViewToolbar({
      title,
      text,
      icon,
      search,
      sortBy,
      sortFields,
      sortDirection,
      onDataChange,
    }) {
      return (
        <Row box={{ flexWrap: true, shadow: 'md' }} className="form-dark">
          <VStack box={{ padding: { y: 4 } }}>
            <ViewHeader title={title} text={text} icon={icon} size="md" />
          </VStack>
          <Spacer />
          <VStack
            y="center"
            box={{
              padding: { y: 4 },
              width: ['full', { sm: 'auto' }],
            }}
          >
            <HStack y="center">
              <Icon name="search" size="2xl" box={{ margin: { right: 2 } }} />
              <Input
                placeholder="Search..."
                value={search}
                onChange={t.throttle(event => {
                  onDataChange &&
                    onDataChange({
                      data: { search: event.target.value },
                    })
                }, 1500)}
              />
            </HStack>
          </VStack>
          <VStack
            y="center"
            box={{
              padding: [{ y: 4 }, { sm: { left: 2 } }],
              width: ['full', { md: 'auto' }],
            }}
          >
            <HStack y="center">
              <Icon name="sort" size="2xl" box={{ margin: { right: 2 } }} />
              <Select
                box={{ margin: { right: 2 } }}
                value={sortBy}
                onChange={event =>
                  onDataChange &&
                  onDataChange({
                    data: {
                      sortBy: event.target.value,
                    },
                  })
                }
              >
                <MapIndexed
                  list={sortFields || []}
                  render={({ item, index }) => (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  )}
                />
              </Select>
              <Button
                radius="full"
                size="sm"
                disabled={t.eq(sortDirection, 'asc')}
                color={[
                  t.eq(sortDirection, 'asc') ? 'green-500' : null,
                  {
                    hover: t.eq(sortDirection, 'asc') ? null : 'yellow-500',
                  },
                ]}
                box={{ padding: { x: 1 } }}
                onClick={() =>
                  onDataChange &&
                  onDataChange({
                    data: { sortDirection: 'asc' },
                  })
                }
              >
                <Icon name="sort-amount-asc" size="2xl" />
              </Button>
              <Button
                radius="full"
                size="sm"
                disabled={t.eq(sortDirection, 'desc')}
                color={[
                  t.eq(sortDirection, 'desc') ? 'green-500' : null,
                  {
                    hover: t.eq(sortDirection, 'desc') ? null : 'yellow-500',
                  },
                ]}
                box={{ padding: { x: 1 } }}
                onClick={() =>
                  onDataChange &&
                  onDataChange({
                    data: { sortDirection: 'desc' },
                  })
                }
              >
                <Icon name="sort-amount-desc" size="2xl" />
              </Button>
            </HStack>
          </VStack>
        </Row>
      )
    },
    ViewTransportItemRow({ status, busy, children }) {
      return (
        <Row
          y="center"
          box={{
            margin: { y: 2 },
            padding: [{ y: 3 }, { sm: { y: 2, x: 6 } }],
            borderWidth: [{ bottom: 2 }, { sm: { left: 2, bottom: 0 } }],
            borderColor: busy
              ? 'orange-500'
              : t.not(t.eq(status, 'online'))
              ? 'red-500'
              : 'green-500',
            shadow: 'md',
          }}
        >
          {children}
        </Row>
      )
    },

    ViewTransportMetricRow({ status, children }) {
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
    ViewStatusIcon({ status, busy, action }) {
      return (
        <VStack
          y="top"
          box={{
            padding: { right: 4, left: 2 },
            display: ['hidden', { sm: 'flex' }],
            width: [12, { xl: 16 }],
          }}
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
                  padding: { top: 1 },
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
                  padding: { top: 1 },
                }}
              >
                ready
              </Text>
            </When>
          </HStack>
        </VStack>
      )
    },
    ViewTransportTitle({ name, version, autoStart, status, busy, instances }) {
      return (
        <VStack
          y="top"
          box={{
            position: 'relative',
            padding: [{ left: 0, right: 4 }, { lg: { left: 3 } }],
            flexWrap: true,
          }}
        >
          <Text
            size={['xl', { xl: '2xl' }]}
            color={'yellow-500'}
            weight="semibold"
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
    ViewTransportStatusLabel({ status, busy, uptime }) {
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
        >
          <ViewIconLabel
            icon={t.eq(status, 'online') ? 'play' : 'stop'}
            text={status || 'offline'}
            color={t.eq(status, 'online') ? 'green-500' : 'red-500'}
            size="xl"
            busy={busy}
            box={{ margin: { right: 2 } }}
          />
          <When is={t.and(t.eq(status, 'online'), t.isType(uptime, 'String'))}>
            <ViewIconLabel
              icon="arrow-up"
              text={dayjs().from(dayjs(uptime), true)}
            />
          </When>
        </HStack>
      )
    },
    ViewTimestampLabel({ updatedAt }) {
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
            padding: { bottom: 4, left: 3, top: 0 },
          }}
        />
      )
    },
  })
)
