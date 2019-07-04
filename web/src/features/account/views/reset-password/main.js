import React from 'react'
import { task, VIEW_STATUS } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// schema
import { resetPasswordSchema } from './schema'

// main
export const resetPassword = task((t, a) =>
  createView('reset-password', {
    state: {
      data({ type, status, viewData, formData, error }) {
        return {
          status,
          data: viewData,
          error,
        }
      },
      async load({
        type,
        status,
        api,
        detailKey,
        viewData,
        formData,
        getState,
        dispatch,
        mutations,
      }) {
        return {
          status,
          data: viewData,
          error: null,
        }
      },
      form({ type, status, viewData, formData }) {
        return t.merge(
          {
            data: formData,
          },
          resetPasswordSchema({ disabled: false })
        )
      },
      async transmit({
        type,
        status,
        api,
        viewData,
        formData,
        getState,
        dispatch,
        mutations,
      }) {
        return {
          status,
          data: formData,
          error: null,
        }
      },
    },
    ui: ({
      HStack,
      ViewContainer,
      ViewHeading,
      ViewButton,
      ViewForm,
      Text,
      ViewLink,
    }) => ({ state, mutations }) => {
      return (
        <ViewContainer>
          <ViewHeading
            title="Forgot your Z1 password?"
            text="Enter the email address you registered with to reset your password."
          />
          {t.isNil(state.error) ? null : (
            <ViewAlert
              icon="alert-triangle-outline"
              text="Email address not registered"
              color="orange-500"
              bgColor={null}
              box={{ borderWidth: 2, borderColor: 'orange-500' }}
            />
          )}
          <ViewForm
            schema={state.form.schema}
            uiSchema={state.form.uiSchema}
            formData={state.form.data}
            onSubmit={({ formData }) =>
              mutations.formTransmit({ data: formData })
            }
          >
            <HStack box={{ padding: { y: 4 } }}>
              <ViewButton
                type="submit"
                text="Reset"
                loading={t.eq(state.status, VIEW_STATUS.LOADING)}
                radius="full"
              />
            </HStack>
            <HStack
              x="center"
              y="center"
              box={{
                padding: { bottom: 4 },
              }}
            >
              <ViewLink to={'/account/sign-in'} box={{ margin: { y: 2 } }}>
                Back to Sign-in
              </ViewLink>
            </HStack>
          </ViewForm>
        </ViewContainer>
      )
    },
  })
)
