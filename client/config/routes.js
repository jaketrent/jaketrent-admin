import auth from '../auth/middleware'
import books from '../books'
import booksCreate from '../books/create'
import booksEdit from '../books/edit'
import { initFetchBooks, initFetchBook } from '../books/middleware'
import login from '../auth/login'
import logout from '../auth/logout'
import main from '../main'
import * as router from '../common/router'
import store from '../common/store'

const { dispatch } = store
const fetchBook = initFetchBook(dispatch)
const fetchBooks = initFetchBooks(dispatch)

export function map() {
  router.route('/', main)
  router.route('/books', auth, fetchBooks, books)
  router.route('/books/create', auth, fetchBooks, booksCreate)
  router.route('/books/:bookId/edit', auth, fetchBooks, fetchBook, booksEdit)

  router.route('/login', login)
  router.route('/logout', logout)
  //router.route('/errors/:type', require('../errors'))

  router.start()
}
