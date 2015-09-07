import React from 'react'

import * as actions from './actions'
import connect from '../common/store/connect'
import renderWithState from '../common/store/render'

@connect([], [actions])
class BooksIndex extends React.Component {
  render() {
    return (
      <div>BooksIndex</div>
    )
  }
}

export default function render(el, params) {
  renderWithState(BooksIndex, { params }, el)
}



//var React = require('react')
//
////var AuthenticatedRoute = require('../common/authenticated-route')
//var actions = require('./actions')
//var BooksList = require('./list')
//
//module.exports = React.createClass({
//
//  displayName: 'BooksIndex',
//
//  mixins: [ AuthenticatedRoute ],
//
//  componentDidMount() {
//    actions.fetch()
//  },
//
//  render() {
//    return (
//      <div className="page">
//        <header className="page-header">
//          <h2 className="page-title">Books</h2>
//        </header>
//        <BooksList />
//        <main className="page-body">
//          RouteHandler
//        </main>
//      </div>
//    )
//  }
//})