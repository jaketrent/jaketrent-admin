import React from 'react'
import styleable from 'react-styleable'

import css from './load-more.css'

const { func } = React.PropTypes

function LoadMore(props) {
  return (
    <button className={props.css.btn} onClick={props.onLoad}>Lore More</button>
  )
}

LoadMore.propTypes = {
  onLoad: func.isRequired
}

export default styleable(css)(LoadMore)