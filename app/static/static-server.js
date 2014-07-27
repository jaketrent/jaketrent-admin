'use strict'

const debug = require('debug')('jta:static:server')
const cp = require('child_process')

const spawnLog = require('./spawn-log')

exports.start = function () {
  const proc = cp.spawn('node_modules/.bin/broccoli', ['serve'])
  proc.stdout.setEncoding('utf8')
  proc.stderr.setEncoding('utf8')
  proc.stdout.on('data', spawnLog(debug))
  proc.stderr.on('data', spawnLog(debug))
  proc.on('close', debug)
}