'use strict'

const config = require('config')
const express = require('express')
const path = require('path')

const app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.use(express.static(path.join(__dirname, 'static')))

app.get('/', function (req, res) {
  res.render('index', {
    assets: config.assets
  })
})

app.listen(config.port, function () {
  console.log('Listening on port ' + config.port)
})

if (config.env !== config.envs.prod)
  require('./static/static-server').start()