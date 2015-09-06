import * as router from '../common/router'
import books from '../books'

export function map() {
  router.route('/books', books)
  //router.route('/books/create', require('../books/books-create'))
  //router.route('/books/:id', require('../books/books-show'))
  //router.route('/books/:id/edit', require('../books/books-update'))

  //router.route('/login', require('../session/login'))
  //router.route('/errors/:type', require('../errors'))

  router.start()
}
