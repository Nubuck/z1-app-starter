import React from 'react'
import { task, Link } from '@z1/lib-feature-box'

// styles
import { css } from '../styles'

// main
export const HomeView = task(t => ({ ui: {} }) => ({ cmd, mutations }) => {
  return (
    <div className={css.editor}>
      <h2 className={css.title}>HOME</h2>
    </div>
  )
})
