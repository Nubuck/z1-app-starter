import React from 'react'
import { task, VIEW_STATUS } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// schema
import { resetPasswordSchema } from './schema'

// main
export const resetPassword = task((t, a) =>
  createView('reset-password', {
    state: {
      data({ status, viewData, error }) {
        return {
          status,
          data: viewData,
          error,
        }
      },
      form({ type, formData }) {
        return t.merge(
          {
            data: formData,
          },
          resetPasswordSchema({ disabled: t.eq(type, 'form-transmit') })
        )
      },
      async transmit({ status, api, formData }) {
        const [error, result] = await a.of(
          api.service('auth-management').create({
            action: 'sendResetPwd',
            value: { email: formData.email },
          })
        )
        if (error) {
          return {
            status,
            data: formData,
            error: error.message,
          }
        }
        console.log('RESET RESULT', result)
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
      ViewLink,
      ViewAlert,
      When,
    }) => ({ state, mutations }) => {
      return (
        <ViewContainer>
          <ViewHeading
            title="Forgot your Z1 password?"
            text="Enter the email address you registered with to reset your password."
          />
          <When is={t.not(t.isNil(state.error))}>
            <ViewAlert
              icon="exclamation-triangle"
              text={state.error}
              color="orange-500"
              bgColor={null}
              box={{ borderWidth: 2, borderColor: 'orange-500' }}
            />
          </When>
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
