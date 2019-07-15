import React from 'react'
import { task, VIEW_STATUS } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// schema
import { signUpSchema } from './schema'

// main
export const signUp = task((t, a) =>
  createView('sign-up', {
    state: {
      data({ type, status, viewData, error }) {
        return {
          status,
          data: t.merge(viewData, {
            mode: t.and(t.eq(type, 'form-transmit-complete'), t.isNil(error))
              ? 'view'
              : 'form',
          }),
          error,
        }
      },
      form({ type, formData }) {
        return t.merge(
          {
            data: formData,
          },
          signUpSchema({ disabled: t.eq(type, 'form-transmit') })
        )
      },
      async transmit({ status, api, formData }) {
        const [checkError] = await a.of(
          api.service('auth-management').create({
            action: 'checkUnique',
            value: {
              email: formData.email,
            },
          })
        )
        if (checkError) {
          return {
            status,
            data: formData,
            error: checkError.message,
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
          return {
            status,
            data: formData,
            error: userError.message,
          }
        }
        return {
          status,
          data: userResult,
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
      ViewAlert,
      Match,
      When,
    }) => ({ state, mutations }) => {
      const containerProps = t.eq(state.data.mode, 'view')
        ? { large: true, center: true }
        : {}
      return (
        <ViewContainer {...containerProps}>
          <Match
            value={state.data.mode}
            when={{
              view: (
                <React.Fragment>
                  <ViewHeading
                    title="Thank you for registering a Z1 account"
                    text="Your account verification link has been sent to the entered email."
                    box={{ color: 'yellow-500' }}
                  />
                  <HStack box={{ padding: { top: 8 } }}>
                    <ViewButton
                      to="/account/sign-in"
                      text="Continue to Sign-in"
                      radius="full"
                      box={{
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                      color="green-500"
                    />
                  </HStack>
                </React.Fragment>
              ),
              form: (
                <React.Fragment>
                  <ViewHeading
                    title="Sign-up for a Z1 Account"
                    text="Enter your new account details below."
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
                        text="Sign-up"
                        loading={t.eq(state.status, VIEW_STATUS.LOADING)}
                        radius="full"
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
                        alignX="center"
                        size="lg"
                        color={'gray-500'}
                        box={{ margin: { y: 2 } }}
                      >
                        Already have an account?
                      </Text>
                      <ViewLink
                        to={'/account/sign-in'}
                        textBox={{ width: 'full' }}
                      >
                        Sign-in to Z1
                      </ViewLink>
                    </HStack>
                  </ViewForm>
                </React.Fragment>
              ),
            }}
          />
        </ViewContainer>
      )
    },
  })
)
