import React from 'react'
import styleable from 'react-styleable'

import css from './welcome.css'

function Welcome(props) {
  return (
    <div className={props.css.root}>
      <h2 className={props.css.text}>
        Welcome back, puppetmaster
      </h2>
    </div>
  )
}

export default styleable(css)(Welcome)