/** @jsx React.DOM */

var React = require('react')

var BooksStore = require('./books-store')

module.exports = React.createClass({

  getInitialState: function () {
    return {
      book: BooksStore.find({ id: this.props.params.id }) || { title: 'not found' }
    }
  },

  componentWillMount: function () {
    BooksStore.addChangeListener(this._onChange)
  },

  componentDidUnmount: function () {
    BooksStore.removeChangeListener(this._onChange)
  },

  _onChange:function(){
    this.setState({
      book: BooksStore.find({ id: this.props.params.id })
    })
  },

  render: function () {
    return (
      <header className="books-header">
        <h2 className="books-title">Book {this.state.book.id}</h2>
        <div>{this.state.book.title}</div>
        <div>{this.state.book.description}</div>
        <div><img src={this.state.book.cover_url} /></div>
        <div>{this.state.book.review_url}</div>
      </header>
    )
  }
})