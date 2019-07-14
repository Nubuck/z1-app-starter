import React from 'react'
import { task } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// main
export const verify = task((t, a) =>
  createView('verify', {
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
        // if (t.and(t.eq(type, 'route-enter'), t.not(t.isNil(viewData)))) {
        return {
          status,
          data: viewData,
          error: null,
        }
        // }

        // const [dataError, dataResult] = await a.of(
        //   api.service('derp').find({
        //     query: {
        //       thing: formData.otherThing,
        //     },
        //   })
        // )

        // return {
        //   status,
        //   data: dataResult.data,
        //   error: null,
        // }
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
    ui: ({ ui }) => ({ state, mutations }) => {
      return <div />
    },
  })
)
