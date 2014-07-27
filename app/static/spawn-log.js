'use strict'

var dataExists = function (data) {
  return data && ('' + data).trim().length > 0
}

var lastCharIsNewline = function (data) {
  return data[data.length - 1] == '\n'
}

var removeNewLine = function (data) {
  if (lastCharIsNewline(data)) {
    return data.substring(0, data.length - 1)
  } else {
    return data
  }
}

var log = function (debug) {
  if (!debug)
    throw new Error('Debug log function must be provided')

  return function (data) {
    if (dataExists(data))
      debug(removeNewLine(data))
  }
}

module.exports = log