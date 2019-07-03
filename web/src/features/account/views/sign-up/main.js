import React from 'react'
import { task, VIEW_STATUS } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// schema
import { signUpSchema } from './schema'

// main
export const signUp = task((t, a) =>
  createView('sign-up', {
    state: {
      data({ type, status, viewData, formData, error }) {
        console.log('sign-up data type:', type)
        return {
          status,
          data: viewData,
          error,
        }
      },
      form({ type, status, viewData, formData }) {
        console.log('sign-up form type:', type)
        return t.merge(
          {
            data: formData,
          },
          signUpSchema({ disabled: t.eq(type, 'form-transmit') })
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
        console.log('sign-up transmit type:', type)
        const [checkError] = await a.of(
          api.service('auth-management').create({
            action: 'checkUnique',
            value: {
              email: formData.email,
            },
          })
        )
        if (checkError) {
          // dispatch(
          //   mutations.signUpFail({
          //     error: checkError,
          //     // message: VIEW_CONTENT.SIGN_UP_CHECK_FAIL.MESSAGES,
          //   })
          // )
          // done()
          return {
            status,
            data: null,
            error: checkError,
          }
        }
        const [userError, userResult] = await a.of(
          api.service('users').create(
            t.mergeAll([
              formData,
              {
                role: 'user',
                status: 'offline',
              },
            ])
          )
        )
        if (userError) {
          // dispatch(
          //   mutations.signUpFail({
          //     error: userError,
          //     // message: VIEW_CONTENT.SIGN_UP_FAIL.MESSAGES,
          //   })
          // )
          // done()
          return {
            status,
            data: null,
            error: userError,
          }
        }
        // dispatch(
        //   mutations.signUpSuccess({
        //     result: userResult,
        //   })
        // )
        // done()
        return {
          status,
          data: userResult,
          error: null,
        }
      },
    },
    ui: ({
      ui: { HStack, ViewContainer, ViewHeading, ViewButton, ViewForm },
    }) => ({ state, mutations }) => {
      return (
        <ViewContainer>
          <ViewHeading
            title="Sign-up for a Z1 Account"
            text="Enter your new account details below."
          />
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
                text="Sign-up"
                loading={t.eq(state.status, VIEW_STATUS.LOADING)}
              />
            </HStack>
          </ViewForm>
        </ViewContainer>
      )
    },
  })
)
