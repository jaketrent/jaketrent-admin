'use strict'

require('dotenv').load()

const config = require('config')
const express = require('express')
const gzippo = require('gzippo')
const path = require('path')

const app = express()

app.use(gzippo.staticGzip(path.join(__dirname, config.assets.dir)))

app.listen(config.port, function () {
  console.log('Listening on port ' + config.port)
})