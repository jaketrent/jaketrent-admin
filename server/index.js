var express = require('express')
var gzippo = require('gzippo')
var path = require('path')

var app = express()

app.use(gzippo.staticGzip(path.join(__dirname, '..', 'dist')))

var port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Server listening on ' + port + '...')
})