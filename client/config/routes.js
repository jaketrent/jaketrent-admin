import * as router from '../common/router'
import books from '../books'
import booksShow from '../books/show'
import auth from '../auth/middleware'
import login from '../auth/login'

export function map() {
  router.route('/books', auth, books)
  //router.route('/books/create', require('../books/books-create'))
  router.route('/books/:bookId', auth, booksShow)
  //router.route('/books/:id/edit', require('../books/books-update'))

  router.route('/login', login)
  //router.route('/errors/:type', require('../errors'))

  router.start()
}
