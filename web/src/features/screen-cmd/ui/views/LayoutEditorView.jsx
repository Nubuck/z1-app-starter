import React from 'react'
import { task, VIEW_STATUS, Link } from '@z1/lib-feature-box'

// ui
import SortableTree from 'react-sortable-tree'

// styles
import { css } from '../styles'

// main
export const LayoutEditorView = task(
  t => ({ ui: {} }) => ({ cmd, mutations }) => {
    return (
      <div className={css.editor}>
        <div className={css.colLeft}>
          <p>
            <Link to="/">HOME</Link>
          </p>
          <h2 className={css.title}>VIEW EDITOR</h2>
          <div className={css.editorContainer}>{/* <SortableTree /> */}</div>
        </div>
        <div className={css.colRight}>
          <div className={css.row}>
            <div className={css.col}>{`${JSON.stringify(cmd.data)}`}</div>
          </div>
          {/* <div className={css.row}>{toCss(cmd.data)}</div> */}
        </div>
      </div>
    )
  }
)
