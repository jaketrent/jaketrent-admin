/** @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({

  displayName: 'ErrorsLayoutText',

  render: function () {
    return (
      <main className="errors-container">
        <header className="errors-header">
          <h1 className="errors-title">
            {this.props.children}
          </h1>
        </header>
      </main>
    )
  }

})