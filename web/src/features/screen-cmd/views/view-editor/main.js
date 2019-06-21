import React from 'react'
import { task, Link, VIEW_STATUS } from '@z1/lib-feature-box'
import { createView } from '@z1/lib-feature-macros'

// ctx
import { VIEWS } from '../../ctx'

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
  createView(VIEWS.VIEW_EDITOR, {
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
    ui: ({ css }) => ({ state, mutations }) => {
      return (
        <div className={css.editor}>
          <div className={css.colLeft}>
            <p>
              <Link to="/">HOME</Link>
            </p>
            <h2 className={css.title}>VIEW EDITOR</h2>
            <div className={css.container} style={{ height: '86vh' }}>
              <SortableTree
                treeData={state.data}
                canNodeHaveChildren={() => true}
                onChange={data => mutations.dataChange({ data })}
                generateNodeProps={({ node, path }) => {
                  return {
                    title: (
                      <div className={css.row}>
                        <input
                          style={{ fontSize: '1.1rem' }}
                          value={node.title}
                          onChange={event => {
                            const title = event.target.value
                            mutations.dataChange({
                              data: changeNodeAtPath({
                                treeData: state.data,
                                path,
                                getNodeKey,
                                newNode: { ...node, title },
                              }),
                            })
                          }}
                        />
                        <select
                          style={{ fontSize: '1.1rem' }}
                          value={node.element || 'div'}
                          onChange={event => {
                            const element = event.target.value
                            mutations.dataChange({
                              data: changeNodeAtPath({
                                treeData: state.data,
                                path,
                                getNodeKey,
                                newNode: { ...node, element },
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
                      </div>
                    ),
                    buttons: [
                      <button>Props</button>,
                      <button
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
                        Add
                      </button>,
                      <button
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
                        Remove
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
