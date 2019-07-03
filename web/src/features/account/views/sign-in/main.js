import React from 'react'
import { task, VIEW_STATUS } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// schema
import { signInSchema } from './schema'

// main
export const signIn = task((t, a) =>
  createView('sign-in', {
    state: {
      data({ type, status, viewData, formData, error }) {
        console.log('sign-in data type:', type)
        return {
          status,
          data: viewData,
          error,
        }
      },
      form({ type, status, viewData, formData }) {
        console.log('sign-in form type:', type)
        return t.merge(
          {
            data: formData,
          },
          signInSchema({ disabled: t.eq(type, 'form-transmit') })
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
        redirect,
        mutations,
      }) {
        console.log('sign-in transmit type:', type)
        // authenticate
        const [error, result] = await a.of(
          api.authenticate(t.mergeAll([{ strategy: 'local' }, formData]))
        )
        // auth failed
        if (error) {
          dispatch(
            mutations.authenticateFail({
              error,
              // message: VIEW_CONTENT.SIGN_IN_FAIL.MESSAGES,
            })
          )
          return {
            status,
            data: formData,
            error,
          }
        }
        // auth succeeded -> verify token
        const token = t.path(['accessToken'], result)
        // token failed
        if (!token) {
          dispatch(
            mutations.authenticateFail({
              error: new Error('Access Token not found'),
              // message: VIEW_CONTENT.SIGN_IN_FAIL.MESSAGES,
            })
          )
          return {
            status,
            data: formData,
            error: new Error('Access Token not found'),
          }
        }
        // verify user by token
        const [verifyError, verifyResult] = await a.of(
          api.passport.verifyJWT(token)
        )
        // verify failed
        if (verifyError) {
          dispatch(
            mutations.authenticateFail({
              error: verifyError,
              // message: VIEW_CONTENT.SIGN_IN_FAIL.MESSAGES,
            })
          )
          return {
            status,
            data: formData,
            error: verifyError,
          }
        }
        // verify succeeded -> get user
        const [userError, user] = await a.of(
          api.service('users').get(verifyResult.userId)
        )
        // get user failed
        if (userError) {
          dispatch(
            mutations.authenticateFail({
              error: userError,
              // message: VIEW_CONTENT.SIGN_IN_FAIL.MESSAGES,
            })
          )
          return {
            status,
            data: formData,
            error: userError,
          }
        }
        // get user success
        dispatch(mutations.authenticateSuccess({ user }))
        // NOTE: redirect back or to home
        const state = getState()
        if (state.account.redirectBackTo) {
          dispatch(redirect(state.account.redirectBackTo))
          return {
            status,
            data: formData,
            error: null,
          }
        }
        dispatch(
          redirect({
            type: 'landing/ROUTE_HOME',
            payload: {},
          })
        )
        return {
          status,
          data: formData,
          error: null,
        }
      },
    },
    ui: ({
      ui: { HStack, ViewContainer, ViewHeading, ViewButton, ViewForm, Spinner },
    }) => ({ state, mutations }) => {
      return (
        <ViewContainer>
          <ViewHeading
            title="Sign-in to your Z1 Account"
            text="Enter your account credentials below to continue."
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
                text={'Sign-in'}
                loading={t.eq(state.status, VIEW_STATUS.LOADING)}
              />
            </HStack>
          </ViewForm>
        </ViewContainer>
      )
    },
  })
)
