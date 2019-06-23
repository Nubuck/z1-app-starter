import React from 'react'
import { task, Link } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// main
export const home = task(t =>
  createView('HOME', {
    state: {
      async load({ state, api, detailKey, viewData, formData, status, type }) {
        return {
          status: null,
          data: null,
          error: null,
        }
      },
      data({ viewData, formData, status, type, error }) {
        return {
          status,
          data: viewData,
          error,
        }
      },
    },
    ui: ({
      css,
      ui: { HStack, VStack, Icon, Box, Row, Col, Text, Spinner, Match },
    }) => ({ state, mutations }) => {
      return (
        <VStack box={{ padding: 3 }}>
          <HStack x="center" y="left">
            <Icon name="home-outline" className="mr-2" size="5xl" />
            <Text
              as="h1"
              weight="bold"
              family="mono"
              size="5xl"
              box={{ margin: 0 }}
            >
              HOME
            </Text>
          </HStack>
          <VStack>
            <Link to="/box-editor">UI BOX EDITOR</Link>
            <Link to="/view-editor">UI VIEW EDITOR</Link>
          </VStack>
          <Row x="center" y="center">
            <Match
              value="lg"
              cases={{
                default: (
                  <Spinner as={Col} xs={6} md={2} box={{ height: 64 }} />
                ),
                sm: (
                  <Spinner
                    as={Col}
                    xs={6}
                    md={2}
                    box={{ height: 64 }}
                    size="sm"
                  />
                ),
                md: (
                  <Spinner
                    as={Col}
                    xs={6}
                    md={2}
                    box={{ height: 64 }}
                    size="md"
                  />
                ),
                lg: (
                  <Spinner
                    as={Col}
                    xs={6}
                    md={2}
                    box={{ height: 64 }}
                    size="lg"
                  />
                ),
              }}
              handleCases={{
                xl: props => (
                  <Spinner
                    as={Col}
                    xs={12}
                    md={3}
                    box={{ height: 64 }}
                    size="xl"
                  />
                ),
                _: props => {
                  return (
                    <Col
                      xs={12}
                      md={3}
                      box={{ height: 64 }}
                      x="center"
                      y="center"
                    >
                      <Text size="2xl" color='red-500'>Not Found</Text>
                    </Col>
                  )
                },
              }}
            />
          </Row>
          <Row box={{ margin: -1, padding: { y: 3 } }}>
            <Col box={{ padding: 1 }} xs={12}>
              <VStack
                box={{ height: 32, bgColor: 'blue-500' }}
                x="center"
                y="center"
              >
                <Icon name="home" color="white" size="6xl" />
              </VStack>
            </Col>
            <Col box={{ padding: 1 }} xs={12} sm={6} lg={3}>
              <VStack
                box={{ height: 24, bgColor: 'blue-300' }}
                x="center"
                y="center"
              >
                <Text
                  as="h3"
                  color="white"
                  size="xl"
                  family="mono"
                  transform="uppercase"
                  weight=""
                >
                  Full Columns
                </Text>
              </VStack>
            </Col>
            <Col box={{ padding: 1 }} xs={12} sm={6} lg={3}>
              <Box box={{ height: 24, bgColor: 'blue-300' }} />
            </Col>
            <Col box={{ padding: 1 }} xs={6} md={3} lg={2}>
              <Box box={{ height: 24, bgColor: 'blue-200' }} />
            </Col>
            <Col box={{ padding: 1 }} xs={6} md={3} lg={2}>
              <Box box={{ height: 24, bgColor: 'blue-200' }} />
            </Col>
            <Col box={{ padding: 1 }} xs={6} md={3} lg={1}>
              <Box box={{ height: 24, bgColor: 'blue-200' }} />
            </Col>
            <Col box={{ padding: 1 }} xs={6} md={3} lg={1}>
              <Box box={{ height: 24, bgColor: 'blue-200' }} />
            </Col>
          </Row>
        </VStack>
      )
    },
  })
)
