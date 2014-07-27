'use strict'

const config = require('config')
const express = require('express')

const app = express()

app.get('/', function (req, res) {
  res.json({ data: 'home' })
})

app.listen(config.port, function () {
  console.log('Listening on port ' + config.port)
})
