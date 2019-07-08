import React from 'react'
import { task, VIEW_STATUS } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// schema
import { signInSchema } from './schema'

// main
export const signIn = task((t, a) =>
  createView('sign-in', {
    state: {
      data({ type, status, viewData, error }) {
        // route-enter
        // data-load
        // data-load-complete
        // form-transmit
        // form-transmit-complete
        return {
          status,
          data: viewData,
          error,
        }
      },
      async load({ type, getState, dispatch, action, viewData }) {
        return {
          status,
          data: viewData,
          error: null,
        }
      },
      form({ type, formData }) {
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
        formData,
        getState,
        dispatch,
        redirect,
        mutations,
      }) {
        // authenticate
        const [error, result] = await a.of(
          api.authenticate(t.mergeAll([{ strategy: 'local' }, formData]))
        )
        // auth failed
        if (error) {
          dispatch(
            mutations.authenticateFail({
              error,
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
      HStack,
      ViewContainer,
      ViewHeading,
      ViewButton,
      ViewForm,
      ViewLink,
      Text,
      ViewAlert,
      When,
    }) => ({ state, mutations }) => {
      return (
        <ViewContainer>
          <ViewHeading
            title="Sign-in to your Z1 Account"
            text="Enter your account credentials below to continue."
          />
          <When is={t.not(t.isNil(state.error))}>
            <ViewAlert
              icon="alert-triangle-outline"
              text="Incorrect email or password"
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
            <ViewLink
              to={'/account/reset-password'}
              box={{ justifyContent: 'end', margin: { top: 4, bottom: 2 } }}
              textBox={{
                fontSize: 'md',
                padding: { right: 0 },
              }}
            >
              Forgot your password?
            </ViewLink>
            <HStack box={{ padding: { y: 4 } }}>
              <ViewButton
                type="submit"
                text={'Sign-in'}
                radius="full"
                loading={t.eq(state.status, VIEW_STATUS.LOADING)}
              />
            </HStack>
            <HStack
              x="center"
              y="center"
              box={{
                padding: { bottom: 4 },
                flexDirection: ['col', { lg: 'row' }],
                flexWrap: true,
              }}
            >
              <Text
                as={'div'}
                x="center"
                size="lg"
                color={'gray-500'}
                box={{ margin: { y: 2 } }}
              >
                Don't have an account?
              </Text>
              <ViewLink to={'/account/sign-up'} textBox={{ width: 'full' }}>
                Sign-up to Z1
              </ViewLink>
            </HStack>
          </ViewForm>
        </ViewContainer>
      )
    },
  })
)
