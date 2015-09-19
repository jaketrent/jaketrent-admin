import autobind from 'autobind-decorator'
import React from 'react'
import styleable from 'react-styleable'

import css from './search-bar.css'

@styleable(css)
@autobind
export default class SearchBar extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func.isRequired
  }
  handleChange(evt) {
    this.props.onChange(evt.target.value)
  }
  render() {
    return (
      <div className={this.props.css.root}>
        <input className={this.props.css.input} onChange={this.handleChange} type="search" placeholder="Search" />
      </div>
    )
  }
}