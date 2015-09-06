var React = require('react')

var NotFound404 = require('./404-not-found')
var NotAuthenticated401 = require('./401-not-authenticated')

var statuses = {
  401: NotAuthenticated401,
  404: NotFound404
}

var messages = {
  'not-authenticated': NotAuthenticated401,
  'not-found': NotFound404
}

module.exports = React.createClass({

  displayName: 'ErrorsIndex',

  render() {
    var errorByStatus = statuses[this.getParams().type]
    var errorByMessage = messages[this.getParams().type]
    // TODO: default

    return (errorByStatus || errorByMessage)()
  }

})