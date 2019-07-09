import React from 'react'
import { task } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// main
export const notAuthorized = task((t, a) =>
  createView('401', {
    state: {
      data({ type, status, viewData, formData, error }) {
        return {
          status,
          data: viewData,
          error,
        }
      },
    },
    ui: ({ VStack, HStack, Text, Icon }) => ({ state, mutations }) => {
      return (
        <VStack
          x="center"
          y="center"
          box={{ color: 'red-500', height: 'full' }}
        >
          <HStack x="center" y="center">
            <Icon
              name="ban"
              size="5xl"
              box={{ margin: { right: 4 } }}
            />
            <Text size="6xl">401</Text>
          </HStack>
          <HStack x="center" y="center" >
            <Text size="4xl" color="red-500" alignX="center" box={{ width: '1/2' }}>
              Your account is not authorized for this area
            </Text>
          </HStack>
          <Text size="lg" color="red-500" alignX="center">
            Please contact your administrator to request access
          </Text>
        </VStack>
      )
    },
  })
)
