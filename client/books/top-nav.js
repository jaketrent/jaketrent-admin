import React from 'react'
import styleable from 'react-styleable'

import CreateBtn from './components/create-btn'
import css from './top-nav.css'
import SearchBar from './components/search-bar'

@styleable(css)
export default class BooksTopNav extends React.Component {
  render() {
    return (
      <div className={this.props.css.root}>
        <CreateBtn />
        <SearchBar onChange={() => {}} />
      </div>
    )
  }
}
