import React from 'react'
import { task, Link, VIEW_STATUS } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// ui
import SortableTree, {
  addNodeUnderParent,
  removeNodeAtPath,
  changeNodeAtPath,
} from 'react-sortable-tree'

// tasks
const getNodeKey = ({ treeIndex }) => treeIndex

// main
export const viewEditor = task(t =>
  createView('VIEW_EDITOR', {
    state: {
      data({ viewData, formData, status, type, error }) {
        return {
          status,
          data: t.eq(type, 'init')
            ? [
                {
                  title: 'container',
                  element: 'div',
                  props: {},
                  children: [
                    {
                      title: 'home banner',
                      element: 'img',
                      expanded: true,
                      children: [
                        { title: 'heading', element: 'h1', props: {} },
                        { title: 'intro', element: 'p' },
                      ],
                    },
                    {
                      title: 'form box',
                      expanded: true,
                      children: [
                        { title: 'form' },
                        { title: 'form submit', element: 'button' },
                      ],
                    },
                  ],
                  expanded: true,
                },
              ]
            : viewData,
          error,
        }
      },
      form({ viewData, formData, status, type }) {
        return {
          schema: {},
          uiSchema: {},
          data: {},
        }
      },
      async load({ state, api, viewData, formData, status, type }) {
        return {
          status: null,
          data: null,
          error: null,
        }
      },
      async transmit({ state, api, viewData, formData, status, type }) {
        return {
          status: null,
          data: null,
          error: null,
        }
      },
    },
    ui: ({ css, ui: { Box } }) => ({ state, mutations }) => {
      return (
        <div className={css.editor}>
          <div className={css.colLeft}>
            {/* <h2 className={css.title}>VIEW EDITOR</h2> */}
            <Box
              as="h2"
              box={{
                color: 'gray-700',
                fontSize: '2xl',
                fontFamily: 'mono',
                margin: { bottom: 3 },
              }}
            >
              VIEW EDITOR
            </Box>
            <div className={css.container} style={{ height: '90vh' }}>
              <SortableTree
                className="dark"
                treeData={state.data}
                canNodeHaveChildren={() => true}
                onChange={data => mutations.dataChange({ data })}
                reactVirtualizedListProps={{ rowHeight: 70 }}
                generateNodeProps={({ node, path }) => {
                  return {
                    title: (
                      <div className={css.row}>
                        <select
                          style={{ fontSize: '1.1rem' }}
                          className={
                            'form-select bg-gray-700 text-white rounded-none py-1 border-gray-900 focus:shadow-none mr-1'
                          }
                          value={node.element || 'div'}
                          onChange={event => {
                            mutations.dataChange({
                              data: changeNodeAtPath({
                                treeData: state.data,
                                path,
                                getNodeKey,
                                newNode: {
                                  ...node,
                                  element: event.target.value,
                                },
                              }),
                            })
                          }}
                        >
                          <option value="div">div</option>
                          <option value="h1">h1</option>
                          <option value="h2">h2</option>
                          <option value="h3">h3</option>
                          <option value="h4">h4</option>
                          <option value="span">span</option>
                          <option value="p">p</option>
                          <option value="button">button</option>
                          <option value="img">img</option>
                        </select>
                        <input
                          style={{ fontSize: '1.1rem' }}
                          className={
                            'form-input bg-gray-700 text-white rounded-none py-1 border-gray-900 focus:shadow-none'
                          }
                          value={node.title}
                          onChange={event => {
                            mutations.dataChange({
                              data: changeNodeAtPath({
                                treeData: state.data,
                                path,
                                getNodeKey,
                                newNode: { ...node, title: event.target.value },
                              }),
                            })
                          }}
                        />
                      </div>
                    ),
                    buttons: [
                      <button className="rounded-full mr-1 p-1 block outline-none">
                        <i className="eva eva-settings-outline text-2xl" />
                      </button>,
                      <button
                        className="rounded-full mr-1 p-1 block outline-none"
                        onClick={() =>
                          mutations.dataChange({
                            data: addNodeUnderParent({
                              treeData: state.data,
                              parentKey: path[path.length - 1],
                              expandParent: true,
                              getNodeKey,
                              newNode: {
                                title: '',
                              },
                              // addAsFirstChild: state.addAsFirstChild,
                            }).treeData,
                          })
                        }
                      >
                        <i className="eva eva-plus-outline text-2xl" />
                      </button>,
                      <button
                        className=" mr-1 p-1 block outline-none border-l pl-3 border-gray-600"
                        onClick={() => {}}
                      >
                        <i className="eva eva-save-outline text-2xl focus:border-none" />
                      </button>,
                      <button
                        className="rounded-full mr-1 p-1 block outline-none"
                        onClick={() =>
                          mutations.dataChange({
                            data: removeNodeAtPath({
                              treeData: state.data,
                              path,
                              getNodeKey,
                            }),
                          })
                        }
                      >
                        <i className="eva eva-trash-outline text-2xl focus:border-none ml-1 " />
                      </button>,
                    ],
                  }
                }}
              />
            </div>
          </div>
          <div className={css.colRight}>
            <div className={css.row}>
              <div className={css.col}>{`${JSON.stringify(state.data)}`}</div>
            </div>
          </div>
        </div>
      )
    },
  })
)
