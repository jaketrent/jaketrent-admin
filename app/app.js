'use strict'

config = require 'config'
express = require 'express'

app = express()

app.get '/', (req, res) ->
  res.json data: 'home'

app.listen config.port, ->
  console.log "Listening on port #{config.port}"

