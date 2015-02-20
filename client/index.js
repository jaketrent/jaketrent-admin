var React = require('react')
var Router = require('react-router')

var AppActions = require('./common/app-actions')

require('./common/styles/client.scss')

Router.run(require('./config/routes'), (Handler, state) => {
  React.render(<Handler/>, document.body);
  AppActions.transition(state)
})

