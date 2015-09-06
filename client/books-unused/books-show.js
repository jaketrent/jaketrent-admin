var React = require('react')

var AuthenticatedRoute = require('../common/authenticated-route')
var BooksActions = require('./books-actions')
var BooksShowStore = require('./books-show-store')

module.exports = React.createClass({

  displayName: 'BooksShow',

  mixins: [ AuthenticatedRoute ],

  getInitialState() {
    return this.getStateFromStores()
  },

  getStateFromStores() {
    return {
      book: BooksShowStore.get()
    }
  },

  componentDidMount() {
    BooksShowStore.addChangeListener(this._onChange)
  },

  componentWillUnmount() {
    BooksShowStore.removeChangeListener(this._onChange)
  },

  _onChange:function(){
    if (this.isMounted()) {
      if (BooksShowStore.hasBook()) {
        this.setState(this.getStateFromStores())
      } else if (BooksShowStore.isDestroyed()) {
        this.transitionTo('books')
      }
    }
  },

  onClickDestroy() {
    if (confirm('Permanently destroy?'))
      BooksActions.destroy(this.state.book)
  },

  render() {
    return (
      <header className="books-header">
        <h2 className="books-title">
          {this.state.book.title}
          <span className="books-title-id">
            {this.state.book.id}
          </span>
        </h2>
        <div className="btn-row books-btns">
          <Link to="books-update" params={{ id: this.getParams().id}} className="btn">
            Edit
          </Link>
          <button className="btn btn-danger" onClick={this.onClickDestroy}>
            Destroy
          </button>
        </div>
        <div className="books-author">{this.state.book.author}</div>
        <div className="books-cover-img-container">
          <img className="books-cover-img" src={this.state.book.cover_url} />
        </div>

        <div className="books-description">{this.state.book.description}</div>
        <a href={this.state.book.review_url} className="books-review-url" target="_blank">{this.state.book.review_url}</a>
        <a href={this.state.book.affiliate_url} className="books-affiliate-url" target="_blank">{this.state.book.affiliate_url}</a>
      </header>
    )
  }
})
