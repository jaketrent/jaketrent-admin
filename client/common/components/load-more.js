import React from 'react'
import styleable from 'react-styleable'

import css from './load-more.css'

const { func } = React.PropTypes

@styleable(css)
export default class LoadMore extends React.Component {
  static propTypes = {
    onLoad: func.isRequired
  }
  render() {
    return (
      <button className={this.props.css.btn} onClick={this.props.onLoad}>Lore More</button>
    )
  }
}
