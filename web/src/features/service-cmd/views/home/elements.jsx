import React from 'react'
import { task } from '@z1/lib-feature-box'

// main
export const elements = task(
  t => ({
    ViewHeader,
    Match,
    When,
    MapIndexed,
    VStack,
    HStack,
    Select,
    Input,
    Spacer,
    Icon,
    Button,
    Row,
    ViewMetric,
    TransportButton,
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
      onDataChange
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
                    hover: t.eq(sortDirection, 'asc')
                      ? null
                      : 'yellow-500',
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
                    hover: t.eq(sortDirection, 'desc')
                      ? null
                      : 'yellow-500',
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
  })
)
