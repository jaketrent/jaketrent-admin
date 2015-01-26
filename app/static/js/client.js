var React = require('react')
var Router = require('react-router')

var AppActions = require('./common/app-actions')

Router.run(require('./routes'), function (Handler, state) {
  React.render(<Handler/>, document.getElementById('app'));
  AppActions.transition(state)
})

